import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-admin-login',
  template: `
    <div class="admin-login">
      <div class="admin-login__container">
        <h1 class="admin-login__title">Admin Login</h1>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="admin-login__form">
          <div class="admin-login__form-group">
            <label for="email" class="admin-login__label">Email</label>
            <input 
              type="email" 
              id="email" 
              formControlName="email" 
              class="admin-login__input"
              placeholder="Enter your email">
          </div>
          <div class="admin-login__form-group">
            <label for="password" class="admin-login__label">Password</label>
            <input 
              type="password" 
              id="password" 
              formControlName="password" 
              class="admin-login__input"
              placeholder="Enter your password">
          </div>
          <button 
            type="submit" 
            [disabled]="!loginForm.valid"
            class="admin-login__button">
            Login
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .admin-login {
      @apply min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8;

      &__container {
        @apply max-w-md w-full space-y-8;
      }

      &__title {
        @apply text-center text-3xl font-extrabold text-gray-900;
      }

      &__form {
        @apply mt-8 space-y-6;
      }

      &__form-group {
        @apply rounded-md shadow-sm -space-y-px;
      }

      &__label {
        @apply sr-only;
      }

      &__input {
        @apply appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm;
      }

      &__button {
        @apply group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed;
      }
    }
  `]
})
export class AdminLoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password, true).subscribe({
        next: () => {
          this.router.navigate(['/admin/dashboard']);
        },
        error: (error) => {
          console.error('Login failed:', error);
        }
      });
    }
  }
} 