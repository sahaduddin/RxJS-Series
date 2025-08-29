import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Question {
  id: number;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

@Component({
  selector: 'app-three-year',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './three-year.component.html',
  styleUrl: './three-year.component.scss'
})
export class ThreeYearComponent {
  expandedQuestion: number | null = null;

  questions: Question[] = [
    {
      id: 1,
      question: "What is the difference between cold and hot observables? Show with Angular examples.",
      answer: `Cold observables create a new execution for each subscriber. Hot observables share execution among subscribers.

Angular Example:
// Cold Observable (HTTP request)
this.http.get('/api/data').subscribe(data => console.log(data));
// Each subscription creates a new HTTP request

// Hot Observable (DOM events)
fromEvent(document, 'click').subscribe(event => console.log(event));
// All subscribers share the same click events

// Converting Cold to Hot
const shared$ = this.http.get('/api/data').pipe(share());
shared$.subscribe(data => console.log('Sub 1:', data));
shared$.subscribe(data => console.log('Sub 2:', data));
// Only one HTTP request is made`,
      difficulty: 'medium',
      category: 'Observable Patterns'
    },
    {
      id: 2,
      question: "How do you implement switchMap vs mergeMap vs concatMap in Angular? Show practical examples.",
      answer: `Different flattening strategies for handling higher-order observables:

Angular Examples:
// switchMap - Cancel previous, use latest (Search/Autocomplete)
@Component({})
export class SearchComponent {
  searchTerm$ = new BehaviorSubject('');
  
  results$ = this.searchTerm$.pipe(
    debounceTime(300),
    switchMap(term => this.searchService.search(term))
  );
}

// mergeMap - Run all concurrently (Independent operations)
uploadFiles(files: File[]) {
  return from(files).pipe(
    mergeMap(file => this.uploadService.upload(file), 3) // max 3 concurrent
  );
}

// concatMap - Sequential execution (Ordered operations)
processQueue(items: any[]) {
  return from(items).pipe(
    concatMap(item => this.processService.process(item))
  );
}`,
      difficulty: 'hard',
      category: 'Observable Patterns'
    },
    {
      id: 3,
      question: "How do you implement Subject patterns in Angular services? Show BehaviorSubject vs ReplaySubject examples.",
      answer: `Subjects are both Observable and Observer, perfect for state management in Angular services:

// BehaviorSubject - Current state with initial value
@Injectable()
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  
  setUser(user: User) {
    this.userSubject.next(user);
  }
  
  getCurrentUser(): User | null {
    return this.userSubject.value; // Synchronous access
  }
}

// ReplaySubject - Cache last N values
@Injectable()
export class NotificationService {
  private notificationSubject = new ReplaySubject<string>(5);
  notifications$ = this.notificationSubject.asObservable();
  
  addNotification(message: string) {
    this.notificationSubject.next(message);
  }
}`,
      difficulty: 'medium',
      category: 'Subject Patterns'
    },
    {
      id: 4,
      question: "How do you handle error handling and retry logic in Angular HTTP requests with RxJS?",
      answer: `Comprehensive error handling with retry strategies:

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}
  
  getData() {
    return this.http.get('/api/data').pipe(
      retry(3), // Retry 3 times
      retryWhen(errors => 
        errors.pipe(
          delay(1000), // Wait 1 second between retries
          take(3), // Max 3 retries
          concatMap(error => error.status === 500 ? of(error) : throwError(error))
        )
      ),
      catchError(error => {
        console.error('API Error:', error);
        return of([]); // Return empty array as fallback
      })
    );
  }
  
  // Exponential backoff retry
  getDataWithBackoff() {
    return this.http.get('/api/data').pipe(
      retryWhen(errors => 
        errors.pipe(
          scan((retryCount, error) => {
            if (retryCount >= 3) throw error;
            return retryCount + 1;
          }, 0),
          delay(retryCount => Math.pow(2, retryCount) * 1000)
        )
      )
    );
  }
}`,
      difficulty: 'hard',
      category: 'Error Handling'
    },
    {
      id: 5,
      question: "How do you implement debouncing and throttling in Angular forms with RxJS?",
      answer: `Debouncing delays execution until after wait time, throttling limits execution frequency:

@Component({
  template: \`
    <input #searchInput placeholder="Search...">
    <div *ngFor="let result of searchResults$ | async">{{result}}</div>
  \`
})
export class SearchComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef;
  searchResults$!: Observable<any[]>;
  
  ngOnInit() {
    // Debounced search - waits for user to stop typing
    this.searchResults$ = fromEvent(this.searchInput.nativeElement, 'input').pipe(
      map((event: any) => event.target.value),
      debounceTime(300), // Wait 300ms after user stops typing
      distinctUntilChanged(), // Only if value changed
      switchMap(term => term ? this.searchService.search(term) : of([]))
    );
    
    // Throttled scroll - limits scroll event handling
    fromEvent(window, 'scroll').pipe(
      throttleTime(100), // Max once per 100ms
      map(() => window.scrollY)
    ).subscribe(scrollY => {
      console.log('Scroll position:', scrollY);
    });
  }
}`,
      difficulty: 'medium',
      category: 'RxJS Operators'
    },
    {
      id: 4,
      question: "Explain the difference between switchMap, mergeMap, and concatMap with use cases.",
      answer: "switchMap: cancels previous inner observable, use for search/autocomplete. mergeMap: runs all inner observables concurrently, use for independent operations. concatMap: queues inner observables sequentially, use for ordered operations like file uploads.",
      difficulty: 'hard',
      category: 'RxJS Advanced'
    },
    {
      id: 5,
      question: "What is backpressure in RxJS and how do you handle it?",
      answer: "Backpressure occurs when observable emits faster than observer can process. Handle with: throttle/debounce operators, buffer operators, sample/audit operators, or custom backpressure strategies using operators like concatMap with limited concurrency.",
      difficulty: 'hard',
      category: 'RxJS Advanced'
    },
    {
      id: 6,
      question: "How do you create custom operators in RxJS?",
      answer: "Create custom operators using pipe() function: const customOperator = <T>() => (source: Observable<T>) => source.pipe(existing operators). Or use Observable.create() for complex logic. Example: const double = map(x => x * 2).",
      difficulty: 'hard',
      category: 'RxJS Advanced'
    },
    {
      id: 7,
      question: "Explain the concept of schedulers in RxJS and their types.",
      answer: "Schedulers control when subscription happens and when notifications are delivered. Types: null (synchronous), asap (async), async (setTimeout), animationFrame (requestAnimationFrame), queue (current event loop). Use observeOn() and subscribeOn().",
      difficulty: 'hard',
      category: 'RxJS Advanced'
    },
    {
      id: 8,
      question: "What is the difference between share() and shareReplay() operators?",
      answer: "share(): multicasts source, but new subscribers after completion get new subscription. shareReplay(n): multicasts and replays last n values to new subscribers, even after completion. shareReplay() keeps subscription alive indefinitely.",
      difficulty: 'medium',
      category: 'RxJS Advanced'
    },
    {
      id: 9,
      question: "How do you handle error recovery in RxJS streams?",
      answer: "Use catchError() to handle errors and return fallback observable. retry(n) for automatic retries. retryWhen() for custom retry logic. onErrorResumeNext() to continue with next observable. finalize() for cleanup regardless of completion/error.",
      difficulty: 'medium',
      category: 'RxJS Advanced'
    },
    {
      id: 10,
      question: "Explain the publish() operator and its variants.",
      answer: "publish() converts cold observable to hot ConnectableObservable. Variants: publishReplay(n) - replays n values, publishBehavior(initial) - emits initial value, publishLast() - emits only last value. Must call connect() to start emission.",
      difficulty: 'hard',
      category: 'RxJS Advanced'
    },
    {
      id: 11,
      question: "What is the difference between exhaustMap and switchMap?",
      answer: "exhaustMap: ignores new source emissions while inner observable is active. switchMap: cancels previous inner observable when new source emits. exhaustMap prevents overlapping, switchMap ensures latest response.",
      difficulty: 'medium',
      category: 'RxJS Advanced'
    },
    {
      id: 12,
      question: "How do you implement custom Subject types?",
      answer: "Extend Subject class and override _subscribe() and next() methods. Example: class LoggingSubject extends Subject { next(value) { console.log(value); super.next(value); } }. Can also implement Observer and Observable interfaces.",
      difficulty: 'hard',
      category: 'RxJS Advanced'
    },
    {
      id: 13,
      question: "Explain the concept of lifting in RxJS operators.",
      answer: "Lifting is the process of converting an operator function into an operator that works on Observable. RxJS automatically lifts operators when you use pipe(). Custom lifting: Observable.prototype.customOp = function() { return this.lift(customOperator); }",
      difficulty: 'hard',
      category: 'RxJS Advanced'
    },
    {
      id: 14,
      question: "What are the performance implications of different RxJS operators?",
      answer: "Memory: shareReplay() can cause memory leaks. CPU: complex operators like groupBy, window. Network: switchMap cancels requests, mergeMap can create many concurrent requests. Use takeUntil() for cleanup, avoid nested subscriptions.",
      difficulty: 'medium',
      category: 'RxJS Advanced'
    },
    {
      id: 15,
      question: "How do you test RxJS observables with marble testing?",
      answer: "Use TestScheduler for marble testing: const scheduler = new TestScheduler(); scheduler.run(({ cold, hot, expectObservable }) => { const source = cold('--a--b--c--|'); expectObservable(source.pipe(map(x => x.toUpperCase()))).toBe('--A--B--C--|'); });",
      difficulty: 'hard',
      category: 'RxJS Advanced'
    },

    // Angular Advanced (15 questions)
    {
      id: 16,
      question: "Explain Angular's change detection strategy and how to optimize it.",
      answer: "Angular uses Zone.js to detect changes. Default strategy checks all components. OnPush strategy only checks when: input changes, event occurs, or manually triggered. Optimize with: OnPush, immutable data, async pipe, detach/reattach change detector.",
      difficulty: 'hard',
      category: 'Angular Advanced'
    },
    {
      id: 17,
      question: "What are Angular Elements and how do you create them?",
      answer: "Angular Elements are Angular components packaged as custom elements (web components). Create with: ng add @angular/elements, then createCustomElement(). Can be used in non-Angular apps. Useful for micro-frontends and widget libraries.",
      difficulty: 'medium',
      category: 'Angular Advanced'
    },
    {
      id: 18,
      question: "Explain Angular's dependency injection hierarchy and resolution.",
      answer: "DI hierarchy: ElementInjector (component/directive) -> ModuleInjector (module) -> NullInjector. Resolution bubbles up. Providers can be at component, module, or root level. Use @Optional(), @Self(), @SkipSelf(), @Host() decorators to control resolution.",
      difficulty: 'hard',
      category: 'Angular Advanced'
    },
    {
      id: 19,
      question: "How do you implement lazy loading with preloading strategies?",
      answer: "Lazy loading: loadChildren in routes. Preloading strategies: NoPreloading (default), PreloadAllModules, custom strategies implementing PreloadingStrategy. Configure in RouterModule.forRoot({ preloadingStrategy: PreloadAllModules }).",
      difficulty: 'medium',
      category: 'Angular Advanced'
    },
    {
      id: 20,
      question: "What are Angular schematics and how do you create custom ones?",
      answer: "Schematics are code generators for Angular. Create with: npm install -g @angular-devkit/schematics-cli, schematics blank my-schematic. Define in collection.json, implement in TypeScript. Can generate components, services, modify existing code.",
      difficulty: 'hard',
      category: 'Angular Advanced'
    },
    {
      id: 21,
      question: "Explain Angular's ViewEngine vs Ivy rendering engine differences.",
      answer: "Ivy (default since v9): smaller bundle sizes, better tree-shaking, improved build errors, dynamic imports, better i18n. ViewEngine: legacy renderer. Ivy uses incremental compilation, locality principle, and improved change detection.",
      difficulty: 'medium',
      category: 'Angular Advanced'
    },
    {
      id: 22,
      question: "How do you implement server-side rendering (SSR) with Angular Universal?",
      answer: "Install: ng add @nguniversal/express-engine. Builds separate server bundle. Benefits: SEO, faster initial load. Challenges: no DOM/window, different lifecycle. Use isPlatformBrowser() checks, TransferState for data sharing.",
      difficulty: 'hard',
      category: 'Angular Advanced'
    },
    {
      id: 23,
      question: "What are Angular interceptors and how do you chain them?",
      answer: "Interceptors implement HttpInterceptor interface, intercept HTTP requests/responses. Chain by providing multiple interceptors in order. Use for: authentication, logging, error handling, caching. Example: { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }",
      difficulty: 'medium',
      category: 'Angular Advanced'
    },
    {
      id: 24,
      question: "Explain Angular's content projection and its types.",
      answer: "Content projection displays content from parent in child template. Types: single-slot (<ng-content>), multi-slot (<ng-content select='selector'>), conditional (ngProjectAs). Use for reusable components like modals, cards.",
      difficulty: 'medium',
      category: 'Angular Advanced'
    },
    {
      id: 25,
      question: "How do you implement dynamic component loading?",
      answer: "Use ComponentFactoryResolver (deprecated) or ViewContainerRef.createComponent() (v13+). Steps: get ViewContainerRef, create component, insert into view. Useful for dynamic forms, modals, widgets. Don't forget to destroy components.",
      difficulty: 'hard',
      category: 'Angular Advanced'
    },
    {
      id: 26,
      question: "What are Angular guards and their execution order?",
      answer: "Guards: CanActivate, CanActivateChild, CanDeactivate, CanLoad, Resolve. Execution order: CanLoad -> CanActivate -> CanActivateChild -> Resolve -> Component. Return boolean, Observable<boolean>, or Promise<boolean>.",
      difficulty: 'medium',
      category: 'Angular Advanced'
    },
    {
      id: 27,
      question: "Explain Angular's zone.js and how to run code outside Angular zone.",
      answer: "Zone.js patches async operations to trigger change detection. Run outside zone: NgZone.runOutsideAngular(). Run inside zone: NgZone.run(). Useful for performance optimization, third-party libraries, heavy computations.",
      difficulty: 'hard',
      category: 'Angular Advanced'
    },
    {
      id: 28,
      question: "How do you implement micro-frontends with Angular?",
      answer: "Approaches: Module Federation (Webpack 5), Angular Elements, iframe, single-spa. Module Federation allows runtime sharing of modules. Benefits: independent deployment, technology diversity. Challenges: shared dependencies, communication.",
      difficulty: 'hard',
      category: 'Angular Advanced'
    },
    {
      id: 29,
      question: "What are Angular animations and how do you create complex animations?",
      answer: "Angular animations use Web Animations API. Define with @Component({ animations: [] }). Use trigger(), state(), style(), transition(), animate(). Complex animations: keyframes(), group(), sequence(), query(), stagger().",
      difficulty: 'medium',
      category: 'Angular Advanced'
    },
    {
      id: 30,
      question: "Explain Angular's standalone components and their benefits.",
      answer: "Standalone components (v14+) don't need NgModule. Benefits: simpler architecture, better tree-shaking, easier testing. Use imports: [] in @Component. Can bootstrap directly. Gradual migration from modules possible.",
      difficulty: 'medium',
      category: 'Angular Advanced'
    },

    // TypeScript Advanced (10 questions)
    {
      id: 31,
      question: "Explain TypeScript's advanced type features: mapped types, conditional types, template literal types.",
      answer: "Mapped types: type Readonly<T> = { readonly [P in keyof T]: T[P] }. Conditional types: T extends U ? X : Y. Template literal types: type EventName<T> = `${T}Changed`. Enable powerful type transformations and inference.",
      difficulty: 'hard',
      category: 'TypeScript Advanced'
    },
    {
      id: 32,
      question: "What are TypeScript decorators and how do you create custom ones?",
      answer: "Decorators are functions that modify classes, methods, properties. Create custom: function MyDecorator(target: any, propertyKey: string) { ... }. Angular uses decorators extensively (@Component, @Injectable). Enable in tsconfig: experimentalDecorators: true.",
      difficulty: 'medium',
      category: 'TypeScript Advanced'
    },
    {
      id: 33,
      question: "Explain TypeScript's utility types and when to use them.",
      answer: "Utility types: Partial<T> (optional props), Required<T> (required props), Pick<T, K> (select props), Omit<T, K> (exclude props), Record<K, T> (key-value), ReturnType<T> (function return type). Useful for type transformations.",
      difficulty: 'medium',
      category: 'TypeScript Advanced'
    },
    {
      id: 34,
      question: "How do you implement generic constraints and variance in TypeScript?",
      answer: "Generic constraints: <T extends SomeType>. Variance: covariance (T extends U), contravariance (function parameters), invariance (mutable types). Use keyof, typeof, infer keyword for advanced constraints.",
      difficulty: 'hard',
      category: 'TypeScript Advanced'
    },
    {
      id: 35,
      question: "What are TypeScript's assertion functions and type predicates?",
      answer: "Type predicates: function isString(value: any): value is string { return typeof value === 'string'; }. Assertion functions: function assert(condition: any): asserts condition { if (!condition) throw new Error(); }. Both narrow types.",
      difficulty: 'hard',
      category: 'TypeScript Advanced'
    },
    {
      id: 36,
      question: "Explain TypeScript's module resolution strategies.",
      answer: "Two strategies: Classic (deprecated), Node. Node strategy mimics Node.js resolution. Relative imports (./file) vs non-relative (lodash). Configure with moduleResolution, baseUrl, paths in tsconfig.json. Path mapping for cleaner imports.",
      difficulty: 'medium',
      category: 'TypeScript Advanced'
    },
    {
      id: 37,
      question: "How do you handle TypeScript's strict mode and its benefits?",
      answer: "Strict mode enables: noImplicitAny, strictNullChecks, strictFunctionTypes, strictBindCallApply, strictPropertyInitialization, noImplicitReturns, noImplicitThis. Benefits: better type safety, fewer runtime errors, improved IDE support.",
      difficulty: 'medium',
      category: 'TypeScript Advanced'
    },
    {
      id: 38,
      question: "What are TypeScript's ambient declarations and how do you create them?",
      answer: "Ambient declarations describe existing JavaScript code. Use declare keyword: declare var jQuery: any; declare module 'my-module'. Create .d.ts files for type definitions. Useful for third-party libraries without types.",
      difficulty: 'medium',
      category: 'TypeScript Advanced'
    },
    {
      id: 39,
      question: "Explain TypeScript's intersection and union types with practical examples.",
      answer: "Union types: string | number (either type). Intersection types: A & B (both types). Example: type Employee = Person & { employeeId: number }. Discriminated unions use literal types for type narrowing.",
      difficulty: 'medium',
      category: 'TypeScript Advanced'
    },
    {
      id: 40,
      question: "How do you implement advanced TypeScript patterns like builder pattern with types?",
      answer: "Builder pattern with fluent interface: class Builder<T> { private data: Partial<T> = {}; set<K extends keyof T>(key: K, value: T[K]): Builder<T> { this.data[key] = value; return this; } build(): T { return this.data as T; } }",
      difficulty: 'hard',
      category: 'TypeScript Advanced'
    },

    // Performance & Architecture (10 questions)
    {
      id: 41,
      question: "How do you optimize Angular application performance?",
      answer: "Techniques: OnPush change detection, lazy loading, tree shaking, AOT compilation, service workers, CDN, image optimization, bundle analysis, preloading strategies, virtual scrolling, trackBy functions, async pipe usage.",
      difficulty: 'medium',
      category: 'Performance'
    },
    {
      id: 42,
      question: "Explain different architectural patterns suitable for Angular applications.",
      answer: "Patterns: MVC/MVP/MVVM, Component-based, Feature modules, Barrel exports, Smart/Dumb components, Flux/Redux pattern, CQRS, Micro-frontends, Layered architecture, Domain-driven design principles.",
      difficulty: 'hard',
      category: 'Architecture'
    },
    {
      id: 43,
      question: "How do you implement state management in large Angular applications?",
      answer: "Options: NgRx (Redux pattern), Akita, NGXS, simple services with BehaviorSubject. NgRx: actions, reducers, effects, selectors. Benefits: predictable state, time-travel debugging, DevTools support. Use for complex state.",
      difficulty: 'hard',
      category: 'Architecture'
    },
    {
      id: 44,
      question: "What are the best practices for error handling in Angular applications?",
      answer: "Global error handler: implement ErrorHandler. HTTP errors: interceptors with retry logic. RxJS errors: catchError operator. User-friendly messages, logging, monitoring (Sentry), graceful degradation, error boundaries concept.",
      difficulty: 'medium',
      category: 'Architecture'
    },
    {
      id: 45,
      question: "How do you implement caching strategies in Angular?",
      answer: "HTTP caching: interceptors, browser cache headers. Memory caching: services with Map/WeakMap. RxJS caching: shareReplay(), publishReplay(). Service worker caching. Cache invalidation strategies. Consider cache size and TTL.",
      difficulty: 'medium',
      category: 'Performance'
    },
    {
      id: 46,
      question: "Explain security best practices for Angular applications.",
      answer: "XSS prevention: sanitization, trusted types. CSRF protection: tokens. Content Security Policy. Secure HTTP headers. Authentication: JWT, OAuth. Authorization: guards, role-based access. Dependency scanning, HTTPS only.",
      difficulty: 'medium',
      category: 'Architecture'
    },
    {
      id: 47,
      question: "How do you implement internationalization (i18n) in Angular?",
      answer: "Angular i18n: ng add @angular/localize, mark text with i18n attribute, extract with ng extract-i18n, build with ng build --localize. Runtime i18n: ngx-translate. Consider RTL languages, number/date formatting, pluralization.",
      difficulty: 'medium',
      category: 'Architecture'
    },
    {
      id: 48,
      question: "What are Progressive Web App (PWA) features and how to implement them in Angular?",
      answer: "PWA features: service workers, web app manifest, offline functionality, push notifications, installability. Angular: ng add @angular/pwa. Implements caching strategies, update mechanisms, background sync.",
      difficulty: 'medium',
      category: 'Architecture'
    },
    {
      id: 49,
      question: "How do you implement real-time features in Angular applications?",
      answer: "WebSockets: native WebSocket API or Socket.io. Server-Sent Events (SSE). WebRTC for peer-to-peer. SignalR for .NET backends. Handle connection states, reconnection logic, message queuing, error handling.",
      difficulty: 'hard',
      category: 'Architecture'
    },
    {
      id: 50,
      question: "Explain monitoring and debugging strategies for production Angular applications.",
      answer: "Monitoring: Application Insights, Google Analytics, custom metrics. Error tracking: Sentry, Bugsnag. Performance: Lighthouse, Web Vitals, bundle analyzer. Debugging: source maps, Angular DevTools, NgRx DevTools, console strategies.",
      difficulty: 'medium',
      category: 'Architecture'
    }
  ];

  toggleQuestion(questionId: number): void {
    this.expandedQuestion = this.expandedQuestion === questionId ? null : questionId;
  }

  getQuestionsByCategory(category: string): Question[] {
    return this.questions.filter(q => q.category === category);
  }

  getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'easy': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'hard': return '#EF4444';
      default: return '#6B7280';
    }
  }

  trackByQuestionId(index: number, question: Question): number {
    return question.id;
  }

  getDifficultyCount(category: string, difficulty: string): number {
    return this.getQuestionsByCategory(category).filter(q => q.difficulty === difficulty).length;
  }
}
