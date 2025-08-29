import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, fromEvent, debounceTime, distinctUntilChanged, takeUntil, map, filter, merge, tap, take, catchError, switchMap } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-from-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './from-event.component.html',
  styleUrls: ['./from-event.component.scss']
})
export class FromEventComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('searchBar') searchBar!: ElementRef;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @ViewChild('hotkeyInfo') hotkeyInfo!: ElementRef;
  @ViewChild('dragBox') dragBox!: ElementRef;
  @ViewChild('colorPicker') colorPicker!: ElementRef;
  // @ViewChild('addBtn') addBtn!: ElementRef

  searchForm = new FormGroup({
    searchInput: new FormControl('')
  });

  userForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('')
  });

  users: User[] = [];
  searchResults: User[] = [];
  windowSize: string = '';
  scrollPosition: number = 0;
  lastKeyPressed: string = '';
  isDragging = false;
  dragPosition = { x: 0, y: 0 };
  selectedColor = '#764ABC';
  private destroy$ = new Subject<void>();
  private isBrowser: boolean;


  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    // Initialize drag position
    this.dragPosition = { x: 0, y: 0 };
    
    // Sample users data
    this.users = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      { id: 3, name: 'Bob Wilson', email: 'bob@example.com' },
      { id: 4, name: 'Alice Brown', email: 'alice@example.com' },
      { id: 5, name: 'Charlie Davis', email: 'charlie@example.com' }
    ];

   
    this.isBrowser = isPlatformBrowser(this.platformId);

    // ✅ Only register resize in browser
    if (this.isBrowser) {
      fromEvent(window, 'resize')
        .pipe(
          debounceTime(200),
          map(() => `${window.innerWidth}x${window.innerHeight}`),
          takeUntil(this.destroy$)
        )
        .subscribe(size => console.log('Window size:', size));

      // ✅ Only register keydown in browser
      fromEvent<KeyboardEvent>(document, 'keydown')
        .pipe(
          filter(event => event.ctrlKey || event.metaKey),
          takeUntil(this.destroy$)
        )
        .subscribe(event => {
          if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();
            console.log('Ctrl/Cmd + K detected');
          }
        });
      }
  }

  ngOnInit() {
    // Reactive form search with user filtering
    this.searchForm.get('searchInput')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        if (value) {
          this.searchResults = this.users.filter(user => 
            user.name.toLowerCase().includes(value.toLowerCase()) ||
            user.email.toLowerCase().includes(value.toLowerCase())
          );
        } else {
          this.searchResults = [];
        }
      });

    // Real-time form validation
    this.userForm.get('email')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        const emailControl = this.userForm.get('email');
        if (emailControl && value) {
          if (!value.includes('@')) {
            emailControl.setErrors({ invalidEmail: true });
          } else {
            emailControl.setErrors(null);
          }
        }
      });
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return; // ✅ Skip everything on server
  
       // Ensure ViewChild elements are available
    if (!this.searchBar || !this.scrollContainer || !this.dragBox || !this.colorPicker) {
      console.error('Required ViewChild elements are not initialized');
      return;
    }

    // API search with debounce
    fromEvent<InputEvent>(this.searchBar.nativeElement, 'input')
      .pipe(
        map(event => (event.target as HTMLInputElement).value),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(value => {
          if (!value) return [];
          return this.http.get<any[]>(`https://jsonplaceholder.typicode.com/users?username_like=${value}`)
            .pipe(
              catchError(error => {
                console.error('API Error:', error);
                return [];
              })
            );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (users) => {
          console.log('API Results:', users);
          // You can add a property to show results in the UI if needed
          // this.apiResults = users;
        },
        error: (error) => console.error('Subscription error:', error)
      });

    // Infinite scroll with dynamic content loading
    fromEvent<Event>(this.scrollContainer.nativeElement, 'scroll')
      .pipe(
        map((event: Event) => (event.target as HTMLElement).scrollTop),
        debounceTime(100),
        takeUntil(this.destroy$),
        catchError(error => {
          console.error('Scroll error:', error);
          return [];
        })
      )
      .subscribe(position => {
        this.scrollPosition = position;
        
        const element = this.scrollContainer.nativeElement;
        if (element.scrollHeight - element.scrollTop <= element.clientHeight + 50) {
          // Add more users when near bottom
          const lastId = this.users[this.users.length - 1].id;
          this.users = [
            ...this.users,
            { 
              id: lastId + 1, 
              name: `User ${lastId + 1}`, 
              email: `user${lastId + 1}@example.com` 
            }
          ];
        }
      });

    // Drag and drop functionality
    if (this.dragBox) {
      const mouseDown$ = fromEvent<MouseEvent>(this.dragBox.nativeElement, 'mousedown');
      const mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');
      const mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup');

      mouseDown$.pipe(
        tap(() => this.isDragging = true),
        takeUntil(this.destroy$)
      ).subscribe((e: MouseEvent) => {
        const initialX = e.clientX - this.dragPosition.x;
        const initialY = e.clientY - this.dragPosition.y;

        const dragSub = mouseMove$.pipe(
          takeUntil(mouseUp$)
        ).subscribe((moveEvent: MouseEvent) => {
          this.dragPosition = {
            x: moveEvent.clientX - initialX,
            y: moveEvent.clientY - initialY
          };
        });

        mouseUp$.pipe(take(1)).subscribe(() => {
          this.isDragging = false;
          dragSub.unsubscribe();
        });
      });
    }

    // Color picker with real-time updates
    if (this.colorPicker) {
      fromEvent<Event>(this.colorPicker.nativeElement, 'input')
        .pipe(
          map(e => (e.target as HTMLInputElement).value),
          takeUntil(this.destroy$)
        )
        .subscribe(color => {
          this.selectedColor = color;
          document.documentElement.style.setProperty('--theme-color', color);
        });
    }
  }

  // Form submission handler
  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form submitted:', this.userForm.value);
      this.userForm.reset();
    }
  }
print(){

}
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
