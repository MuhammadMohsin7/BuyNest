import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = '/api/v1/wishlist';

  constructor(private http: HttpClient) {}

  getWishlist() {
    return this.http.get(this.apiUrl);
  }

  addToWishlist(productId: number) {
    return this.http.post(this.apiUrl, { productId });
  }

  removeFromWishlist(productId: number) {
    return this.http.delete(`${this.apiUrl}/${productId}`);
  }
} 