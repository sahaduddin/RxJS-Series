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
  selector: 'app-four-year',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './four-year.component.html',
  styleUrl: './four-year.component.scss'
})
export class FourYearComponent {
  expandedQuestion: number | null = null;

  questions: Question[] = [
    // RxJS Expert Level (15 questions)
    {
      id: 1,
      question: "How would you implement a custom RxJS operator that handles exponential backoff retry logic?",
      answer: "Create operator using pipe(): const exponentialBackoff = (maxRetries: number) => <T>(source: Observable<T>) => source.pipe(retryWhen(errors => errors.pipe(scan((acc, error) => ({ count: acc.count + 1, error }), { count: 0, error: null }), map(({ count, error }) => { if (count > maxRetries) throw error; return count; }), delayWhen(retryCount => timer(Math.pow(2, retryCount) * 1000)))))",
      difficulty: 'hard',
      category: 'RxJS Expert'
    },
    {
      id: 2,
      question: "Explain RxJS memory leaks and implement a comprehensive leak detection strategy.",
      answer: "Memory leaks occur from: unclosed subscriptions, shareReplay() without refCount, circular references. Detection: WeakMap tracking, subscription counters, memory profiling. Solution: takeUntil(destroy$), finalize(), custom leak detector service with subscription registry.",
      difficulty: 'hard',
      category: 'RxJS Expert'
    },
    {
      id: 3,
      question: "How do you implement a reactive state machine using RxJS?",
      answer: "Use scan() with state transitions: const stateMachine$ = actions$.pipe(scan((state, action) => { switch(state.current) { case 'idle': return action.type === 'START' ? { current: 'loading', data: null } : state; case 'loading': return action.type === 'SUCCESS' ? { current: 'success', data: action.payload } : state; } }, initialState), distinctUntilChanged())",
      difficulty: 'hard',
      category: 'RxJS Expert'
    },
    {
      id: 4,
      question: "Implement a reactive data synchronization system with conflict resolution.",
      answer: "Combine local and remote streams: const syncedData$ = merge(localChanges$.pipe(tag('local')), remoteChanges$.pipe(tag('remote'))).pipe(scan((state, change) => resolveConflict(state, change), initialState), shareReplay(1)). Conflict resolution uses timestamps, vector clocks, or operational transforms.",
      difficulty: 'hard',
      category: 'RxJS Expert'
    },
    {
      id: 5,
      question: "How do you implement reactive pagination with infinite scroll using RxJS?",
      answer: "Combine scroll events with HTTP requests: const infiniteScroll$ = fromEvent(window, 'scroll').pipe(throttleTime(100), map(() => window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000), distinctUntilChanged(), filter(Boolean), scan(acc => acc + 1, 0), switchMap(page => loadPage(page)), scan((acc, items) => [...acc, ...items], []))",
      difficulty: 'hard',
      category: 'RxJS Expert'
    },
    {
      id: 6,
      question: "Explain RxJS schedulers in depth and implement a custom scheduler.",
      answer: "Schedulers control execution context. Custom scheduler: class CustomScheduler implements SchedulerLike { schedule<T>(work: (state?: T) => void, delay = 0, state?: T): Subscription { const id = setTimeout(() => work(state), delay); return new Subscription(() => clearTimeout(id)); } }. Use for testing, performance optimization.",
      difficulty: 'hard',
      category: 'RxJS Expert'
    },
    {
      id: 7,
      question: "How do you implement reactive form validation with cross-field dependencies?",
      answer: "Use combineLatest for cross-field validation: const validation$ = combineLatest([email$, password$, confirmPassword$]).pipe(map(([email, password, confirm]) => ({ emailValid: isValidEmail(email), passwordMatch: password === confirm, strongPassword: isStrongPassword(password) })), shareReplay(1))",
      difficulty: 'medium',
      category: 'RxJS Expert'
    },
    {
      id: 8,
      question: "Implement a reactive WebSocket connection with automatic reconnection and message queuing.",
      answer: "Use retryWhen for reconnection: const ws$ = defer(() => new WebSocketSubject(url)).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))); Queue messages during disconnection: const messageQueue$ = new BehaviorSubject([]); Send queued messages on reconnection.",
      difficulty: 'hard',
      category: 'RxJS Expert'
    },
    {
      id: 9,
      question: "How do you implement reactive caching with TTL and LRU eviction?",
      answer: "Combine timer for TTL and Map for LRU: const cache = new Map(); const cache$ = source$.pipe(tap(data => { cache.set(key, { data, timestamp: Date.now() }); if (cache.size > maxSize) cache.delete(cache.keys().next().value); }), shareReplay({ bufferSize: 1, refCount: true }))",
      difficulty: 'hard',
      category: 'RxJS Expert'
    },
    {
      id: 10,
      question: "Explain advanced RxJS testing strategies including marble testing for complex scenarios.",
      answer: "Use TestScheduler with marble syntax: scheduler.run(({ cold, hot, expectObservable, flush }) => { const source = hot('--a--b--c--'); const expected = '--x--y--z--'; expectObservable(source.pipe(customOperator())).toBe(expected); }). Test error scenarios, timing, subscriptions with flush().",
      difficulty: 'hard',
      category: 'RxJS Expert'
    },
    {
      id: 11,
      question: "How do you implement reactive event sourcing with RxJS?",
      answer: "Store events in stream: const events$ = new Subject(); const state$ = events$.pipe(scan((state, event) => applyEvent(state, event), initialState), shareReplay(1)); Replay events: const replayEvents$ = from(eventStore.getEvents()).pipe(concat(events$))",
      difficulty: 'hard',
      category: 'RxJS Expert'
    },
    {
      id: 12,
      question: "Implement a reactive rate limiter with token bucket algorithm using RxJS.",
      answer: "Use interval for token generation: const tokens$ = interval(tokenInterval).pipe(scan(tokens => Math.min(tokens + 1, maxTokens), maxTokens)); const rateLimited$ = source$.pipe(withLatestFrom(tokens$), filter(([, tokens]) => tokens > 0), tap(() => tokens$.pipe(take(1), map(t => t - 1))))",
      difficulty: 'hard',
      category: 'RxJS Expert'
    },
    {
      id: 13,
      question: "How do you handle reactive stream composition with dynamic operator injection?",
      answer: "Use higher-order functions: const dynamicPipe = (operators: OperatorFunction<any, any>[]) => <T>(source: Observable<T>) => operators.reduce((obs, op) => obs.pipe(op), source); Apply: source$.pipe(dynamicPipe([map(x => x * 2), filter(x => x > 10)]))",
      difficulty: 'hard',
      category: 'RxJS Expert'
    },
    {
      id: 14,
      question: "Implement reactive data transformation pipeline with error isolation.",
      answer: "Use mergeMap with catchError for isolation: const pipeline$ = source$.pipe(mergeMap(data => processData(data).pipe(catchError(err => of({ error: err, data })))), partition(result => !result.error)); Separate success and error streams.",
      difficulty: 'hard',
      category: 'RxJS Expert'
    },
    {
      id: 15,
      question: "How do you implement reactive circuit breaker pattern with RxJS?",
      answer: "Track failures with scan: const circuitBreaker$ = source$.pipe(mergeMap(req => processRequest(req).pipe(map(res => ({ success: true, data: res })), catchError(err => of({ success: false, error: err })))), scan((state, result) => updateCircuitState(state, result), { state: 'closed', failures: 0 }), switchMap(circuit => circuit.state === 'open' ? throwError('Circuit Open') : of(circuit)))",
      difficulty: 'hard',
      category: 'RxJS Expert'
    },

    // Angular Architecture Expert (15 questions)
    {
      id: 16,
      question: "Design a scalable micro-frontend architecture using Angular and Module Federation.",
      answer: "Use Webpack Module Federation: configure webpack.config.js with ModuleFederationPlugin. Shell app loads remote modules dynamically. Shared dependencies via shared config. Communication through custom events or shared services. Implement: lazy loading, version management, fallback strategies.",
      difficulty: 'hard',
      category: 'Angular Architecture'
    },
    {
      id: 17,
      question: "Implement a custom Angular renderer for non-DOM environments.",
      answer: "Extend Renderer2: class CustomRenderer implements Renderer2 { createElement(name: string): any { return new CustomElement(name); } }. Provide in module: { provide: Renderer2, useClass: CustomRenderer }. Useful for server-side rendering, mobile apps, testing environments.",
      difficulty: 'hard',
      category: 'Angular Architecture'
    },
    {
      id: 18,
      question: "How do you implement advanced change detection optimization strategies?",
      answer: "Strategies: OnPush everywhere, immutable data structures, manual change detection with detectChanges(), zone.js patches removal, async pipe usage, trackBy functions, virtual scrolling, lazy loading, component recycling, memoization with pure pipes.",
      difficulty: 'hard',
      category: 'Angular Architecture'
    },
    {
      id: 19,
      question: "Design a plugin architecture system for Angular applications.",
      answer: "Use dynamic imports and ComponentFactoryResolver: const plugin = await import('./plugins/' + pluginName); const factory = resolver.resolveComponentFactory(plugin.Component); viewContainer.createComponent(factory). Plugin registry service, lifecycle hooks, sandboxing, security considerations.",
      difficulty: 'hard',
      category: 'Angular Architecture'
    },
    {
      id: 20,
      question: "Implement advanced Angular Universal optimization with state transfer and caching.",
      answer: "Use TransferState: constructor(private transferState: TransferState) {}. Server: transferState.set(key, data). Client: transferState.get(key, defaultValue). Implement HTTP interceptor for caching, preboot for event recording, service worker for offline support.",
      difficulty: 'hard',
      category: 'Angular Architecture'
    },
    {
      id: 21,
      question: "How do you implement a custom Angular compiler plugin or schematic?",
      answer: "Schematic: implement Rule function, use Tree for file operations, SchematicContext for logging. Compiler plugin: use TypeScript transformer API, integrate with Angular CLI builder. Example: custom decorator processing, code generation, AST manipulation.",
      difficulty: 'hard',
      category: 'Angular Architecture'
    },
    {
      id: 22,
      question: "Design a comprehensive error boundary system for Angular applications.",
      answer: "Global ErrorHandler: class GlobalErrorHandler implements ErrorHandler { handleError(error: any) { /* log, report, recover */ } }. Component-level: try-catch in lifecycle hooks, async pipe error handling, HTTP interceptor for API errors, user notification system.",
      difficulty: 'medium',
      category: 'Angular Architecture'
    },
    {
      id: 23,
      question: "Implement advanced Angular testing strategies including integration and E2E automation.",
      answer: "Unit: TestBed, ComponentFixture, spies. Integration: NO_ERRORS_SCHEMA, component interaction testing. E2E: Cypress/Protractor with page objects, data attributes for selectors, API mocking, visual regression testing, accessibility testing.",
      difficulty: 'medium',
      category: 'Angular Architecture'
    },
    {
      id: 24,
      question: "How do you implement advanced Angular security measures beyond basic XSS protection?",
      answer: "CSP headers, Trusted Types API, DOMPurify for sanitization, JWT security (httpOnly cookies), CSRF tokens, input validation, output encoding, dependency scanning, security headers, HTTPS enforcement, audit logging.",
      difficulty: 'medium',
      category: 'Angular Architecture'
    },
    {
      id: 25,
      question: "Design a real-time collaborative editing system using Angular and operational transforms.",
      answer: "Use WebSocket for real-time communication, operational transforms for conflict resolution: transform(op1, op2) => [op1', op2']. Implement: cursor synchronization, user presence, undo/redo with OT, persistence layer, offline support with sync.",
      difficulty: 'hard',
      category: 'Angular Architecture'
    },
    {
      id: 26,
      question: "Implement advanced Angular performance monitoring and optimization.",
      answer: "Use Angular DevTools, Lighthouse CI, Web Vitals monitoring. Implement: custom performance marks, bundle analysis automation, runtime performance tracking, memory leak detection, user experience metrics collection.",
      difficulty: 'medium',
      category: 'Angular Architecture'
    },
    {
      id: 27,
      question: "How do you implement advanced Angular i18n with runtime locale switching?",
      answer: "Use Angular i18n with dynamic imports: const localeModule = await import(`./locales/${locale}`). Implement: locale detection, fallback strategies, RTL support, number/date formatting, pluralization rules, translation management workflow.",
      difficulty: 'medium',
      category: 'Angular Architecture'
    },
    {
      id: 28,
      question: "Design a comprehensive Angular application monitoring and observability system.",
      answer: "Implement: error tracking (Sentry), performance monitoring (Application Insights), user analytics (Google Analytics), custom metrics collection, distributed tracing, log aggregation, alerting system, dashboard creation.",
      difficulty: 'medium',
      category: 'Angular Architecture'
    },
    {
      id: 29,
      question: "How do you implement advanced Angular deployment strategies with zero-downtime updates?",
      answer: "Blue-green deployment, canary releases, feature flags, service worker updates, database migrations, rollback strategies, health checks, load balancer configuration, CDN cache invalidation, monitoring during deployment.",
      difficulty: 'medium',
      category: 'Angular Architecture'
    },
    {
      id: 30,
      question: "Implement a sophisticated Angular state management solution with time-travel debugging.",
      answer: "Custom Redux-like implementation: const store = createStore(reducer); const timeTravel = { past: [], present: initialState, future: [] }. Implement: action replay, state snapshots, dev tools integration, persistence, middleware system.",
      difficulty: 'hard',
      category: 'Angular Architecture'
    },

    // TypeScript Expert (10 questions)
    {
      id: 31,
      question: "Implement advanced TypeScript type-level programming with recursive types and template literals.",
      answer: "type DeepReadonly<T> = { readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P] }; type PathsToStringProps<T> = T extends string ? [] : { [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>] }[Extract<keyof T, string>];",
      difficulty: 'hard',
      category: 'TypeScript Expert'
    },
    {
      id: 32,
      question: "How do you implement advanced TypeScript compiler API usage for code analysis?",
      answer: "Use TypeScript Compiler API: const program = ts.createProgram(fileNames, options); const checker = program.getTypeChecker(); function visit(node: ts.Node) { if (ts.isClassDeclaration(node)) { const symbol = checker.getSymbolAtLocation(node.name); } ts.forEachChild(node, visit); }",
      difficulty: 'hard',
      category: 'TypeScript Expert'
    },
    {
      id: 33,
      question: "Implement a type-safe event emitter system using TypeScript's advanced features.",
      answer: "type EventMap = { click: MouseEvent; change: Event; }; class TypedEventEmitter<T extends Record<string, any>> { on<K extends keyof T>(event: K, handler: (data: T[K]) => void) {} emit<K extends keyof T>(event: K, data: T[K]) {} }",
      difficulty: 'hard',
      category: 'TypeScript Expert'
    },
    {
      id: 34,
      question: "How do you implement advanced TypeScript module augmentation and declaration merging?",
      answer: "Module augmentation: declare module 'existing-module' { interface ExistingInterface { newProperty: string; } }. Declaration merging: interface User { name: string; } interface User { age: number; } // Merged: { name: string; age: number; }",
      difficulty: 'medium',
      category: 'TypeScript Expert'
    },
    {
      id: 35,
      question: "Implement a sophisticated TypeScript plugin for custom transformations.",
      answer: "Create transformer: const transformer: ts.TransformerFactory<ts.SourceFile> = context => sourceFile => { const visitor = (node: ts.Node): ts.Node => { if (ts.isCallExpression(node)) { // Transform call expressions } return ts.visitEachChild(node, visitor, context); }; return ts.visitNode(sourceFile, visitor); };",
      difficulty: 'hard',
      category: 'TypeScript Expert'
    },
    {
      id: 36,
      question: "How do you implement advanced TypeScript branded types and nominal typing?",
      answer: "Branded types: type UserId = string & { __brand: 'UserId' }; const createUserId = (id: string): UserId => id as UserId; Nominal typing prevents structural compatibility, useful for IDs, measurements, ensuring type safety at compile time.",
      difficulty: 'medium',
      category: 'TypeScript Expert'
    },
    {
      id: 37,
      question: "Implement advanced TypeScript error handling with discriminated unions and exhaustive checking.",
      answer: "type Result<T, E> = { success: true; data: T } | { success: false; error: E }; function handleResult<T, E>(result: Result<T, E>): T { switch (result.success) { case true: return result.data; case false: throw result.error; default: const _exhaustive: never = result; return _exhaustive; } }",
      difficulty: 'medium',
      category: 'TypeScript Expert'
    },
    {
      id: 38,
      question: "How do you implement TypeScript's advanced inference and control flow analysis?",
      answer: "TypeScript analyzes control flow: function process(value: string | number) { if (typeof value === 'string') { value.toUpperCase(); // TypeScript knows it's string } else { value.toFixed(2); // TypeScript knows it's number } }. Use type predicates, assertion functions for custom narrowing.",
      difficulty: 'medium',
      category: 'TypeScript Expert'
    },
    {
      id: 39,
      question: "Implement a type-safe dependency injection container using TypeScript.",
      answer: "type Constructor<T = {}> = new (...args: any[]) => T; class Container { private services = new Map(); register<T>(token: Constructor<T>, implementation: Constructor<T>) { this.services.set(token, implementation); } resolve<T>(token: Constructor<T>): T { const Service = this.services.get(token); return new Service(); } }",
      difficulty: 'hard',
      category: 'TypeScript Expert'
    },
    {
      id: 40,
      question: "How do you implement advanced TypeScript performance optimization techniques?",
      answer: "Techniques: use const assertions, prefer interfaces over types for objects, avoid deep nesting, use type aliases for complex types, leverage incremental compilation, optimize tsconfig.json, use project references, skip lib checking, use composite projects.",
      difficulty: 'medium',
      category: 'TypeScript Expert'
    },

    // System Design & Leadership (10 questions)
    {
      id: 41,
      question: "Design a scalable real-time chat application architecture using Angular and modern technologies.",
      answer: "Architecture: Angular frontend, Node.js/Socket.io backend, Redis for session storage, MongoDB for messages, CDN for media. Features: message queuing, presence detection, typing indicators, file sharing, encryption, horizontal scaling with load balancers.",
      difficulty: 'hard',
      category: 'System Design'
    },
    {
      id: 42,
      question: "How do you implement a comprehensive CI/CD pipeline for Angular applications?",
      answer: "Pipeline: Git hooks, automated testing (unit/e2e), code quality checks (ESLint/SonarQube), security scanning, build optimization, deployment automation, rollback mechanisms, monitoring, feature flags, A/B testing integration.",
      difficulty: 'medium',
      category: 'System Design'
    },
    {
      id: 43,
      question: "Design a micro-frontend architecture with independent team ownership and deployment.",
      answer: "Architecture: Module Federation, independent repositories, shared design system, API gateway, event-driven communication, isolated testing, independent CI/CD, monitoring per micro-frontend, version management, fallback strategies.",
      difficulty: 'hard',
      category: 'System Design'
    },
    {
      id: 44,
      question: "How do you implement advanced caching strategies for large-scale Angular applications?",
      answer: "Multi-layer caching: browser cache, CDN, service worker, application cache, API cache. Strategies: cache-first, network-first, stale-while-revalidate. Implementation: HTTP interceptors, cache invalidation, cache warming, cache analytics.",
      difficulty: 'medium',
      category: 'System Design'
    },
    {
      id: 45,
      question: "Design a comprehensive monitoring and alerting system for production Angular applications.",
      answer: "Monitoring: error tracking, performance metrics, user analytics, infrastructure monitoring. Tools: Sentry, DataDog, New Relic. Alerting: threshold-based, anomaly detection, escalation policies, incident response, post-mortem analysis.",
      difficulty: 'medium',
      category: 'System Design'
    },
    {
      id: 46,
      question: "How do you lead technical decision-making and architecture reviews in a team?",
      answer: "Process: RFC (Request for Comments), architecture decision records (ADRs), technical design documents, peer review, proof of concepts, risk assessment, stakeholder alignment, documentation, knowledge sharing sessions.",
      difficulty: 'medium',
      category: 'Leadership'
    },
    {
      id: 47,
      question: "Implement a strategy for managing technical debt in large Angular codebases.",
      answer: "Strategy: technical debt inventory, prioritization matrix, refactoring sprints, code quality metrics, automated debt detection, migration guides, team education, gradual modernization, measurement and tracking.",
      difficulty: 'medium',
      category: 'Leadership'
    },
    {
      id: 48,
      question: "How do you design and implement a comprehensive testing strategy for enterprise applications?",
      answer: "Testing pyramid: unit tests (70%), integration tests (20%), e2e tests (10%). Tools: Jest, Cypress, Storybook. Strategies: TDD, BDD, visual regression testing, accessibility testing, performance testing, security testing, test automation.",
      difficulty: 'medium',
      category: 'System Design'
    },
    {
      id: 49,
      question: "Design a scalable state management solution for complex enterprise Angular applications.",
      answer: "Solution: NgRx with feature modules, entity management, effects for side effects, selectors for derived state, dev tools integration, state persistence, optimistic updates, conflict resolution, audit logging.",
      difficulty: 'hard',
      category: 'System Design'
    },
    {
      id: 50,
      question: "How do you implement and manage a design system across multiple Angular applications?",
      answer: "Implementation: Angular library, Storybook for documentation, design tokens, automated visual testing, versioning strategy, migration guides, usage analytics, governance model, contribution guidelines, cross-team collaboration.",
      difficulty: 'medium',
      category: 'System Design'
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
