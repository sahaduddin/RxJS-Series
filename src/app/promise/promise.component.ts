import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-promise',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promise.component.html',
  styleUrl: './promise.component.scss'
})
export class PromiseComponent {
  isRunningExample = false;
  currentOutput = '';

  runExample(type: string): void {
    this.isRunningExample = true;
    this.currentOutput = '';

    if (type === 'basic') {
      this.runBasicPromiseExample();
    } else if (type === 'async') {
      this.runAsyncAwaitExample();
    }
  }

  private runBasicPromiseExample(): void {
    const myPromise = new Promise<string>((resolve, reject) => {
      const success = Math.random() > 0.5;
      
      setTimeout(() => {
        if (success) {
          resolve("🎉 Operation successful!");
        } else {
          reject("❌ Something went wrong!");
        }
      }, 1000);
    });

    myPromise
      .then(result => {
        this.currentOutput += `${result}\n`;
      })
      .catch(error => {
        this.currentOutput += `${error}\n`;
      })
      .finally(() => {
        this.currentOutput += "Promise completed";
        this.isRunningExample = false;
      });
  }

  private async runAsyncAwaitExample(): Promise<void> {
    try {
      this.currentOutput += "Fetching user data...\n";
      
      // Simulate API call
      const response = await new Promise<any>((resolve) => {
        setTimeout(() => {
          resolve({
            id: 123,
            name: "John Doe",
            email: "john@example.com"
          });
        }, 1500);
      });
      
      this.currentOutput += `User data received: ${JSON.stringify(response, null, 2)}\n`;
    } catch (error) {
      this.currentOutput += `Failed to fetch user: ${error}\n`;
    } finally {
      this.isRunningExample = false;
    }
  }
}
