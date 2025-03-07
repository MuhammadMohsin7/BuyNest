import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  template: `
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong class="font-bold">Error!</strong>
      <span class="block sm:inline">{{ message }}</span>
    </div>
  `
})
export class ErrorMessageComponent {
  @Input() message: string = 'An error occurred. Please try again.';
} 