import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, interval, fromEvent, of } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss'
})
export class SubscriptionComponent {
  isRunningExample = false;
  currentOutput = '';
  subscriptionStatus = 'inactive';
  activeSubscriptions: any[] = [];

  runExample(type: string): void {
    this.isRunningExample = true;
    this.currentOutput = '';
    this.subscriptionStatus = 'active';

    if (type === 'basic') {
      this.runBasicSubscriptionExample();
    } else if (type === 'unsubscribe') {
      this.runUnsubscribeExample();
    } else if (type === 'multiple') {
      this.runMultipleSubscriptionsExample();
    }
  }

  private runBasicSubscriptionExample(): void {
    this.currentOutput += "Creating an Observable...\n";
    
    const observable = interval(1000).pipe(
      take(5),
      map(value => `Value: ${value + 1}`)
    );

    this.currentOutput += "Subscribing to Observable...\n";
    
    const subscription = observable.subscribe({
      next: (value) => {
        this.currentOutput += `Received: ${value}\n`;
      },
      complete: () => {
        this.currentOutput += "Observable completed!\n";
        this.subscriptionStatus = 'completed';
        this.isRunningExample = false;
      },
      error: (error) => {
        this.currentOutput += `Error: ${error}\n`;
        this.subscriptionStatus = 'error';
        this.isRunningExample = false;
      }
    });

    this.activeSubscriptions.push(subscription);
  }

  private runUnsubscribeExample(): void {
    this.currentOutput += "Creating a continuous Observable...\n";
    
    const observable = interval(500).pipe(
      map(value => `Tick: ${value + 1}`)
    );

    const subscription = observable.subscribe({
      next: (value) => {
        this.currentOutput += `${value}\n`;
      }
    });

    this.currentOutput += "Will unsubscribe after 3 seconds...\n";

    setTimeout(() => {
      subscription.unsubscribe();
      this.currentOutput += "🛑 Subscription unsubscribed!\n";
      this.currentOutput += "No more values will be received.\n";
      this.subscriptionStatus = 'unsubscribed';
      this.isRunningExample = false;
    }, 3000);

    this.activeSubscriptions.push(subscription);
  }

  private runMultipleSubscriptionsExample(): void {
    this.currentOutput += "Creating multiple Observables...\n";
    
    const obs1 = of('Hello', 'World').pipe(
      map(value => `Observable 1: ${value}`)
    );
    
    const obs2 = interval(1000).pipe(
      take(3),
      map(value => `Observable 2: Timer ${value + 1}`)
    );

    let completedCount = 0;

    const sub1 = obs1.subscribe({
      next: (value) => this.currentOutput += `${value}\n`,
      complete: () => {
        completedCount++;
        if (completedCount === 2) this.handleAllComplete();
      }
    });

    const sub2 = obs2.subscribe({
      next: (value) => this.currentOutput += `${value}\n`,
      complete: () => {
        completedCount++;
        if (completedCount === 2) this.handleAllComplete();
      }
    });

    this.activeSubscriptions.push(sub1, sub2);
  }

  private handleAllComplete(): void {
    this.currentOutput += "All subscriptions completed!\n";
    this.subscriptionStatus = 'completed';
    this.isRunningExample = false;
  }

  unsubscribeAll(): void {
    this.activeSubscriptions.forEach(sub => {
      if (sub && !sub.closed) {
        sub.unsubscribe();
      }
    });
    this.activeSubscriptions = [];
    this.currentOutput += "All active subscriptions unsubscribed!\n";
    this.subscriptionStatus = 'unsubscribed';
    this.isRunningExample = false;
  }

  clearOutput(): void {
    this.currentOutput = '';
    this.subscriptionStatus = 'inactive';
  }
}
