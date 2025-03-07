import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../modules/products/services/product.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistItems = new BehaviorSubject<Product[]>([]);
  private readonly WISHLIST_STORAGE_KEY = 'wishlist';

  constructor(private storageService: StorageService) {
    this.loadWishlist();
  }

  getWishlistItems(): Observable<Product[]> {
    return this.wishlistItems.asObservable();
  }

  getWishlistCount(): Observable<number> {
    return new Observable(subscriber => {
      this.wishlistItems.subscribe(items => {
        subscriber.next(items.length);
      });
    });
  }

  addToWishlist(product: Product): void {
    const currentItems = this.wishlistItems.value;
    if (!currentItems.find(item => item.id === product.id)) {
      this.wishlistItems.next([...currentItems, product]);
      this.saveWishlist();
    }
  }

  removeFromWishlist(productId: number): void {
    const currentItems = this.wishlistItems.value;
    const updatedItems = currentItems.filter(item => item.id !== productId);
    this.wishlistItems.next(updatedItems);
    this.saveWishlist();
  }

  isInWishlist(productId: number): boolean {
    return this.wishlistItems.value.some(item => item.id === productId);
  }

  clearWishlist(): void {
    this.wishlistItems.next([]);
    this.saveWishlist();
  }

  private saveWishlist(): void {
    this.storageService.setItem(this.WISHLIST_STORAGE_KEY, JSON.stringify(this.wishlistItems.value));
  }

  private loadWishlist(): void {
    const savedWishlist = this.storageService.getItem(this.WISHLIST_STORAGE_KEY);
    if (savedWishlist) {
      this.wishlistItems.next(JSON.parse(savedWishlist));
    }
  }
} 