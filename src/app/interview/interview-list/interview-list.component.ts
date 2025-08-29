import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface ExperienceLevel {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  route: string;
  questionCount: number;
  difficulty: string;
  color: string;
  categories: string[];
  description: string;
}

@Component({
  selector: 'app-interview-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './interview-list.component.html',
  styleUrl: './interview-list.component.scss'
})
export class InterviewListComponent {
  experienceLevels: ExperienceLevel[] = [
    {
      id: '1-year',
      title: '1 Year Experience',
      subtitle: 'Foundation Level',
      icon: 'fas fa-seedling',
      route: '/interview/one-year',
      questionCount: 50,
      difficulty: 'Beginner',
      color: '#10B981',
      categories: ['RxJS Basics', 'Angular Fundamentals', 'TypeScript Basics', 'Web Fundamentals'],
      description: 'Essential concepts and fundamental knowledge for developers starting their RxJS and Angular journey.'
    },
    {
      id: '2-year',
      title: '2 Years Experience',
      subtitle: 'Intermediate Level',
      icon: 'fas fa-leaf',
      route: '/interview/two-year',
      questionCount: 50,
      difficulty: 'Intermediate',
      color: '#0EA5E9',
      categories: ['RxJS Intermediate', 'Angular Intermediate', 'TypeScript Intermediate', 'Web Development Intermediate'],
      description: 'Deeper understanding of reactive programming patterns, Angular architecture, and advanced TypeScript features.'
    },
    {
      id: '3-year',
      title: '3 Years Experience',
      subtitle: 'Advanced Level',
      icon: 'fas fa-tree',
      route: '/interview/three-year',
      questionCount: 50,
      difficulty: 'Advanced',
      color: '#8B5CF6',
      categories: ['RxJS Advanced', 'Angular Architecture', 'TypeScript Advanced', 'Performance & Testing'],
      description: 'Advanced reactive programming, complex state management, performance optimization, and testing strategies.'
    },
    {
      id: '4-year',
      title: '4+ Years Experience',
      subtitle: 'Expert Level',
      icon: 'fas fa-crown',
      route: '/interview/four-year',
      questionCount: 50,
      difficulty: 'Expert',
      color: '#F59E0B',
      categories: ['RxJS Expert', 'Angular Architecture', 'TypeScript Expert', 'System Design'],
      description: 'Expert-level concepts including system design, architectural decisions, team leadership, and complex problem-solving.'
    }
  ];
}
