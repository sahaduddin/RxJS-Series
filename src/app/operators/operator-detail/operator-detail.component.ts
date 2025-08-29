import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, from, interval, timer, map, filter, take, skip, tap, delay, switchMap, mergeMap, concatMap, distinctUntilChanged, merge, combineLatest, zip, concat, catchError, finalize } from 'rxjs';

export interface OperatorExample {
  title: string;
  code: string;
  explanation: string;
  output: string;
}

export interface OperatorDetail {
  id: string;
  name: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  detailedExplanation: string;
  useCases: string[];
  examples: OperatorExample[];
  relatedOperators: string[];
}

@Component({
  selector: 'app-operator-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './operator-detail.component.html',
  styleUrls: ['./operator-detail.component.scss']
})
export class OperatorDetailComponent implements OnInit {
  operatorId: string = '';
  operator: OperatorDetail | null = null;
  isRunningExample = false;
  currentOutput = '';

  private operatorsData: { [key: string]: OperatorDetail } = {
    'map': {
      id: 'map',
      name: 'map',
      category: 'Transformation',
      difficulty: 'beginner',
      description: 'Transforms each emitted value using a function',
      detailedExplanation: 'The map operator is like a factory worker on an assembly line. It takes each item that comes down the line (each value from the Observable), applies a transformation function to it, and passes the transformed item to the next station. Think of it as a "value transformer" - whatever goes in gets changed according to your rules and comes out different.',
      useCases: [
        'Converting data types (string to number, etc.)',
        'Extracting specific properties from objects',
        'Performing calculations on each value',
        'Formatting data for display',
        'Adding or modifying object properties'
      ],
      examples: [
        {
          title: 'Basic Number Transformation',
          code: `// Double each number
const numbers$ = of(1, 2, 3, 4, 5);
const doubled$ = numbers$.pipe(
  map(x => x * 2)
);

doubled$.subscribe(result => console.log(result));`,
          explanation: 'This example takes each number and multiplies it by 2. The map operator applies the transformation function (x => x * 2) to each emitted value.',
          output: '2\n4\n6\n8\n10'
        },
        {
          title: 'Object Property Extraction',
          code: `// Extract names from user objects
const users$ = of(
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 }
);

const names$ = users$.pipe(
  map(user => user.name)
);

names$.subscribe(name => console.log(name));`,
          explanation: 'Here we extract just the name property from each user object. The map operator transforms each complete user object into just a string containing the name.',
          output: 'Alice\nBob\nCharlie'
        }
      ],
      relatedOperators: ['switchMap', 'mergeMap', 'concatMap', 'tap']
    },
    'filter': {
      id: 'filter',
      name: 'filter',
      category: 'Filtering',
      difficulty: 'beginner',
      description: 'Emits only values that pass a test condition',
      detailedExplanation: 'The filter operator works like a bouncer at a club - it only lets through values that meet your criteria. You provide a test function that returns true or false, and only values that return true are allowed to pass through to the next operator or subscriber. Values that return false are simply ignored.',
      useCases: [
        'Removing unwanted values from a stream',
        'Finding items that match specific criteria',
        'Filtering out null or undefined values',
        'Selecting items based on user preferences',
        'Removing duplicates or invalid data'
      ],
      examples: [
        {
          title: 'Filter Even Numbers',
          code: `// Only emit even numbers
const numbers$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
const evenNumbers$ = numbers$.pipe(
  filter(x => x % 2 === 0)
);

evenNumbers$.subscribe(result => console.log(result));`,
          explanation: 'This example only allows even numbers to pass through. The filter function (x => x % 2 === 0) returns true for even numbers and false for odd numbers.',
          output: '2\n4\n6\n8\n10'
        },
        {
          title: 'Filter Objects by Property',
          code: `// Only emit adults (age >= 18)
const people$ = of(
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 16 },
  { name: 'Charlie', age: 30 },
  { name: 'David', age: 15 }
);

const adults$ = people$.pipe(
  filter(person => person.age >= 18)
);

adults$.subscribe(adult => console.log(adult.name));`,
          explanation: 'This filters out people under 18 years old. Only objects where the age property is 18 or greater will be emitted.',
          output: 'Alice\nCharlie'
        }
      ],
      relatedOperators: ['take', 'skip', 'distinctUntilChanged', 'takeWhile']
    },
    'of': {
      id: 'of',
      name: 'of',
      category: 'Creation',
      difficulty: 'beginner',
      description: 'Creates an Observable that emits the values you provide',
      detailedExplanation: 'The "of" operator is like a simple announcement system. You give it a list of values, and it creates an Observable that will emit each of those values one by one, then complete. It\'s the easiest way to create an Observable from known values. Think of it as converting a regular list into a stream of data.',
      useCases: [
        'Creating test data for development',
        'Converting static values into Observable streams',
        'Providing default or fallback values',
        'Creating simple data sequences',
        'Testing Observable chains with known values'
      ],
      examples: [
        {
          title: 'Simple Value Emission',
          code: `// Emit a sequence of numbers
const numbers$ = of(1, 2, 3, 4, 5);

numbers$.subscribe(value => console.log(value));`,
          explanation: 'This creates an Observable that emits the numbers 1, 2, 3, 4, 5 in sequence, then completes.',
          output: '1\n2\n3\n4\n5'
        },
        {
          title: 'Mixed Data Types',
          code: `// Emit different types of values
const mixed$ = of('Hello', 42, true, { name: 'RxJS' });

mixed$.subscribe(value => console.log(typeof value, ':', value));`,
          explanation: 'The "of" operator can emit any type of values - strings, numbers, booleans, objects, etc.',
          output: 'string : Hello\nnumber : 42\nboolean : true\nobject : { name: "RxJS" }'
        }
      ],
      relatedOperators: ['from', 'interval', 'timer', 'range']
    },
    'switchMap': {
      id: 'switchMap',
      name: 'switchMap',
      category: 'Transformation',
      difficulty: 'intermediate',
      description: 'Maps to Observable, cancels previous inner Observable',
      detailedExplanation: 'SwitchMap is like a person who can only focus on one task at a time. When a new value comes in, it starts a new "inner" Observable for that value. But here\'s the key: if another value comes in before the current task is finished, it immediately cancels the current task and starts working on the new one. This "switching" behavior makes it perfect for scenarios like search suggestions where you only care about the latest request.',
      useCases: [
        'Search functionality (cancel previous searches)',
        'HTTP requests where only the latest matters',
        'Navigation between pages',
        'Auto-save features',
        'Real-time data updates'
      ],
      examples: [
        {
          title: 'Search with Cancellation',
          code: `// Simulate search requests
const searchTerm$ = of('a', 'ab', 'abc');

const searchResults$ = searchTerm$.pipe(
  switchMap(term => 
    timer(1000).pipe(
      map(() => \`Results for: \${term}\`)
    )
  )
);

searchResults$.subscribe(result => console.log(result));`,
          explanation: 'Each search term triggers a 1-second delay (simulating an API call). SwitchMap cancels previous searches when a new term arrives, so only the final search completes.',
          output: 'Results for: abc'
        }
      ],
      relatedOperators: ['mergeMap', 'concatMap', 'exhaustMap', 'map']
    },
    'from': {
      id: 'from',
      name: 'from',
      category: 'Creation',
      difficulty: 'beginner',
      description: 'Converts arrays, promises, or other sources into Observables',
      detailedExplanation: 'The "from" operator is like a universal translator that can convert different types of data sources into Observable streams. Whether you have an array, a Promise, or even an iterable, "from" can transform it into an Observable that emits each item one by one.',
      useCases: [
        'Converting arrays to Observable streams',
        'Converting Promises to Observables',
        'Working with iterables and generators',
        'Migrating from Promise-based to Observable-based code',
        'Creating streams from existing data structures'
      ],
      examples: [
        {
          title: 'Array to Observable',
          code: `// Convert array to Observable
const array = [1, 2, 3, 4, 5];
const stream$ = from(array);

stream$.subscribe(value => console.log(value));`,
          explanation: 'This converts a regular JavaScript array into an Observable stream that emits each array element sequentially.',
          output: '1\n2\n3\n4\n5'
        }
      ],
      relatedOperators: ['of', 'interval', 'timer', 'fromEvent']
    },
    'interval': {
      id: 'interval',
      name: 'interval',
      category: 'Creation',
      difficulty: 'beginner',
      description: 'Creates an Observable that emits numbers at regular intervals',
      detailedExplanation: 'The interval operator is like a metronome or timer that counts up from 0 at regular intervals. It\'s perfect for creating periodic events, like updating a clock, polling for data, or creating animations.',
      useCases: [
        'Creating periodic timers',
        'Polling APIs at regular intervals',
        'Building animations and transitions',
        'Implementing auto-refresh functionality',
        'Creating heartbeat mechanisms'
      ],
      examples: [
        {
          title: 'Simple Timer',
          code: `// Emit numbers every second
const timer$ = interval(1000);

timer$.pipe(take(5)).subscribe(value => 
  console.log(\`Timer: \${value}\`)
);`,
          explanation: 'This creates a timer that emits 0, 1, 2, 3, 4 at one-second intervals, then stops after 5 emissions.',
          output: 'Timer: 0\nTimer: 1\nTimer: 2\nTimer: 3\nTimer: 4'
        }
      ],
      relatedOperators: ['timer', 'of', 'from', 'take']
    },
    'timer': {
      id: 'timer',
      name: 'timer',
      category: 'Creation',
      difficulty: 'beginner',
      description: 'Creates an Observable that waits, then emits numbers at intervals',
      detailedExplanation: 'The timer operator is like an alarm clock that can wait for a specific time before starting, and then optionally repeat at intervals. It\'s more flexible than interval because you can control both the initial delay and the repeat interval.',
      useCases: [
        'Delayed execution of code',
        'Creating timeouts',
        'Implementing retry mechanisms with delays',
        'Building scheduled tasks',
        'Creating debounced operations'
      ],
      examples: [
        {
          title: 'Delayed Start',
          code: `// Wait 2 seconds, then emit every second
const delayedTimer$ = timer(2000, 1000);

delayedTimer$.pipe(take(3)).subscribe(value => 
  console.log(\`Delayed: \${value}\`)
);`,
          explanation: 'This waits 2 seconds before emitting the first value (0), then emits 1, 2 at one-second intervals.',
          output: 'Delayed: 0\nDelayed: 1\nDelayed: 2'
        }
      ],
      relatedOperators: ['interval', 'delay', 'of', 'take']
    },
    'take': {
      id: 'take',
      name: 'take',
      category: 'Filtering',
      difficulty: 'beginner',
      description: 'Emits only the first n values, then completes',
      detailedExplanation: 'The take operator is like a bouncer who only lets the first few people into a club, then closes the door. It takes exactly the number of values you specify from the beginning of the stream, then completes the Observable.',
      useCases: [
        'Limiting the number of emissions',
        'Taking samples from infinite streams',
        'Implementing "first few results" logic',
        'Preventing infinite subscriptions',
        'Creating finite streams from infinite ones'
      ],
      examples: [
        {
          title: 'Take First 3',
          code: `// Take only first 3 values
const numbers$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
const firstThree$ = numbers$.pipe(take(3));

firstThree$.subscribe(value => console.log(value));`,
          explanation: 'This takes only the first 3 values from the stream and ignores the rest.',
          output: '1\n2\n3'
        }
      ],
      relatedOperators: ['skip', 'first', 'last', 'takeWhile']
    },
    'skip': {
      id: 'skip',
      name: 'skip',
      category: 'Filtering',
      difficulty: 'beginner',
      description: 'Skips the first n values from the Observable',
      detailedExplanation: 'The skip operator is like ignoring the first few items in a line and starting from a specific point. It discards the first n values and then emits all subsequent values normally.',
      useCases: [
        'Ignoring initial values',
        'Skipping headers or metadata',
        'Starting from a specific point in a stream',
        'Removing warm-up or initialization data',
        'Implementing pagination logic'
      ],
      examples: [
        {
          title: 'Skip First 3',
          code: `// Skip first 3 values
const numbers$ = of(1, 2, 3, 4, 5, 6, 7, 8);
const afterSkip$ = numbers$.pipe(skip(3));

afterSkip$.subscribe(value => console.log(value));`,
          explanation: 'This skips the first 3 values (1, 2, 3) and emits the remaining values.',
          output: '4\n5\n6\n7\n8'
        }
      ],
      relatedOperators: ['take', 'skipWhile', 'first', 'last']
    },
    'distinctUntilChanged': {
      id: 'distinctUntilChanged',
      name: 'distinctUntilChanged',
      category: 'Filtering',
      difficulty: 'intermediate',
      description: 'Emits only when the current value is different from the last',
      detailedExplanation: 'The distinctUntilChanged operator is like a smart filter that only lets through values that are different from the previous one. If the same value comes twice in a row, it blocks the duplicate. It\'s perfect for removing consecutive duplicates from a stream.',
      useCases: [
        'Removing consecutive duplicate values',
        'Optimizing API calls by avoiding redundant requests',
        'Filtering user input to prevent spam',
        'Implementing efficient change detection',
        'Reducing unnecessary updates in UI'
      ],
      examples: [
        {
          title: 'Remove Consecutive Duplicates',
          code: `// Remove consecutive duplicates
const values$ = of(1, 1, 2, 2, 2, 3, 1, 1);
const distinct$ = values$.pipe(distinctUntilChanged());

distinct$.subscribe(value => console.log(value));`,
          explanation: 'This removes consecutive duplicate values, keeping only the first occurrence of each consecutive group.',
          output: '1\n2\n3\n1'
        }
      ],
      relatedOperators: ['distinct', 'filter', 'debounceTime', 'throttleTime']
    },
    'mergeMap': {
      id: 'mergeMap',
      name: 'mergeMap',
      category: 'Transformation',
      difficulty: 'intermediate',
      description: 'Maps to Observable, merges all inner Observables',
      detailedExplanation: 'MergeMap is like a multitasking manager who can handle multiple tasks simultaneously. When a new value comes in, it starts a new "inner" Observable for that value, but unlike switchMap, it keeps all previous tasks running. All results are merged together as they complete.',
      useCases: [
        'Parallel HTTP requests',
        'Handling multiple concurrent operations',
        'File uploads with multiple files',
        'Real-time data processing',
        'Concurrent API calls'
      ],
      examples: [
        {
          title: 'Parallel Processing',
          code: `// Process multiple items in parallel
const items$ = of('A', 'B', 'C');
const processed$ = items$.pipe(
  mergeMap(item => 
    timer(Math.random() * 1000).pipe(
      map(() => \`Processed: \${item}\`)
    )
  )
);

processed$.subscribe(result => console.log(result));`,
          explanation: 'This processes multiple items in parallel, with results arriving in the order they complete (not necessarily the original order).',
          output: 'Processed: B\nProcessed: A\nProcessed: C'
        }
      ],
      relatedOperators: ['switchMap', 'concatMap', 'exhaustMap', 'map']
    },
    'concatMap': {
      id: 'concatMap',
      name: 'concatMap',
      category: 'Transformation',
      difficulty: 'intermediate',
      description: 'Maps to Observable, waits for each to complete before next',
      detailedExplanation: 'ConcatMap is like a patient queue manager who processes one task at a time in order. When a new value comes in, it creates an inner Observable but waits for the current one to complete before starting the next. This ensures order is preserved.',
      useCases: [
        'Sequential HTTP requests',
        'Ordered file processing',
        'Step-by-step workflows',
        'Database transactions that must be sequential',
        'Animation sequences'
      ],
      examples: [
        {
          title: 'Sequential Processing',
          code: `// Process items one by one in order
const items$ = of('First', 'Second', 'Third');
const sequential$ = items$.pipe(
  concatMap(item => 
    timer(1000).pipe(
      map(() => \`Completed: \${item}\`)
    )
  )
);

sequential$.subscribe(result => console.log(result));`,
          explanation: 'This processes items one at a time, waiting for each to complete before starting the next, maintaining order.',
          output: 'Completed: First\nCompleted: Second\nCompleted: Third'
        }
      ],
      relatedOperators: ['switchMap', 'mergeMap', 'exhaustMap', 'map']
    },
    'merge': {
      id: 'merge',
      name: 'merge',
      category: 'Combination',
      difficulty: 'intermediate',
      description: 'Combines multiple Observables into one by merging their emissions',
      detailedExplanation: 'The merge operator is like mixing multiple streams of water into one river. It takes emissions from multiple Observables and combines them into a single stream, emitting values as they arrive from any source.',
      useCases: [
        'Combining multiple data sources',
        'Merging user interactions from different elements',
        'Combining real-time updates from multiple APIs',
        'Aggregating events from multiple sources',
        'Creating unified event streams'
      ],
      examples: [
        {
          title: 'Merge Multiple Streams',
          code: `// Merge two streams
const stream1$ = interval(1000).pipe(map(x => \`A\${x}\`));
const stream2$ = interval(1500).pipe(map(x => \`B\${x}\`));
const merged$ = merge(stream1$, stream2$);

merged$.pipe(take(6)).subscribe(value => console.log(value));`,
          explanation: 'This merges two interval streams, emitting values from both as they arrive.',
          output: 'A0\nB0\nA1\nA2\nB1\nA3'
        }
      ],
      relatedOperators: ['combineLatest', 'zip', 'concat', 'race']
    },
    'combineLatest': {
      id: 'combineLatest',
      name: 'combineLatest',
      category: 'Combination',
      difficulty: 'intermediate',
      description: 'Combines latest values from multiple Observables',
      detailedExplanation: 'CombineLatest is like a dashboard that shows the most recent value from each data source. Whenever any source emits a new value, it combines that with the latest values from all other sources and emits the combined result.',
      useCases: [
        'Form validation with multiple fields',
        'Combining user preferences with data',
        'Real-time calculations with multiple inputs',
        'Reactive dashboards',
        'Multi-criteria filtering'
      ],
      examples: [
        {
          title: 'Combine Form Fields',
          code: `// Combine latest values from multiple sources
const name$ = of('Alice', 'Bob');
const age$ = of(25, 30);
const combined$ = combineLatest([name$, age$]);

combined$.subscribe(([name, age]) => 
  console.log(\`\${name} is \${age} years old\`)
);`,
          explanation: 'This combines the latest values from both streams whenever either emits.',
          output: 'Alice is 25 years old\nBob is 25 years old\nBob is 30 years old'
        }
      ],
      relatedOperators: ['zip', 'merge', 'withLatestFrom', 'startWith']
    },
    'zip': {
      id: 'zip',
      name: 'zip',
      category: 'Combination',
      difficulty: 'intermediate',
      description: 'Combines Observables by pairing their emissions in order',
      detailedExplanation: 'The zip operator is like pairing dance partners - it takes the first value from each Observable and pairs them together, then the second values, and so on. It waits for all Observables to emit before creating each pair.',
      useCases: [
        'Pairing related data from different sources',
        'Synchronizing parallel operations',
        'Combining arrays element by element',
        'Creating coordinate pairs',
        'Matching requests with responses'
      ],
      examples: [
        {
          title: 'Pair Values in Order',
          code: `// Zip values in pairs
const letters$ = of('A', 'B', 'C');
const numbers$ = of(1, 2, 3);
const zipped$ = zip(letters$, numbers$);

zipped$.subscribe(([letter, number]) => 
  console.log(\`\${letter}\${number}\`)
);`,
          explanation: 'This pairs the first letter with the first number, second with second, etc.',
          output: 'A1\nB2\nC3'
        }
      ],
      relatedOperators: ['combineLatest', 'merge', 'withLatestFrom', 'forkJoin']
    },
    'concat': {
      id: 'concat',
      name: 'concat',
      category: 'Combination',
      difficulty: 'beginner',
      description: 'Concatenates Observables one after another',
      detailedExplanation: 'The concat operator is like reading books in order - it waits for the first Observable to complete entirely before starting the second one. It creates a sequence where Observables are processed one after another.',
      useCases: [
        'Sequential data loading',
        'Ordered operations',
        'Creating workflows with dependencies',
        'Chaining API calls',
        'Building step-by-step processes'
      ],
      examples: [
        {
          title: 'Sequential Streams',
          code: `// Concatenate streams in order
const first$ = of(1, 2, 3);
const second$ = of(4, 5, 6);
const concatenated$ = concat(first$, second$);

concatenated$.subscribe(value => console.log(value));`,
          explanation: 'This emits all values from the first stream, then all values from the second stream.',
          output: '1\n2\n3\n4\n5\n6'
        }
      ],
      relatedOperators: ['merge', 'combineLatest', 'startWith', 'endWith']
    },
    'tap': {
      id: 'tap',
      name: 'tap',
      category: 'Utility',
      difficulty: 'beginner',
      description: 'Performs side effects without changing the emitted values',
      detailedExplanation: 'The tap operator is like a security camera that observes everything passing by without interfering. It lets you perform side effects (like logging, debugging, or updating UI) while keeping the original values flowing unchanged through the stream.',
      useCases: [
        'Debugging and logging values',
        'Updating UI or state without changing data',
        'Performing analytics or tracking',
        'Triggering side effects',
        'Monitoring stream behavior'
      ],
      examples: [
        {
          title: 'Debug Logging',
          code: `// Log values without changing them
const numbers$ = of(1, 2, 3, 4, 5);
const withLogging$ = numbers$.pipe(
  tap(value => console.log(\`Processing: \${value}\`)),
  map(x => x * 2),
  tap(value => console.log(\`Result: \${value}\`))
);

withLogging$.subscribe();`,
          explanation: 'This logs values at different stages of processing without changing the actual data flow.',
          output: 'Processing: 1\nResult: 2\nProcessing: 2\nResult: 4\nProcessing: 3\nResult: 6'
        }
      ],
      relatedOperators: ['map', 'filter', 'finalize', 'catchError']
    },
    'delay': {
      id: 'delay',
      name: 'delay',
      category: 'Utility',
      difficulty: 'beginner',
      description: 'Delays the emission of items by a specified time',
      detailedExplanation: 'The delay operator is like adding a pause button to your stream. It takes all the values and delays their emission by a specified amount of time, maintaining the original timing relationships between values.',
      useCases: [
        'Adding artificial delays for testing',
        'Creating smooth animations',
        'Simulating network latency',
        'Implementing retry delays',
        'Creating timed sequences'
      ],
      examples: [
        {
          title: 'Delayed Emission',
          code: `// Delay all values by 2 seconds
const immediate$ = of('Hello', 'World');
const delayed$ = immediate$.pipe(delay(2000));

console.log('Starting...');
delayed$.subscribe(value => 
  console.log(\`Delayed: \${value}\`)
);`,
          explanation: 'This delays all emissions by 2 seconds while maintaining their relative timing.',
          output: 'Starting...\n(2 second delay)\nDelayed: Hello\nDelayed: World'
        }
      ],
      relatedOperators: ['timer', 'debounceTime', 'throttleTime', 'delayWhen']
    },
    'catchError': {
      id: 'catchError',
      name: 'catchError',
      category: 'Utility',
      difficulty: 'intermediate',
      description: 'Catches errors and returns a new Observable or throws',
      detailedExplanation: 'The catchError operator is like a safety net that catches errors before they crash your application. When an error occurs in the stream, it intercepts it and allows you to handle it gracefully by returning a fallback Observable or transforming the error.',
      useCases: [
        'Error handling and recovery',
        'Providing fallback values',
        'Logging errors',
        'Retry mechanisms',
        'Graceful degradation'
      ],
      examples: [
        {
          title: 'Error Recovery',
          code: `// Handle errors gracefully
const risky$ = throwError(() => new Error('Something went wrong'));
const safe$ = risky$.pipe(
  catchError(error => {
    console.log('Error caught:', error.message);
    return of('Fallback value');
  })
);

safe$.subscribe(value => console.log(value));`,
          explanation: 'This catches the error and returns a fallback value instead of crashing.',
          output: 'Error caught: Something went wrong\nFallback value'
        }
      ],
      relatedOperators: ['retry', 'retryWhen', 'finalize', 'throwError']
    },
    'finalize': {
      id: 'finalize',
      name: 'finalize',
      category: 'Utility',
      difficulty: 'beginner',
      description: 'Executes a function when Observable completes or errors',
      detailedExplanation: 'The finalize operator is like a cleanup crew that always runs at the end, regardless of whether the job completed successfully or failed. It executes a function when the Observable completes, errors, or is unsubscribed from.',
      useCases: [
        'Cleanup operations',
        'Hiding loading spinners',
        'Closing connections',
        'Releasing resources',
        'Final logging or analytics'
      ],
      examples: [
        {
          title: 'Cleanup Operations',
          code: `// Always run cleanup
const data$ = of(1, 2, 3);
const withCleanup$ = data$.pipe(
  tap(value => console.log(\`Processing: \${value}\`)),
  finalize(() => console.log('Cleanup completed'))
);

withCleanup$.subscribe({
  complete: () => console.log('Stream completed')
});`,
          explanation: 'This runs the finalize function after the stream completes, perfect for cleanup operations.',
          output: 'Processing: 1\nProcessing: 2\nProcessing: 3\nStream completed\nCleanup completed'
        }
      ],
      relatedOperators: ['tap', 'catchError', 'retry', 'takeUntil']
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.operatorId = params['id'];
      this.operator = this.operatorsData[this.operatorId] || null;
    });
  }

  runExample(example: OperatorExample) {
    this.isRunningExample = true;
    this.currentOutput = '';
    
    // Simulate running the example
    setTimeout(() => {
      this.currentOutput = example.output;
      this.isRunningExample = false;
    }, 1000);
  }

  getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'beginner': return '#4CAF50';
      case 'intermediate': return '#FF9800';
      case 'advanced': return '#F44336';
      default: return '#757575';
    }
  }

  getCategoryIcon(category: string): string {
    switch (category) {
      case 'Creation': return 'fas fa-plus-circle';
      case 'Transformation': return 'fas fa-exchange-alt';
      case 'Filtering': return 'fas fa-filter';
      case 'Combination': return 'fas fa-layer-group';
      case 'Utility': return 'fas fa-tools';
      default: return 'fas fa-cog';
    }
  }
}
