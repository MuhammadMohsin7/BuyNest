import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="flex justify-center items-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  `
})
export class LoadingSpinnerComponent {} 