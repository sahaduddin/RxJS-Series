import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  features = [
    {
      title: 'Promises',
      description: 'Handle asynchronous operations with elegant Promise patterns',
      icon: '🤝',
      route: '/promise'
    },
    {
      title: 'Observables',
      description: 'Master reactive programming with RxJS Observables',
      icon: '👁️',
      route: '/observables/list'
    },
    {
      title: 'Operators',
      description: 'Transform and manipulate data streams with powerful operators',
      icon: '⚡',
      route: '/operators'
    },
    {
      title: 'Subjects',
      description: 'Multicast values to multiple subscribers efficiently',
      icon: '📡',
      route: '/subjects'
    }
  ];

  concepts = [
    'Async Programming',
    'Event Handling',
    'Data Streams',
    'Error Handling',
    'State Management',
    'HTTP Requests',
    'WebSocket Integration',
    'Real-time Updates'
  ];
}
