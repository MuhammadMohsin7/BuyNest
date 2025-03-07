import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { StorageService } from './storage.service';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  public currentUser$ = this.currentUserSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService
  ) {
    this.initializeUser();
  }

  private initializeUser(): void {
    const storedUser = this.storageService.getItem('currentUser');
    if (storedUser && this.isValidUser(storedUser)) {
      this.currentUserSubject.next(storedUser);
      this.redirectBasedOnRole(storedUser);
    } else {
      // Clear invalid data
      this.storageService.removeItem('currentUser');
    }
  }

  private isValidUser(user: any): user is User {
    return user 
      && typeof user.id === 'string'
      && typeof user.email === 'string'
      && typeof user.name === 'string'
      && (user.role === 'user' || user.role === 'admin');
  }

  login(credentials: LoginCredentials): Observable<User> {
    this.loadingSubject.next(true);
    return this.http.post<User>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(user => {
          if (this.isValidUser(user)) {
            this.storageService.setItem('currentUser', user);
            this.currentUserSubject.next(user);
            this.redirectBasedOnRole(user);
          }
          this.loadingSubject.next(false);
        }),
        catchError(error => {
          this.loadingSubject.next(false);
          throw error;
        })
      );
  }

  logout(): void {
    this.loadingSubject.next(true);
    try {
      this.storageService.removeItem('currentUser');
      this.currentUserSubject.next(null);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      this.loadingSubject.next(false);
    }
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private redirectBasedOnRole(user: User): void {
    if (user.role === 'admin') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  register(userData: { email: string; password: string; name: string }): Observable<User> {
    this.loadingSubject.next(true);
    return this.http.post<User>(`${environment.apiUrl}/auth/register`, userData)
      .pipe(
        tap(user => {
          if (this.isValidUser(user)) {
            this.storageService.setItem('currentUser', user);
            this.currentUserSubject.next(user);
            this.redirectBasedOnRole(user);
          }
          this.loadingSubject.next(false);
        }),
        catchError(error => {
          this.loadingSubject.next(false);
          throw error;
        })
      );
  }

  updateProfile(userData: Partial<User>): Observable<User> {
    this.loadingSubject.next(true);
    return this.http.put<User>(`${environment.apiUrl}/auth/profile`, userData)
      .pipe(
        tap(user => {
          if (this.isValidUser(user)) {
            this.storageService.setItem('currentUser', user);
            this.currentUserSubject.next(user);
          }
          this.loadingSubject.next(false);
        }),
        catchError(error => {
          this.loadingSubject.next(false);
          throw error;
        })
      );
  }

  changePassword(oldPassword: string, newPassword: string): Observable<void> {
    this.loadingSubject.next(true);
    return this.http.post<void>(`${environment.apiUrl}/auth/change-password`, {
      oldPassword,
      newPassword
    }).pipe(
      tap(() => this.loadingSubject.next(false)),
      catchError(error => {
        this.loadingSubject.next(false);
        throw error;
      })
    );
  }

  forgotPassword(email: string): Observable<void> {
    this.loadingSubject.next(true);
    return this.http.post<void>(`${environment.apiUrl}/auth/forgot-password`, { email })
      .pipe(
        tap(() => this.loadingSubject.next(false)),
        catchError(error => {
          this.loadingSubject.next(false);
          throw error;
        })
      );
  }

  resetPassword(token: string, newPassword: string): Observable<void> {
    this.loadingSubject.next(true);
    return this.http.post<void>(`${environment.apiUrl}/auth/reset-password`, {
      token,
      newPassword
    }).pipe(
      tap(() => this.loadingSubject.next(false)),
      catchError(error => {
        this.loadingSubject.next(false);
        throw error;
      })
    );
  }
} 