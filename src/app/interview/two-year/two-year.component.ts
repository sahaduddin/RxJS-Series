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
  selector: 'app-two-year',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './two-year.component.html',
  styleUrl: './two-year.component.scss'
})
export class TwoYearComponent {
  expandedQuestion: number | null = null;

  questions: Question[] = [
    // RxJS Intermediate (15 questions)
    {
      id: 1,
      question: "What is the difference between switchMap, mergeMap, and concatMap?",
      answer: "switchMap cancels previous inner observables when a new value arrives, making it ideal for HTTP requests where you only want the latest result. mergeMap runs all inner observables concurrently without cancellation, good for independent operations. concatMap queues inner observables and runs them sequentially, ensuring order is maintained.",
      difficulty: "medium",
      category: "RxJS Intermediate"
    },
    {
      id: 2,
      question: "Explain the concept of backpressure in RxJS and how to handle it.",
      answer: "Backpressure occurs when data is produced faster than it can be consumed. Handle it using operators like throttleTime (emit at most once per time period), debounceTime (delay emissions), sample (emit latest value at intervals), or buffer operators to collect and process data in batches.",
      difficulty: "medium",
      category: "RxJS Intermediate"
    },
    {
      id: 3,
      question: "What are Higher-Order Observables and when would you use them?",
      answer: "Higher-Order Observables are observables that emit other observables. They're created by operators like map when you return an observable. Use flattening operators (switchMap, mergeMap, concatMap, exhaustMap) to convert them back to regular observables. Common in scenarios like HTTP requests triggered by user input.",
      difficulty: "medium",
      category: "RxJS Intermediate"
    },
    {
      id: 4,
      question: "How do you handle errors in RxJS streams?",
      answer: "Use catchError operator to handle errors gracefully. It can return a fallback observable, rethrow the error, or return EMPTY. Place catchError strategically - after specific operators to handle their errors, or at the end to handle all errors. Use retry/retryWhen for automatic retry logic.",
      difficulty: "medium",
      category: "RxJS Intermediate"
    },
    {
      id: 5,
      question: "What is the difference between hot and cold observables?",
      answer: "Cold observables start producing data when subscribed to - each subscription gets its own data stream (like HTTP requests). Hot observables produce data regardless of subscriptions - subscribers get data from the point they subscribe (like DOM events, subjects). Use share() to convert cold to hot.",
      difficulty: "medium",
      category: "RxJS Intermediate"
    },
    {
      id: 6,
      question: "Explain the purpose of the share() operator.",
      answer: "share() converts a cold observable to hot by sharing a single subscription among multiple subscribers. It prevents duplicate HTTP requests or expensive operations when multiple components subscribe to the same observable. Automatically unsubscribes when all subscribers unsubscribe.",
      difficulty: "medium",
      category: "RxJS Intermediate"
    },
    {
      id: 7,
      question: "What is exhaustMap and when would you use it?",
      answer: "exhaustMap ignores new source emissions while the current inner observable is still active. Use it for scenarios like preventing multiple form submissions, login requests, or any operation where you want to ignore subsequent triggers until the current operation completes.",
      difficulty: "medium",
      category: "RxJS Intermediate"
    },
    {
      id: 8,
      question: "How do you combine multiple observables with different timing requirements?",
      answer: "Use combineLatest for latest values from all sources, merge for concurrent emissions, concat for sequential execution, zip for paired emissions, withLatestFrom for triggered combinations, or forkJoin for waiting until all complete (like Promise.all).",
      difficulty: "medium",
      category: "RxJS Intermediate"
    },
    {
      id: 9,
      question: "What are marble diagrams and how do they help in understanding RxJS?",
      answer: "Marble diagrams are visual representations of observable streams over time. They show when values are emitted, errors occur, or streams complete using symbols on a timeline. They help understand operator behavior, timing, and transformations, making complex async operations easier to visualize and debug.",
      difficulty: "easy",
      category: "RxJS Intermediate"
    },
    {
      id: 10,
      question: "Explain the scan operator and provide a use case.",
      answer: "scan is like reduce but emits intermediate results. It accumulates values over time, emitting each accumulated result. Use cases include running totals, state management, building up objects over time, or creating counters. Example: click stream → scan((acc, _) => acc + 1, 0) → running count.",
      difficulty: "medium",
      category: "RxJS Intermediate"
    },
    {
      id: 11,
      question: "What is the difference between startWith and defaultIfEmpty?",
      answer: "startWith adds an initial value at the beginning of the stream before any source emissions. defaultIfEmpty only emits a value if the source observable completes without emitting any values. startWith always emits, defaultIfEmpty only emits when source is empty.",
      difficulty: "medium",
      category: "RxJS Intermediate"
    },
    {
      id: 12,
      question: "How do you implement custom operators in RxJS?",
      answer: "Create custom operators using the pipe function and existing operators, or use the Observable constructor for complex logic. Example: const multiplyBy = (factor) => pipe(map(x => x * factor)). For complex operators, return a function that takes and returns an Observable.",
      difficulty: "hard",
      category: "RxJS Intermediate"
    },
    {
      id: 13,
      question: "What is the purpose of the finalize operator?",
      answer: "finalize executes a callback when the observable terminates (completes, errors, or unsubscribes). It's like a finally block - always runs regardless of how the stream ends. Use for cleanup operations, logging, or releasing resources. Runs after complete/error but before unsubscription cleanup.",
      difficulty: "medium",
      category: "RxJS Intermediate"
    },
    {
      id: 14,
      question: "Explain the difference between publish, share, and shareReplay.",
      answer: "publish() creates a ConnectableObservable requiring manual connect(). share() auto-connects and disconnects, sharing while there are subscribers. shareReplay() like share() but replays the last N values to new subscribers, useful for caching HTTP responses or maintaining state.",
      difficulty: "hard",
      category: "RxJS Intermediate"
    },
    {
      id: 15,
      question: "How do you handle race conditions in RxJS?",
      answer: "Use switchMap to cancel previous requests, exhaustMap to ignore new requests while one is pending, or implement custom logic with takeUntil. For UI updates, use operators like debounceTime or throttleTime. Always consider the business logic to choose the right strategy.",
      difficulty: "hard",
      category: "RxJS Intermediate"
    },

    // Angular Intermediate (15 questions)
    {
      id: 16,
      question: "What are Angular Guards and what types are available?",
      answer: "Guards control navigation in Angular routing. Types: CanActivate (can route be activated), CanDeactivate (can user leave route), CanLoad (can module be loaded), CanActivateChild (can child routes be activated), and Resolve (pre-fetch data before activation). Implement as services returning boolean/Observable<boolean>/Promise<boolean>.",
      difficulty: "medium",
      category: "Angular Intermediate"
    },
    {
      id: 17,
      question: "Explain Angular's dependency injection system and hierarchical injectors.",
      answer: "Angular's DI creates and manages service instances. Hierarchical injectors form a tree: ModuleInjector (app-wide), ElementInjector (component-specific). Child injectors inherit from parents. Services can be provided at root, module, or component level. Use @Injectable with providedIn or providers array.",
      difficulty: "medium",
      category: "Angular Intermediate"
    },
    {
      id: 18,
      question: "What is the difference between ViewChild and ContentChild?",
      answer: "ViewChild queries elements in the component's template (view). ContentChild queries projected content from parent components. ViewChild is available in AfterViewInit, ContentChild in AfterContentInit. Use ViewChild for template elements, ContentChild for ng-content projections.",
      difficulty: "medium",
      category: "Angular Intermediate"
    },
    {
      id: 19,
      question: "How do you implement custom form validators in Angular?",
      answer: "Create validator functions that return ValidationErrors or null. For template-driven forms, create directive validators. For reactive forms, use validator functions directly. Example: const emailValidator = (control) => /email-regex/.test(control.value) ? null : {email: true}. Use async validators for server-side validation.",
      difficulty: "medium",
      category: "Angular Intermediate"
    },
    {
      id: 20,
      question: "What are Angular Interceptors and how do you use them?",
      answer: "Interceptors intercept HTTP requests/responses for cross-cutting concerns like authentication, logging, error handling. Implement HttpInterceptor interface, modify request/response, and provide in HTTP_INTERCEPTORS. Chain multiple interceptors by providing them in order. Use for adding auth headers, caching, or global error handling.",
      difficulty: "medium",
      category: "Angular Intermediate"
    },
    {
      id: 21,
      question: "Explain Angular's change detection strategy and OnPush optimization.",
      answer: "Default strategy checks all components on every change detection cycle. OnPush strategy only checks when: input properties change, event occurs, or manually triggered with markForCheck(). OnPush improves performance by reducing checks. Use with immutable data patterns and observables with async pipe.",
      difficulty: "medium",
      category: "Angular Intermediate"
    },
    {
      id: 22,
      question: "What are Angular Resolvers and when would you use them?",
      answer: "Resolvers pre-fetch data before route activation, ensuring components receive data immediately. Implement Resolve interface, return Observable/Promise/data. Use for critical data that components need immediately, improving UX by avoiding loading states. Configure in route definition's resolve property.",
      difficulty: "medium",
      category: "Angular Intermediate"
    },
    {
      id: 23,
      question: "How do you implement lazy loading in Angular?",
      answer: "Use loadChildren in route configuration with dynamic imports: {path: 'feature', loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)}. For standalone components, load component directly. Reduces initial bundle size and improves app startup time.",
      difficulty: "medium",
      category: "Angular Intermediate"
    },
    {
      id: 24,
      question: "What is the purpose of Angular's TrackBy function?",
      answer: "TrackBy helps Angular identify list items uniquely in *ngFor, improving performance by reusing DOM elements when data changes. Without trackBy, Angular recreates all DOM elements. Provide a function returning unique identifier: trackByFn(index, item) => item.id. Reduces DOM manipulation and improves rendering performance.",
      difficulty: "medium",
      category: "Angular Intermediate"
    },
    {
      id: 25,
      question: "Explain Angular's content projection and ng-content.",
      answer: "Content projection allows parent components to pass content into child component templates using ng-content. Single projection uses <ng-content></ng-content>. Multi-slot projection uses select attribute: <ng-content select=\".header\"></ng-content>. Enables flexible, reusable components with customizable content.",
      difficulty: "medium",
      category: "Angular Intermediate"
    },
    {
      id: 26,
      question: "What are Angular Pipes and how do you create custom ones?",
      answer: "Pipes transform displayed values in templates. Built-in pipes: date, currency, json, etc. Create custom pipes with @Pipe decorator and PipeTransform interface. Example: @Pipe({name: 'reverse'}) class ReversePipe implements PipeTransform { transform(value: string): string { return value.split('').reverse().join(''); } }",
      difficulty: "easy",
      category: "Angular Intermediate"
    },
    {
      id: 27,
      question: "How do you handle form validation in reactive forms?",
      answer: "Use FormControl, FormGroup, and FormArray with built-in validators (required, email, minLength) or custom validators. Access validation state through form.valid, form.errors, control.hasError(). Display errors conditionally in templates. Use updateValueAndValidity() to trigger validation manually.",
      difficulty: "medium",
      category: "Angular Intermediate"
    },
    {
      id: 28,
      question: "What is Angular's Renderer2 and when should you use it?",
      answer: "Renderer2 provides safe DOM manipulation that works across platforms (browser, server, web workers). Use instead of direct DOM access for setting styles, attributes, or manipulating elements. Methods include createElement, setAttribute, setStyle, listen. Essential for server-side rendering compatibility.",
      difficulty: "medium",
      category: "Angular Intermediate"
    },
    {
      id: 29,
      question: "Explain Angular's ViewEncapsulation modes.",
      answer: "ViewEncapsulation determines how component styles are scoped. Emulated (default): CSS scoped to component with attribute selectors. Native: uses Shadow DOM. None: styles are global. ShadowDom: uses native Shadow DOM v1. Choose based on style isolation needs and browser support requirements.",
      difficulty: "medium",
      category: "Angular Intermediate"
    },
    {
      id: 30,
      question: "How do you optimize Angular applications for performance?",
      answer: "Use OnPush change detection, lazy loading, trackBy functions, async pipe, preloading strategies, tree shaking, AOT compilation, service workers, CDN for assets, minimize bundle size with webpack-bundle-analyzer, implement virtual scrolling for large lists, and use pure pipes.",
      difficulty: "hard",
      category: "Angular Intermediate"
    },

    // TypeScript Intermediate (10 questions)
    {
      id: 31,
      question: "What are TypeScript generics and how do you use them?",
      answer: "Generics allow creating reusable components that work with multiple types while maintaining type safety. Use angle brackets: function identity<T>(arg: T): T { return arg; }. Enable type parameters in functions, classes, and interfaces. Constraints with extends keyword limit allowed types: <T extends string>.",
      difficulty: "medium",
      category: "TypeScript Intermediate"
    },
    {
      id: 32,
      question: "Explain TypeScript's utility types (Partial, Pick, Omit, etc.).",
      answer: "Utility types transform existing types. Partial<T> makes all properties optional. Pick<T, K> selects specific properties. Omit<T, K> excludes properties. Required<T> makes all properties required. Record<K, V> creates object type with specific key-value types. ReturnType<T> extracts function return type.",
      difficulty: "medium",
      category: "TypeScript Intermediate"
    },
    {
      id: 33,
      question: "What are mapped types in TypeScript?",
      answer: "Mapped types create new types by transforming properties of existing types. Syntax: {[K in keyof T]: T[K]}. Add modifiers with +/- for optional (?) or readonly. Example: type Optional<T> = {[K in keyof T]?: T[K]}. Used internally by utility types like Partial and Required.",
      difficulty: "hard",
      category: "TypeScript Intermediate"
    },
    {
      id: 34,
      question: "How do you use conditional types in TypeScript?",
      answer: "Conditional types select types based on conditions using ternary syntax: T extends U ? X : Y. Example: type NonNullable<T> = T extends null | undefined ? never : T. Use with infer keyword to extract types. Powerful for creating flexible, type-safe APIs and utility types.",
      difficulty: "hard",
      category: "TypeScript Intermediate"
    },
    {
      id: 35,
      question: "What is the difference between interface and type in TypeScript?",
      answer: "Interfaces can be extended and merged, support declaration merging, and are better for object shapes. Types are more flexible, support unions, intersections, and computed properties, but cannot be merged. Use interfaces for object contracts, types for unions, computed types, and complex type operations.",
      difficulty: "medium",
      category: "TypeScript Intermediate"
    },
    {
      id: 36,
      question: "Explain TypeScript's module system and import/export patterns.",
      answer: "TypeScript supports ES6 modules with import/export. Named exports: export const func = ..., import { func } from './module'. Default exports: export default class, import Class from './module'. Namespace imports: import * as ns from './module'. Re-exports: export { func } from './other'.",
      difficulty: "easy",
      category: "TypeScript Intermediate"
    },
    {
      id: 37,
      question: "What are decorators in TypeScript and how do you use them?",
      answer: "Decorators are functions that modify classes, methods, properties, or parameters using @decorator syntax. Enable with experimentalDecorators in tsconfig. Examples: @Component for Angular, @Injectable for DI. Create custom decorators for cross-cutting concerns like logging, validation, or metadata.",
      difficulty: "medium",
      category: "TypeScript Intermediate"
    },
    {
      id: 38,
      question: "How do you handle asynchronous operations with TypeScript?",
      answer: "Use Promise<T> for async operations, async/await for cleaner syntax. Type async functions return Promise<ReturnType>. Handle errors with try/catch or .catch(). Use union types for loading states: type State = 'loading' | 'success' | 'error'. Combine with RxJS Observable<T> for reactive programming.",
      difficulty: "medium",
      category: "TypeScript Intermediate"
    },
    {
      id: 39,
      question: "What are template literal types in TypeScript?",
      answer: "Template literal types use template literal syntax to create types from string patterns. Example: type EventName<T> = `on${Capitalize<T>}`. Combine with mapped types for powerful string manipulation. Use for creating type-safe APIs, CSS-in-JS, or configuration objects with string-based keys.",
      difficulty: "hard",
      category: "TypeScript Intermediate"
    },
    {
      id: 40,
      question: "Explain TypeScript's strict mode and its benefits.",
      answer: "Strict mode enables all strict type checking options: noImplicitAny, strictNullChecks, strictFunctionTypes, etc. Benefits include catching more errors at compile time, better IntelliSense, safer refactoring, and improved code quality. Enable with 'strict': true in tsconfig.json. Gradually adopt in existing projects.",
      difficulty: "medium",
      category: "TypeScript Intermediate"
    },

    // Web Development Intermediate (10 questions)
    {
      id: 41,
      question: "What is the difference between localStorage, sessionStorage, and cookies?",
      answer: "localStorage persists until manually cleared, 5-10MB limit, client-side only. sessionStorage persists until tab closes, same size limit. Cookies sent with every HTTP request, 4KB limit, can be httpOnly/secure, have expiration dates. Use localStorage for user preferences, sessionStorage for temporary data, cookies for authentication.",
      difficulty: "easy",
      category: "Web Development Intermediate"
    },
    {
      id: 42,
      question: "Explain CORS (Cross-Origin Resource Sharing) and how to handle it.",
      answer: "CORS is a security mechanism that restricts web pages from making requests to different domains. Browser sends preflight OPTIONS request for complex requests. Server responds with Access-Control-Allow-Origin headers. Handle with proxy in development, proper server configuration in production, or JSONP for older browsers.",
      difficulty: "medium",
      category: "Web Development Intermediate"
    },
    {
      id: 43,
      question: "What are Web Workers and when would you use them?",
      answer: "Web Workers run JavaScript in background threads, preventing UI blocking for CPU-intensive tasks. Use for data processing, image manipulation, cryptography, or complex calculations. Communicate via postMessage/onmessage. Cannot access DOM directly. Types: Dedicated Workers (one-to-one) and Shared Workers (many-to-one).",
      difficulty: "medium",
      category: "Web Development Intermediate"
    },
    {
      id: 44,
      question: "How do you implement responsive design with CSS?",
      answer: "Use flexible grid systems (CSS Grid, Flexbox), relative units (%, em, rem, vw, vh), media queries for breakpoints, mobile-first approach, flexible images (max-width: 100%), and responsive typography (clamp(), fluid typography). Test across devices and use browser dev tools for debugging.",
      difficulty: "medium",
      category: "Web Development Intermediate"
    },
    {
      id: 45,
      question: "What is the Critical Rendering Path and how do you optimize it?",
      answer: "Critical Rendering Path is the sequence of steps browsers take to render pages: DOM construction, CSSOM construction, render tree, layout, paint. Optimize by minimizing critical resources, reducing file sizes, eliminating render-blocking CSS/JS, using async/defer for scripts, and inlining critical CSS.",
      difficulty: "hard",
      category: "Web Development Intermediate"
    },
    {
      id: 46,
      question: "Explain the difference between HTTP/1.1 and HTTP/2.",
      answer: "HTTP/2 features: multiplexing (multiple requests per connection), header compression (HPACK), server push, binary protocol, stream prioritization. HTTP/1.1: text-based, head-of-line blocking, multiple connections needed. HTTP/2 improves performance, reduces latency, but requires HTTPS and modern browsers.",
      difficulty: "medium",
      category: "Web Development Intermediate"
    },
    {
      id: 47,
      question: "What are Service Workers and how do they enable PWA features?",
      answer: "Service Workers are scripts that run in background, acting as proxy between app and network. Enable offline functionality, push notifications, background sync, and caching strategies. Register with navigator.serviceWorker.register(). Essential for Progressive Web Apps (PWAs) to provide native-like experiences.",
      difficulty: "medium",
      category: "Web Development Intermediate"
    },
    {
      id: 48,
      question: "How do you handle authentication in web applications?",
      answer: "Common methods: JWT tokens (stateless, stored in localStorage/cookies), session-based (server-side storage), OAuth for third-party auth. Implement secure storage, token refresh, logout, and protect routes. Use HTTPS, httpOnly cookies for sensitive data, and implement proper CSRF protection.",
      difficulty: "medium",
      category: "Web Development Intermediate"
    },
    {
      id: 49,
      question: "What is webpack and how does it work?",
      answer: "Webpack is a module bundler that processes and bundles assets (JS, CSS, images) for web applications. Uses entry points, loaders (transform files), plugins (extend functionality), and outputs optimized bundles. Features: code splitting, tree shaking, hot module replacement, and asset optimization.",
      difficulty: "medium",
      category: "Web Development Intermediate"
    },
    {
      id: 50,
      question: "Explain the concept of Progressive Enhancement vs Graceful Degradation.",
      answer: "Progressive Enhancement starts with basic functionality and adds advanced features for capable browsers. Graceful Degradation starts with full features and provides fallbacks for older browsers. Progressive Enhancement ensures accessibility and broader compatibility, while Graceful Degradation focuses on modern experience first.",
      difficulty: "medium",
      category: "Web Development Intermediate"
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
