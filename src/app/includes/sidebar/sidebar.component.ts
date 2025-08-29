import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

interface NavigationItem {
  path: string;
  label: string;
  icon: string;
  exact?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() sidebarToggle = new EventEmitter<boolean>();
  
  isOpen = false;
  
  navigationItems: NavigationItem[] = [
    { path: '/home', label: 'Home', icon: 'fas fa-home', exact: true },
    { path: '/promise', label: 'Promise', icon: 'fas fa-handshake' },
    { path: '/observables/list', label: 'Observables', icon: 'fas fa-broadcast-tower' },
    { path: '/subscription', label: 'Subscription', icon: 'fas fa-link' },
    { path: '/observer', label: 'Observer', icon: 'fas fa-eye' },
    { path: '/subject', label: 'Subject', icon: 'fas fa-broadcast-tower' },
    { path: '/operators', label: 'Operators', icon: 'fas fa-cogs' },
    { path: '/interview', label: 'Interview Prep', icon: 'fas fa-user-tie' }
  ];

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    this.sidebarToggle.emit(this.isOpen);
  }

  closeSidebar() {
    this.isOpen = false;
    this.sidebarToggle.emit(this.isOpen);
  }

  onNavigationClick() {
    // Close sidebar on mobile after navigation
    if (window.innerWidth <= 768) {
      this.closeSidebar();
    }
  }
}
