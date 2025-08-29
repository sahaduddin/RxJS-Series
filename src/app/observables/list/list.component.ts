import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

export interface ObservableCategory {
  name: string;
  description: string;
  icon: string;
  observables: ObservableItem[];
}

export interface ObservableItem {
  name: string;
  icon: string;
  description: string;
  example: string;
  steps: string[];
  activeStep: number;
  route?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

@Component({
  selector: 'app-observables-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  observableCategories: ObservableCategory[] = [
    {
      name: 'Creation Observables',
      description: 'Create Observables from various data sources',
      icon: 'fas fa-plus-circle',
      observables: [
        {
          name: 'fromEvent',
          icon: 'fas fa-bolt',
          route: 'fromEvent',
          description: 'Creates an Observable from DOM events or Node.js EventEmitter events.',
          example: 'fromEvent(element, "click")',
          steps: ['Listen', 'Event', 'Emit'],
          activeStep: 1,
          difficulty: 'beginner'
        },
        {
          name: 'of',
          icon: 'fas fa-stream',
          description: 'Creates an Observable that emits a sequence of values.',
          example: 'of(1, 2, 3)',
          steps: ['Start', 'Emit', 'Complete'],
          activeStep: 1,
          difficulty: 'beginner'
        },
        {
          name: 'from',
          icon: 'fas fa-random',
          description: 'Creates an Observable from an array, array-like object, Promise, iterable object, or Observable-like object.',
          example: 'from([1, 2, 3])',
          steps: ['Array', 'Convert', 'Stream'],
          activeStep: 1,
          difficulty: 'beginner'
        },
        {
          name: 'interval',
          icon: 'fas fa-clock',
          description: 'Creates an Observable that emits sequential numbers at specified intervals.',
          example: 'interval(1000)',
          steps: ['Start', 'Wait', 'Emit'],
          activeStep: 2,
          difficulty: 'beginner'
        }
      ]
    },
    {
      name: 'Subject Types',
      description: 'Special Observable types for multicasting and state management',
      icon: 'fas fa-share-alt',
      observables: [
        {
          name: 'Subject',
          icon: 'fas fa-broadcast-tower',
          description: 'A special type of Observable that allows values to be multicasted to many Observers.',
          example: 'new Subject()',
          steps: ['Create', 'Multicast', 'Stream'],
          activeStep: 1,
          difficulty: 'intermediate'
        },
        {
          name: 'BehaviorSubject',
          icon: 'fas fa-memory',
          description: 'A variant of Subject that requires an initial value and emits its current value to new subscribers.',
          example: 'new BehaviorSubject(0)',
          steps: ['Initial', 'Store', 'Emit'],
          activeStep: 2,
          difficulty: 'intermediate'
        }
      ]
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Set up animation intervals for active steps
    setInterval(() => {
      this.observableCategories = this.observableCategories.map(category => ({
        ...category,
        observables: category.observables.map(obs => ({
          ...obs,
          activeStep: (obs.activeStep + 1) % obs.steps.length
        }))
      }));
    }, 2000);
  }

  navigateTo(route: string | undefined): void {
    if (route) {
      this.router.navigate(['/observables/', route]);
    }
  }

  getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'beginner': return '#4CAF50';
      case 'intermediate': return '#FF9800';
      case 'advanced': return '#F44336';
      default: return '#757575';
    }
  }
}

