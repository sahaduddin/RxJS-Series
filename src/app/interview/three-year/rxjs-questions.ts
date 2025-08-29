export interface Question {
  id: number;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export const rxjsQuestions: Question[] = [
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
  }
];
