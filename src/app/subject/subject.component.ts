import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, BehaviorSubject, ReplaySubject, AsyncSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent {
  isRunningExample = false;
  currentOutput = '';
  subjectStatus = 'inactive';
  activeSubjects: any[] = [];

  // Subject instances for examples
  private basicSubject = new Subject<string>();
  private behaviorSubject = new BehaviorSubject<string>('Initial Value');
  private replaySubject = new ReplaySubject<string>(3);
  private asyncSubject = new AsyncSubject<string>();

  runExample(type: string): void {
    this.isRunningExample = true;
    this.currentOutput = '';
    this.subjectStatus = 'active';

    if (type === 'basic') {
      this.runBasicSubjectExample();
    } else if (type === 'behavior') {
      this.runBehaviorSubjectExample();
    } else if (type === 'replay') {
      this.runReplaySubjectExample();
    } else if (type === 'async') {
      this.runAsyncSubjectExample();
    } else if (type === 'multicast') {
      this.runMulticastExample();
    }
  }

  private runBasicSubjectExample(): void {
    this.currentOutput += "🎯 Basic Subject Example\n";
    this.currentOutput += "Creating a new Subject...\n\n";
    
    const subject = new Subject<string>();
    
    // First subscriber
    const sub1 = subject.subscribe({
      next: (value) => this.currentOutput += `👤 Subscriber 1: ${value}\n`,
      complete: () => this.currentOutput += `🏁 Subscriber 1: Completed\n`
    });

    // Second subscriber
    const sub2 = subject.subscribe({
      next: (value) => this.currentOutput += `👥 Subscriber 2: ${value}\n`,
      complete: () => this.currentOutput += `🏁 Subscriber 2: Completed\n`
    });

    this.currentOutput += "📡 Emitting values...\n";
    
    setTimeout(() => {
      subject.next("Hello");
      this.currentOutput += "   └─ Emitted: Hello\n";
    }, 500);

    setTimeout(() => {
      subject.next("World");
      this.currentOutput += "   └─ Emitted: World\n";
    }, 1000);

    setTimeout(() => {
      subject.complete();
      this.currentOutput += "   └─ Subject completed\n";
      this.subjectStatus = 'completed';
      this.isRunningExample = false;
    }, 1500);

    this.activeSubjects.push(sub1, sub2);
  }

  private runBehaviorSubjectExample(): void {
    this.currentOutput += "🔄 BehaviorSubject Example\n";
    this.currentOutput += "Creating BehaviorSubject with initial value 'Start'...\n\n";
    
    const behaviorSubject = new BehaviorSubject<string>('Start');
    
    this.currentOutput += "👤 Subscriber 1 subscribes:\n";
    const sub1 = behaviorSubject.subscribe({
      next: (value) => this.currentOutput += `   └─ Received: ${value}\n`
    });

    setTimeout(() => {
      this.currentOutput += "\n📡 Emitting 'First Update'...\n";
      behaviorSubject.next("First Update");
    }, 800);

    setTimeout(() => {
      this.currentOutput += "\n👥 Subscriber 2 subscribes (gets current value):\n";
      const sub2 = behaviorSubject.subscribe({
        next: (value) => this.currentOutput += `   └─ Received: ${value}\n`
      });
      this.activeSubjects.push(sub2);
    }, 1200);

    setTimeout(() => {
      this.currentOutput += "\n📡 Emitting 'Second Update'...\n";
      behaviorSubject.next("Second Update");
    }, 1600);

    setTimeout(() => {
      behaviorSubject.complete();
      this.currentOutput += "\n🏁 BehaviorSubject completed\n";
      this.subjectStatus = 'completed';
      this.isRunningExample = false;
    }, 2000);

    this.activeSubjects.push(sub1);
  }

  private runReplaySubjectExample(): void {
    this.currentOutput += "📼 ReplaySubject Example (buffer size: 3)\n";
    this.currentOutput += "Creating ReplaySubject...\n\n";
    
    const replaySubject = new ReplaySubject<string>(3);
    
    this.currentOutput += "📡 Emitting values before any subscription...\n";
    replaySubject.next("Value 1");
    this.currentOutput += "   └─ Emitted: Value 1\n";
    
    setTimeout(() => {
      replaySubject.next("Value 2");
      this.currentOutput += "   └─ Emitted: Value 2\n";
    }, 400);

    setTimeout(() => {
      replaySubject.next("Value 3");
      this.currentOutput += "   └─ Emitted: Value 3\n";
    }, 800);

    setTimeout(() => {
      replaySubject.next("Value 4");
      this.currentOutput += "   └─ Emitted: Value 4 (Value 1 will be dropped)\n";
    }, 1200);

    setTimeout(() => {
      this.currentOutput += "\n👤 Subscriber 1 subscribes (gets last 3 values):\n";
      const sub1 = replaySubject.subscribe({
        next: (value) => this.currentOutput += `   └─ Received: ${value}\n`
      });
      this.activeSubjects.push(sub1);
    }, 1600);

    setTimeout(() => {
      this.currentOutput += "\n📡 Emitting 'New Value'...\n";
      replaySubject.next("New Value");
    }, 2000);

    setTimeout(() => {
      replaySubject.complete();
      this.currentOutput += "\n🏁 ReplaySubject completed\n";
      this.subjectStatus = 'completed';
      this.isRunningExample = false;
    }, 2400);
  }

  private runAsyncSubjectExample(): void {
    this.currentOutput += "⏳ AsyncSubject Example\n";
    this.currentOutput += "Creating AsyncSubject (only emits last value on complete)...\n\n";
    
    const asyncSubject = new AsyncSubject<string>();
    
    const sub1 = asyncSubject.subscribe({
      next: (value) => this.currentOutput += `👤 Subscriber 1: ${value}\n`,
      complete: () => this.currentOutput += `🏁 Subscriber 1: Completed\n`
    });

    this.currentOutput += "📡 Emitting values (subscribers won't receive them yet)...\n";
    
    setTimeout(() => {
      asyncSubject.next("First");
      this.currentOutput += "   └─ Emitted: First (not delivered yet)\n";
    }, 500);

    setTimeout(() => {
      asyncSubject.next("Second");
      this.currentOutput += "   └─ Emitted: Second (not delivered yet)\n";
    }, 1000);

    setTimeout(() => {
      asyncSubject.next("Last Value");
      this.currentOutput += "   └─ Emitted: Last Value (not delivered yet)\n";
    }, 1500);

    setTimeout(() => {
      this.currentOutput += "\n👥 Subscriber 2 subscribes:\n";
      const sub2 = asyncSubject.subscribe({
        next: (value) => this.currentOutput += `👥 Subscriber 2: ${value}\n`,
        complete: () => this.currentOutput += `🏁 Subscriber 2: Completed\n`
      });
      this.activeSubjects.push(sub2);
    }, 2000);

    setTimeout(() => {
      this.currentOutput += "\n🏁 Completing AsyncSubject (now subscribers get the last value)...\n";
      asyncSubject.complete();
      this.subjectStatus = 'completed';
      this.isRunningExample = false;
    }, 2500);

    this.activeSubjects.push(sub1);
  }

  private runMulticastExample(): void {
    this.currentOutput += "📡 Multicast Example\n";
    this.currentOutput += "Demonstrating how Subjects enable multicasting...\n\n";
    
    const subject = new Subject<number>();
    
    // Multiple subscribers
    const sub1 = subject.subscribe(value => 
      this.currentOutput += `🎯 Observer A: ${value}\n`
    );
    
    const sub2 = subject.subscribe(value => 
      this.currentOutput += `🎯 Observer B: ${value}\n`
    );
    
    const sub3 = subject.subscribe(value => 
      this.currentOutput += `🎯 Observer C: ${value}\n`
    );

    this.currentOutput += "📡 Broadcasting to all observers...\n";
    
    let counter = 1;
    const interval = setInterval(() => {
      subject.next(counter);
      this.currentOutput += `   └─ Broadcasted: ${counter}\n`;
      counter++;
      
      if (counter > 4) {
        clearInterval(interval);
        setTimeout(() => {
          subject.complete();
          this.currentOutput += "\n🏁 Multicast completed\n";
          this.subjectStatus = 'completed';
          this.isRunningExample = false;
        }, 500);
      }
    }, 600);

    this.activeSubjects.push(sub1, sub2, sub3);
  }

  stopAllSubjects(): void {
    this.activeSubjects.forEach(sub => {
      if (sub && !sub.closed) {
        sub.unsubscribe();
      }
    });
    this.activeSubjects = [];
    this.currentOutput += "\n🛑 All subjects stopped!\n";
    this.subjectStatus = 'stopped';
    this.isRunningExample = false;
  }

  clearOutput(): void {
    this.currentOutput = '';
    this.subjectStatus = 'inactive';
  }

  // Utility methods for manual subject interaction
  emitToBasicSubject(value: string): void {
    this.basicSubject.next(value);
  }

  emitToBehaviorSubject(value: string): void {
    this.behaviorSubject.next(value);
  }

  emitToReplaySubject(value: string): void {
    this.replaySubject.next(value);
  }
}
