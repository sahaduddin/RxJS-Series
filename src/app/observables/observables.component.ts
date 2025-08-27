import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-observables',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.scss']
})
export class ObservablesComponent {
  observableTypes = [
    {
      title: 'Basic Observable',
      description: 'Create and subscribe to simple Observables',
      icon: '🎯',
      code: `const observable = new Observable(subscriber => {
  subscriber.next('Hello');
  subscriber.next('World');
  subscriber.complete();
});

observable.subscribe(
  value => console.log(value),
  error => console.error(error),
  () => console.log('Complete!')
);`,
      route: '/observables/basic'
    },
    {
      title: 'From Events',
      description: 'Create Observables from DOM events',
      icon: '🖱️',
      code: `fromEvent(document, 'click')
  .pipe(
    map(event => ({ x: event.clientX, y: event.clientY }))
  )
  .subscribe(coords => console.log(coords));`,
      route: '/observables/events'
    },
    {
      title: 'HTTP Requests',
      description: 'Handle API calls with Observables',
      icon: '🌐',
      code: `this.http.get('api/users')
  .pipe(
    map(response => response.data),
    catchError(error => of([]))
  )
  .subscribe(users => console.log(users));`,
      route: '/observables/http'
    },
    {
      title: 'Interval & Timer',
      description: 'Work with time-based Observables',
      icon: '⏰',
      code: `interval(1000)
  .pipe(take(5))
  .subscribe(count => console.log(count));`,
      route: '/observables/interval'
    },
    {
      title: 'Combination',
      description: 'Combine multiple Observables',
      icon: '🔄',
      code: `combineLatest([obs1$, obs2$])
  .pipe(
    map(([value1, value2]) => value1 + value2)
  )
  .subscribe(result => console.log(result));`,
      route: '/observables/combination'
    },
    {
      title: 'Error Handling',
      description: 'Handle errors in Observable streams',
      icon: '🛠️',
      code: `observable$.pipe(
  retry(3),
  catchError(error => {
    console.error('Error:', error);
    return of(null);
  })
).subscribe(value => console.log(value));`,
      route: '/observables/error'
    }
  ];

  filterTypes = [
    'map', 'filter', 'tap', 'debounceTime', 'distinctUntilChanged',
    'switchMap', 'mergeMap', 'concatMap', 'takeUntil', 'catchError'
  ];
}
