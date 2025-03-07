import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../modules/products/services/product.service';
import { StorageService } from './storage.service';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  private readonly CART_STORAGE_KEY = 'cart';

  constructor(private storageService: StorageService) {
    this.loadCart();
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  }

  getCartCount(): Observable<number> {
    return new Observable(subscriber => {
      this.cartItems.subscribe(items => {
        const count = items.reduce((total, item) => total + item.quantity, 0);
        subscriber.next(count);
      });
    });
  }

  addToCart(product: Product, quantity: number = 1): void {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentItems.push({ product, quantity });
    }

    this.cartItems.next(currentItems);
    this.saveCart();
  }

  removeFromCart(productId: number): void {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.filter(item => item.product.id !== productId);
    this.cartItems.next(updatedItems);
    this.saveCart();
  }

  updateQuantity(productId: number, quantity: number): void {
    const currentItems = this.cartItems.value;
    const item = currentItems.find(item => item.product.id === productId);
    
    if (item) {
      item.quantity = quantity;
      this.cartItems.next(currentItems);
      this.saveCart();
    }
  }

  clearCart(): void {
    this.cartItems.next([]);
    this.saveCart();
  }

  getTotal(): Observable<number> {
    return new Observable(subscriber => {
      this.cartItems.subscribe(items => {
        const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        subscriber.next(total);
      });
    });
  }

  private saveCart(): void {
    this.storageService.setItem(this.CART_STORAGE_KEY, JSON.stringify(this.cartItems.value));
  }

  private loadCart(): void {
    const savedCart = this.storageService.getItem(this.CART_STORAGE_KEY);
    if (savedCart) {
      this.cartItems.next(JSON.parse(savedCart));
    }
  }
} 