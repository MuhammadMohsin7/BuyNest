import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  template: `
    <header class="bg-white shadow-md">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <a routerLink="/" class="text-2xl font-bold text-blue-600">Cool Shades</a>
          <div class="flex items-center space-x-4">
            <a routerLink="/products" class="text-gray-600 hover:text-blue-600">Products</a>
            <a routerLink="/contact" class="text-gray-600 hover:text-blue-600">Contact</a>
            <ng-container *ngIf="isAuthenticated">
              <a routerLink="/orders" class="text-gray-600 hover:text-blue-600">Orders</a>
              <a routerLink="/wishlist" class="text-gray-600 hover:text-blue-600">Wishlist</a>
              <button
                (click)="logout()"
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </ng-container>
            <ng-container *ngIf="!isAuthenticated">
              <a routerLink="/auth/login" class="text-gray-600 hover:text-blue-600">Login</a>
              <a
                routerLink="/auth/register"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Register
              </a>
            </ng-container>
          </div>
        </div>
      </nav>
    </header>
  `
})
export class HeaderComponent {
  isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
} 