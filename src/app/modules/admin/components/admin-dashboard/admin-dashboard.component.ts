import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <div class="admin-dashboard">
      <nav class="admin-dashboard__nav">
        <div class="admin-dashboard__nav-brand">Admin Panel</div>
        <div class="admin-dashboard__nav-links">
          <a routerLink="products" routerLinkActive="admin-dashboard__nav-link--active" 
             class="admin-dashboard__nav-link">Products</a>
          <a routerLink="orders" routerLinkActive="admin-dashboard__nav-link--active" 
             class="admin-dashboard__nav-link">Orders</a>
        </div>
        <button (click)="logout()" class="admin-dashboard__logout-btn">Logout</button>
      </nav>
      <main class="admin-dashboard__content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .admin-dashboard {
      @apply min-h-screen bg-gray-100;

      &__nav {
        @apply bg-white shadow-md flex items-center justify-between px-6 py-4;
      }

      &__nav-brand {
        @apply text-xl font-bold text-gray-800;
      }

      &__nav-links {
        @apply flex space-x-6;
      }

      &__nav-link {
        @apply text-gray-600 hover:text-gray-900 transition-colors;

        &--active {
          @apply text-blue-600 font-semibold;
        }
      }

      &__logout-btn {
        @apply bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors;
      }

      &__content {
        @apply container mx-auto px-4 py-8;
      }
    }
  `]
})
export class AdminDashboardComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
} 