import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface Observable {
  name: string;
  icon: string;
  description: string;
  example: string;
  steps: string[];
  activeStep: number;
  route?: string;
}

@Component({
  selector: 'app-observables-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  observablesList: Observable[] = [
    {
      name: 'fromEvent',
      icon: 'fas fa-bolt',
      route: 'fromEvent',
      description: 'Creates an Observable from DOM events or Node.js EventEmitter events.',
      example: 'fromEvent(element, "click")',
      steps: ['Listen', 'Event', 'Emit'],
      activeStep: 1
    },
    {
      name: 'of',
      icon: 'fas fa-stream',
      description: 'Creates an Observable that emits a sequence of values.',
      example: 'of(1, 2, 3)',
      steps: ['Start', 'Emit', 'Complete'],
      activeStep: 1
      
    },
    {
      name: 'from',
      icon: 'fas fa-random',
      description: 'Creates an Observable from an array, array-like object, Promise, iterable object, or Observable-like object.',
      example: 'from([1, 2, 3])',
      steps: ['Array', 'Convert', 'Stream'],
      activeStep: 1
    },
    {
      name: 'interval',
      icon: 'fas fa-clock',
      description: 'Creates an Observable that emits sequential numbers at specified intervals.',
      example: 'interval(1000)',
      steps: ['Start', 'Wait', 'Emit'],
      activeStep: 2
    },
    
    {
      name: 'Subject',
      icon: 'fas fa-broadcast-tower',
      description: 'A special type of Observable that allows values to be multicasted to many Observers.',
      example: 'new Subject()',
      steps: ['Create', 'Multicast', 'Stream'],
      activeStep: 1
    },
    {
      name: 'BehaviorSubject',
      icon: 'fas fa-memory',
      description: 'A variant of Subject that requires an initial value and emits its current value to new subscribers.',
      example: 'new BehaviorSubject(0)',
      steps: ['Initial', 'Store', 'Emit'],
      activeStep: 2
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Set up animation intervals for active steps
    setInterval(() => {
      this.observablesList = this.observablesList.map(obs => ({
        ...obs,
        activeStep: (obs.activeStep + 1) % obs.steps.length
      }));
    }, 2000);
  }

  navigateTo(route: string | undefined): void {
    if (route) {
      this.router.navigate(['/observables/', route]);
    }
  }
  }

