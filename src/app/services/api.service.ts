import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Auth endpoints
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  register(userData: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData);
  }

  // Product endpoints
  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }

  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/${id}`);
  }

  // Order endpoints
  getOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders/me`);
  }

  createOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders`, orderData);
  }

  // Wishlist endpoints
  getWishlist(): Observable<any> {
    return this.http.get(`${this.apiUrl}/wishlist`);
  }

  addToWishlist(productId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/wishlist`, { productId });
  }

  removeFromWishlist(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/wishlist/${productId}`);
  }

  // Contact endpoints
  submitContact(contactData: { name: string; email: string; subject: string; message: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/contact`, contactData);
  }
} 