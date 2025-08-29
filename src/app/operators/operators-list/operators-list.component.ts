import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface OperatorCategory {
  name: string;
  description: string;
  icon: string;
  operators: Operator[];
}

export interface Operator {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

@Component({
  selector: 'app-operators-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './operators-list.component.html',
  styleUrls: ['./operators-list.component.scss']
})
export class OperatorsListComponent {
  operatorCategories: OperatorCategory[] = [
    {
      name: 'Creation',
      description: 'Create new Observables from scratch or other sources',
      icon: 'fas fa-plus-circle',
      operators: [
        { id: 'of', name: 'of', description: 'Creates an Observable that emits the values you provide', category: 'Creation', difficulty: 'beginner' },
        { id: 'from', name: 'from', description: 'Converts arrays, promises, or other sources into Observables', category: 'Creation', difficulty: 'beginner' },
        { id: 'interval', name: 'interval', description: 'Creates an Observable that emits numbers at regular intervals', category: 'Creation', difficulty: 'beginner' },
        { id: 'timer', name: 'timer', description: 'Creates an Observable that waits, then emits numbers at intervals', category: 'Creation', difficulty: 'beginner' }
      ]
    },
    {
      name: 'Transformation',
      description: 'Transform the items emitted by Observables',
      icon: 'fas fa-exchange-alt',
      operators: [
        { id: 'map', name: 'map', description: 'Transforms each emitted value using a function', category: 'Transformation', difficulty: 'beginner' },
        { id: 'switchMap', name: 'switchMap', description: 'Maps to Observable, cancels previous inner Observable', category: 'Transformation', difficulty: 'intermediate' },
        { id: 'mergeMap', name: 'mergeMap', description: 'Maps to Observable, merges all inner Observables', category: 'Transformation', difficulty: 'intermediate' },
        { id: 'concatMap', name: 'concatMap', description: 'Maps to Observable, waits for each to complete before next', category: 'Transformation', difficulty: 'intermediate' }
      ]
    },
    {
      name: 'Filtering',
      description: 'Selectively emit items from Observables',
      icon: 'fas fa-filter',
      operators: [
        { id: 'filter', name: 'filter', description: 'Emits only values that pass a test condition', category: 'Filtering', difficulty: 'beginner' },
        { id: 'take', name: 'take', description: 'Emits only the first n values, then completes', category: 'Filtering', difficulty: 'beginner' },
        { id: 'skip', name: 'skip', description: 'Skips the first n values from the Observable', category: 'Filtering', difficulty: 'beginner' },
        { id: 'distinctUntilChanged', name: 'distinctUntilChanged', description: 'Emits only when the current value is different from the last', category: 'Filtering', difficulty: 'intermediate' }
      ]
    },
    {
      name: 'Combination',
      description: 'Combine multiple Observables into one',
      icon: 'fas fa-layer-group',
      operators: [
        { id: 'merge', name: 'merge', description: 'Combines multiple Observables into one by merging their emissions', category: 'Combination', difficulty: 'intermediate' },
        { id: 'combineLatest', name: 'combineLatest', description: 'Combines latest values from multiple Observables', category: 'Combination', difficulty: 'intermediate' },
        { id: 'zip', name: 'zip', description: 'Combines Observables by pairing their emissions in order', category: 'Combination', difficulty: 'intermediate' },
        { id: 'concat', name: 'concat', description: 'Concatenates Observables one after another', category: 'Combination', difficulty: 'beginner' }
      ]
    },
    {
      name: 'Utility',
      description: 'Utility operators for debugging and side effects',
      icon: 'fas fa-tools',
      operators: [
        { id: 'tap', name: 'tap', description: 'Performs side effects without changing the emitted values', category: 'Utility', difficulty: 'beginner' },
        { id: 'delay', name: 'delay', description: 'Delays the emission of items by a specified time', category: 'Utility', difficulty: 'beginner' },
        { id: 'catchError', name: 'catchError', description: 'Catches errors and returns a new Observable or throws', category: 'Utility', difficulty: 'intermediate' },
        { id: 'finalize', name: 'finalize', description: 'Executes a function when Observable completes or errors', category: 'Utility', difficulty: 'beginner' }
      ]
    }
  ];

  getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'beginner': return '#4CAF50';
      case 'intermediate': return '#FF9800';
      case 'advanced': return '#F44336';
      default: return '#757575';
    }
  }
}
