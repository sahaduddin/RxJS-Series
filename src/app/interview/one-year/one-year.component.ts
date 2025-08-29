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
  selector: 'app-one-year',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './one-year.component.html',
  styleUrl: './one-year.component.scss'
})
export class OneYearComponent {
  expandedQuestion: number | null = null;

  questions: Question[] = [
    // RxJS Basics (15 questions)
    {
      id: 1,
      question: "What is RxJS and why is it useful in Angular applications?",
      answer: "RxJS (Reactive Extensions for JavaScript) is a library for reactive programming using Observables. It's useful for handling asynchronous operations, event handling, HTTP requests, and managing complex data flows in Angular applications.",
      difficulty: 'easy',
      category: 'RxJS Basics'
    },
    {
      id: 2,
      question: "Explain the difference between Observable and Promise.",
      answer: "Observable: lazy, can emit multiple values over time, cancellable, supports operators. Promise: eager, emits single value, not cancellable. Observable is more powerful for handling streams of data and complex async operations.",
      difficulty: 'easy',
      category: 'RxJS Basics'
    },
    {
      id: 3,
      question: "What is a Subject in RxJS and when would you use it?",
      answer: "Subject is both Observable and Observer. It can multicast values to multiple subscribers. Use cases: event bus, sharing data between components, converting callback-based APIs to Observable streams.",
      difficulty: 'medium',
      category: 'RxJS Basics'
    },
    {
      id: 4,
      question: "How do you create an Observable from an array?",
      answer: "Use the 'from' operator: from([1, 2, 3, 4]). This creates an Observable that emits each array element sequentially. You can also use 'of' for individual values: of(1, 2, 3, 4).",
      difficulty: 'easy',
      category: 'RxJS Basics'
    },
    {
      id: 5,
      question: "What is the purpose of the subscribe() method?",
      answer: "subscribe() starts the Observable execution and provides callbacks for next, error, and complete events. Syntax: observable.subscribe(nextFn, errorFn, completeFn) or observable.subscribe({ next, error, complete }).",
      difficulty: 'easy',
      category: 'RxJS Basics'
    },
    {
      id: 6,
      question: "Explain the map operator with an example.",
      answer: "map() transforms each emitted value using a provided function. Example: of(1, 2, 3).pipe(map(x => x * 2)) emits 2, 4, 6. It's like Array.map() but for Observable streams.",
      difficulty: 'easy',
      category: 'RxJS Basics'
    },
    {
      id: 7,
      question: "What is the filter operator and how do you use it?",
      answer: "filter() emits only values that pass a predicate function. Example: of(1, 2, 3, 4).pipe(filter(x => x > 2)) emits 3, 4. Similar to Array.filter() but for Observable streams.",
      difficulty: 'easy',
      category: 'RxJS Basics'
    },
    {
      id: 8,
      question: "How do you handle errors in RxJS streams?",
      answer: "Use catchError() operator: stream.pipe(catchError(error => of('default value'))). It catches errors and can return a fallback Observable. Place it strategically in the pipe chain.",
      difficulty: 'medium',
      category: 'RxJS Basics'
    },
    {
      id: 9,
      question: "What is the difference between mergeMap and switchMap?",
      answer: "mergeMap: subscribes to all inner Observables concurrently, doesn't cancel previous ones. switchMap: cancels previous inner Observable when new one arrives. Use switchMap for search, mergeMap for independent operations.",
      difficulty: 'medium',
      category: 'RxJS Basics'
    },
    {
      id: 10,
      question: "How do you combine multiple Observables?",
      answer: "Use combineLatest() for latest values from all: combineLatest([obs1, obs2]). Use merge() to flatten multiple streams: merge(obs1, obs2). Use zip() for paired values: zip(obs1, obs2).",
      difficulty: 'medium',
      category: 'RxJS Basics'
    },
    {
      id: 11,
      question: "What is the take operator and when do you use it?",
      answer: "take(n) emits only the first n values then completes. Example: interval(1000).pipe(take(3)) emits 3 values then completes. Useful for limiting emissions or getting first few values.",
      difficulty: 'easy',
      category: 'RxJS Basics'
    },
    {
      id: 12,
      question: "Explain the debounceTime operator with a use case.",
      answer: "debounceTime(ms) delays emissions until specified time passes without new emissions. Use case: search input - debounceTime(300) waits 300ms after user stops typing before making API call.",
      difficulty: 'medium',
      category: 'RxJS Basics'
    },
    {
      id: 13,
      question: "What is the async pipe in Angular and why is it useful?",
      answer: "Async pipe subscribes to Observable/Promise in template and automatically unsubscribes on component destroy. Usage: {{ observable$ | async }}. Prevents memory leaks and simplifies subscription management.",
      difficulty: 'medium',
      category: 'RxJS Basics'
    },
    {
      id: 14,
      question: "How do you unsubscribe from Observables to prevent memory leaks?",
      answer: "Methods: 1) Store subscription and call unsubscribe() in ngOnDestroy, 2) Use takeUntil(destroy$) pattern, 3) Use async pipe in template, 4) Use takeWhile() with condition.",
      difficulty: 'medium',
      category: 'RxJS Basics'
    },
    {
      id: 15,
      question: "What is the startWith operator and when would you use it?",
      answer: "startWith() emits specified values before the source Observable starts. Example: source$.pipe(startWith('loading')) emits 'loading' first. Useful for initial values, loading states, default values.",
      difficulty: 'easy',
      category: 'RxJS Basics'
    },

    // Angular Fundamentals (15 questions)
    {
      id: 16,
      question: "What is Angular and what are its key features?",
      answer: "Angular is a TypeScript-based web framework. Key features: component-based architecture, dependency injection, two-way data binding, directives, services, routing, HTTP client, forms, animations, testing utilities.",
      difficulty: 'easy',
      category: 'Angular Fundamentals'
    },
    {
      id: 17,
      question: "Explain the Angular component lifecycle hooks.",
      answer: "Lifecycle hooks: ngOnInit (after component initialization), ngOnDestroy (before destruction), ngOnChanges (when inputs change), ngAfterViewInit (after view initialization), ngDoCheck (custom change detection).",
      difficulty: 'medium',
      category: 'Angular Fundamentals'
    },
    {
      id: 18,
      question: "What is dependency injection in Angular?",
      answer: "DI is a design pattern where dependencies are provided to a class rather than created by it. Angular's DI system uses providers, injectors, and tokens. Benefits: testability, modularity, loose coupling.",
      difficulty: 'medium',
      category: 'Angular Fundamentals'
    },
    {
      id: 19,
      question: "How do you pass data between parent and child components?",
      answer: "Parent to child: @Input() properties. Child to parent: @Output() with EventEmitter. Two-way binding: [(ngModel)]. Service sharing: shared service with BehaviorSubject.",
      difficulty: 'medium',
      category: 'Angular Fundamentals'
    },
    {
      id: 20,
      question: "What are Angular directives and their types?",
      answer: "Directives extend HTML functionality. Types: 1) Component directives (with template), 2) Structural directives (*ngIf, *ngFor), 3) Attribute directives (ngClass, ngStyle, custom directives).",
      difficulty: 'medium',
      category: 'Angular Fundamentals'
    },
    {
      id: 21,
      question: "Explain Angular services and how to create them.",
      answer: "Services are singleton classes for business logic, data sharing, HTTP calls. Create with: @Injectable() decorator. Provide in: root (app-wide), component (component-specific), or module level.",
      difficulty: 'medium',
      category: 'Angular Fundamentals'
    },
    {
      id: 22,
      question: "What is Angular routing and how do you configure it?",
      answer: "Routing enables navigation between views. Configure in app.routes.ts: [{ path: 'home', component: HomeComponent }]. Use RouterOutlet, RouterLink, Router service for navigation.",
      difficulty: 'medium',
      category: 'Angular Fundamentals'
    },
    {
      id: 23,
      question: "How do you make HTTP requests in Angular?",
      answer: "Use HttpClient service: inject HttpClient, call methods like get(), post(), put(), delete(). Returns Observables. Configure interceptors for common functionality like authentication.",
      difficulty: 'medium',
      category: 'Angular Fundamentals'
    },
    {
      id: 24,
      question: "What are Angular forms and their types?",
      answer: "Two types: Template-driven forms (ngModel, form validation in template) and Reactive forms (FormControl, FormGroup, validation in component). Reactive forms are more scalable.",
      difficulty: 'medium',
      category: 'Angular Fundamentals'
    },
    {
      id: 25,
      question: "Explain Angular pipes and create a custom pipe.",
      answer: "Pipes transform data in templates. Built-in: date, currency, uppercase. Custom pipe: @Pipe({ name: 'custom' }) class CustomPipe implements PipeTransform { transform(value: any): any { return transformed; } }",
      difficulty: 'medium',
      category: 'Angular Fundamentals'
    },
    {
      id: 26,
      question: "What is Angular CLI and its common commands?",
      answer: "CLI is a command-line tool for Angular development. Commands: ng new (create app), ng generate (create components/services), ng serve (dev server), ng build (production build), ng test (run tests).",
      difficulty: 'easy',
      category: 'Angular Fundamentals'
    },
    {
      id: 27,
      question: "How do you handle form validation in Angular?",
      answer: "Template-driven: use validation attributes (required, minlength). Reactive: use Validators class (Validators.required, Validators.email). Custom validators: functions returning ValidationErrors or null.",
      difficulty: 'medium',
      category: 'Angular Fundamentals'
    },
    {
      id: 28,
      question: "What is Angular module system?",
      answer: "NgModules organize app into cohesive blocks. Root module (AppModule) bootstraps app. Feature modules organize related functionality. Shared modules contain common components/services.",
      difficulty: 'medium',
      category: 'Angular Fundamentals'
    },
    {
      id: 29,
      question: "Explain Angular change detection mechanism.",
      answer: "Angular checks component tree for changes and updates DOM. Triggered by: events, HTTP requests, timers. Zone.js patches async operations. OnPush strategy optimizes by checking only when inputs change.",
      difficulty: 'hard',
      category: 'Angular Fundamentals'
    },
    {
      id: 30,
      question: "How do you optimize Angular application performance?",
      answer: "Techniques: OnPush change detection, lazy loading, tree shaking, AOT compilation, trackBy functions, virtual scrolling, preloading strategies, service workers, bundle analysis.",
      difficulty: 'hard',
      category: 'Angular Fundamentals'
    },

    // TypeScript Basics (10 questions)
    {
      id: 31,
      question: "What is TypeScript and its benefits over JavaScript?",
      answer: "TypeScript is a superset of JavaScript with static typing. Benefits: compile-time error checking, better IDE support, code documentation, refactoring safety, modern ES features, better team collaboration.",
      difficulty: 'easy',
      category: 'TypeScript Basics'
    },
    {
      id: 32,
      question: "Explain TypeScript basic types with examples.",
      answer: "Basic types: string, number, boolean, array (number[]), tuple ([string, number]), enum, any, void, null, undefined, never, object. Example: let name: string = 'John';",
      difficulty: 'easy',
      category: 'TypeScript Basics'
    },
    {
      id: 33,
      question: "What are interfaces in TypeScript and how do you use them?",
      answer: "Interfaces define object structure. Example: interface User { name: string; age: number; }. Use for: type checking, contracts, extending other interfaces. Can have optional properties with ?.",
      difficulty: 'medium',
      category: 'TypeScript Basics'
    },
    {
      id: 34,
      question: "How do you define and use classes in TypeScript?",
      answer: "class Person { constructor(public name: string) {} greet(): string { return `Hello, ${this.name}`; } }. Features: access modifiers (public, private, protected), inheritance, abstract classes.",
      difficulty: 'medium',
      category: 'TypeScript Basics'
    },
    {
      id: 35,
      question: "What are generics in TypeScript and why are they useful?",
      answer: "Generics enable type-safe code that works with multiple types. Example: function identity<T>(arg: T): T { return arg; }. Benefits: reusability, type safety, better IntelliSense.",
      difficulty: 'medium',
      category: 'TypeScript Basics'
    },
    {
      id: 36,
      question: "Explain union and intersection types in TypeScript.",
      answer: "Union types (|): value can be one of several types. Example: string | number. Intersection types (&): combines multiple types. Example: Person & Employee has properties of both.",
      difficulty: 'medium',
      category: 'TypeScript Basics'
    },
    {
      id: 37,
      question: "What are TypeScript enums and when do you use them?",
      answer: "Enums define named constants. Example: enum Color { Red, Green, Blue }. Types: numeric (default), string, heterogeneous. Use for: fixed set of values, better code readability, type safety.",
      difficulty: 'easy',
      category: 'TypeScript Basics'
    },
    {
      id: 38,
      question: "How do you handle null and undefined in TypeScript?",
      answer: "Use strict null checks in tsconfig. Optional chaining: obj?.prop. Nullish coalescing: value ?? defaultValue. Type guards: if (value !== null). Union types: string | null.",
      difficulty: 'medium',
      category: 'TypeScript Basics'
    },
    {
      id: 39,
      question: "What are type assertions in TypeScript?",
      answer: "Type assertions tell compiler about variable type. Syntax: value as Type or <Type>value. Example: (document.getElementById('myId') as HTMLInputElement).value. Use carefully, no runtime checking.",
      difficulty: 'medium',
      category: 'TypeScript Basics'
    },
    {
      id: 40,
      question: "Explain TypeScript modules and how to import/export.",
      answer: "Modules organize code. Export: export class MyClass {} or export default MyClass. Import: import { MyClass } from './module' or import MyClass from './module'. Supports ES6 module syntax.",
      difficulty: 'easy',
      category: 'TypeScript Basics'
    },

    // Web Development Fundamentals (10 questions)
    {
      id: 41,
      question: "What is the difference between let, const, and var in JavaScript?",
      answer: "var: function-scoped, hoisted, can be redeclared. let: block-scoped, hoisted but not initialized, cannot be redeclared. const: block-scoped, must be initialized, cannot be reassigned (but objects can be mutated).",
      difficulty: 'easy',
      category: 'Web Fundamentals'
    },
    {
      id: 42,
      question: "Explain JavaScript closures with an example.",
      answer: "Closure is when inner function has access to outer function's variables. Example: function outer(x) { return function inner(y) { return x + y; }; } const add5 = outer(5); Inner function remembers x value.",
      difficulty: 'medium',
      category: 'Web Fundamentals'
    },
    {
      id: 43,
      question: "What is the event loop in JavaScript?",
      answer: "Event loop handles asynchronous operations. Call stack executes functions, Web APIs handle async operations, callback queue holds completed callbacks, event loop moves callbacks to call stack when stack is empty.",
      difficulty: 'medium',
      category: 'Web Fundamentals'
    },
    {
      id: 44,
      question: "Explain the difference between == and === in JavaScript.",
      answer: "== (loose equality): performs type coercion before comparison. === (strict equality): compares value and type without coercion. Example: '5' == 5 is true, '5' === 5 is false.",
      difficulty: 'easy',
      category: 'Web Fundamentals'
    },
    {
      id: 45,
      question: "What are JavaScript promises and how do they work?",
      answer: "Promises handle asynchronous operations. States: pending, fulfilled, rejected. Methods: then(), catch(), finally(). Example: fetch(url).then(response => response.json()).catch(error => console.error(error)).",
      difficulty: 'medium',
      category: 'Web Fundamentals'
    },
    {
      id: 46,
      question: "Explain async/await in JavaScript.",
      answer: "async/await is syntactic sugar for promises. async function returns promise, await pauses execution until promise resolves. Example: async function getData() { const response = await fetch(url); return response.json(); }",
      difficulty: 'medium',
      category: 'Web Fundamentals'
    },
    {
      id: 47,
      question: "What is the DOM and how do you manipulate it?",
      answer: "DOM (Document Object Model) represents HTML as tree structure. Manipulation: getElementById(), querySelector(), createElement(), appendChild(), removeChild(), addEventListener(), innerHTML, textContent.",
      difficulty: 'easy',
      category: 'Web Fundamentals'
    },
    {
      id: 48,
      question: "Explain CSS flexbox and its main properties.",
      answer: "Flexbox is 1D layout method. Container properties: display: flex, flex-direction, justify-content, align-items, flex-wrap. Item properties: flex-grow, flex-shrink, flex-basis, align-self.",
      difficulty: 'medium',
      category: 'Web Fundamentals'
    },
    {
      id: 49,
      question: "What is responsive web design and how do you implement it?",
      answer: "Responsive design adapts to different screen sizes. Techniques: fluid grids, flexible images, media queries, mobile-first approach, viewport meta tag, CSS Grid, Flexbox, relative units (%, em, rem).",
      difficulty: 'medium',
      category: 'Web Fundamentals'
    },
    {
      id: 50,
      question: "Explain the HTTP request/response cycle and common status codes.",
      answer: "Client sends HTTP request to server, server processes and sends response. Status codes: 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Internal Server Error).",
      difficulty: 'easy',
      category: 'Web Fundamentals'
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
