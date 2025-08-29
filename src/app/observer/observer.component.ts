import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, interval, of, throwError } from 'rxjs';
import { map, take, delay } from 'rxjs/operators';

@Component({
  selector: 'app-observer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './observer.component.html',
  styleUrl: './observer.component.scss'
})
export class ObserverComponent {
  isRunningExample = false;
  currentOutput = '';
  observerStatus = 'inactive';
  activeObservers: any[] = [];

  runExample(type: string): void {
    this.isRunningExample = true;
    this.currentOutput = '';
    this.observerStatus = 'active';

    if (type === 'basic') {
      this.runBasicObserverExample();
    } else if (type === 'error') {
      this.runErrorHandlingExample();
    } else if (type === 'multiple') {
      this.runMultipleObserversExample();
    } else if (type === 'custom') {
      this.runCustomObserverExample();
    }
  }

  private runBasicObserverExample(): void {
    this.currentOutput += "Creating Observer with next, error, and complete handlers...\n\n";
    
    const observer = {
      next: (value: any) => {
        this.currentOutput += `✅ Next: Received value ${value}\n`;
      },
      error: (error: any) => {
        this.currentOutput += `❌ Error: ${error}\n`;
        this.observerStatus = 'error';
        this.isRunningExample = false;
      },
      complete: () => {
        this.currentOutput += `🏁 Complete: Observable finished!\n`;
        this.observerStatus = 'completed';
        this.isRunningExample = false;
      }
    };

    this.currentOutput += "Subscribing to Observable that emits 1, 2, 3...\n";
    
    const observable = of(1, 2, 3).pipe(
      delay(500)
    );

    const subscription = observable.subscribe(observer);
    this.activeObservers.push(subscription);
  }

  private runErrorHandlingExample(): void {
    this.currentOutput += "Creating Observer to handle errors...\n\n";
    
    const observer = {
      next: (value: any) => {
        this.currentOutput += `✅ Next: ${value}\n`;
      },
      error: (error: any) => {
        this.currentOutput += `❌ Error caught: ${error.message}\n`;
        this.currentOutput += "Observer handled the error gracefully!\n";
        this.observerStatus = 'error';
        this.isRunningExample = false;
      },
      complete: () => {
        this.currentOutput += `🏁 Complete: This won't be called due to error\n`;
        this.observerStatus = 'completed';
        this.isRunningExample = false;
      }
    };

    this.currentOutput += "Observable will emit 'Hello' then throw an error...\n";
    
    const observable = new Observable(subscriber => {
      subscriber.next('Hello');
      setTimeout(() => {
        subscriber.error(new Error('Something went wrong!'));
      }, 1000);
    });

    const subscription = observable.subscribe(observer);
    this.activeObservers.push(subscription);
  }

  private runMultipleObserversExample(): void {
    this.currentOutput += "Creating multiple Observers for the same Observable...\n\n";
    
    const observable = interval(800).pipe(
      take(4),
      map(x => `Value-${x + 1}`)
    );

    const observer1 = {
      next: (value: any) => this.currentOutput += `👤 Observer 1: ${value}\n`,
      complete: () => {
        this.currentOutput += `🏁 Observer 1: Completed\n`;
        this.checkAllComplete();
      }
    };

    const observer2 = {
      next: (value: any) => this.currentOutput += `👥 Observer 2: ${value}\n`,
      complete: () => {
        this.currentOutput += `🏁 Observer 2: Completed\n`;
        this.checkAllComplete();
      }
    };

    this.currentOutput += "Both observers will receive the same values...\n";
    
    const sub1 = observable.subscribe(observer1);
    const sub2 = observable.subscribe(observer2);
    
    this.activeObservers.push(sub1, sub2);
  }

  private runCustomObserverExample(): void {
    this.currentOutput += "Creating a custom Observer class...\n\n";
    
    class CustomObserver {
      constructor(private component: ObserverComponent) {}
      
      next(value: any) {
        this.component.currentOutput += `🎯 Custom Observer: Processing ${value}\n`;
        this.component.currentOutput += `   └─ Value processed successfully!\n`;
      }
      
      error(error: any) {
        this.component.currentOutput += `🚨 Custom Observer: Error - ${error}\n`;
        this.component.observerStatus = 'error';
        this.component.isRunningExample = false;
      }
      
      complete() {
        this.component.currentOutput += `✨ Custom Observer: All done!\n`;
        this.component.observerStatus = 'completed';
        this.component.isRunningExample = false;
      }
    }

    const customObserver = new CustomObserver(this);
    
    this.currentOutput += "Observable will emit some data...\n";
    
    const observable = of('Data A', 'Data B', 'Data C').pipe(
      delay(600)
    );

    const subscription = observable.subscribe(customObserver);
    this.activeObservers.push(subscription);
  }

  private completedCount = 0;
  private checkAllComplete(): void {
    this.completedCount++;
    if (this.completedCount >= 2) {
      this.currentOutput += "\n🎉 All observers completed!\n";
      this.observerStatus = 'completed';
      this.isRunningExample = false;
      this.completedCount = 0;
    }
  }

  stopAllObservers(): void {
    this.activeObservers.forEach(sub => {
      if (sub && !sub.closed) {
        sub.unsubscribe();
      }
    });
    this.activeObservers = [];
    this.currentOutput += "\n🛑 All observers stopped!\n";
    this.observerStatus = 'stopped';
    this.isRunningExample = false;
  }

  clearOutput(): void {
    this.currentOutput = '';
    this.observerStatus = 'inactive';
    this.completedCount = 0;
  }
}
