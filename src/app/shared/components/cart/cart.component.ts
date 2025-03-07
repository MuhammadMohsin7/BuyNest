import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  template: `
    <div class="cart">
      <div class="cart__container">
        <h1 class="cart__title">Shopping Cart</h1>
        <div *ngIf="cartItems.length > 0; else emptyCart" class="cart__content">
          <div class="cart__items">
            <div *ngFor="let item of cartItems" class="cart__item">
              <img [src]="item.product.imageUrl" [alt]="item.product.name" class="cart__item-image">
              <div class="cart__item-details">
                <h3 class="cart__item-name">{{ item.product.name }}</h3>
                <p class="cart__item-price">{{ item.product.price | currency }}</p>
                <div class="cart__item-quantity">
                  <button (click)="updateQuantity(item.product.id, item.quantity - 1)" 
                          [disabled]="item.quantity <= 1"
                          class="cart__quantity-btn">-</button>
                  <span>{{ item.quantity }}</span>
                  <button (click)="updateQuantity(item.product.id, item.quantity + 1)"
                          [disabled]="item.quantity >= item.product.stock"
                          class="cart__quantity-btn">+</button>
                </div>
              </div>
              <button (click)="removeFromCart(item.product.id)" class="cart__remove-btn">×</button>
            </div>
          </div>
          <div class="cart__summary">
            <div class="cart__total">
              <span>Total:</span>
              <span>{{ total | currency }}</span>
            </div>
            <button (click)="checkout()" class="cart__checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
        <ng-template #emptyCart>
          <div class="cart__empty">
            <p>Your cart is empty</p>
            <button routerLink="/products" class="cart__continue-btn">Continue Shopping</button>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .cart {
      &__container {
        @apply container mx-auto px-4 py-8;
      }

      &__title {
        @apply text-3xl font-bold mb-8;
      }

      &__content {
        @apply grid grid-cols-1 lg:grid-cols-3 gap-8;
      }

      &__items {
        @apply lg:col-span-2 space-y-4;
      }

      &__item {
        @apply flex items-center space-x-4 bg-white p-4 rounded-lg shadow;
      }

      &__item-image {
        @apply w-24 h-24 object-cover rounded;
      }

      &__item-details {
        @apply flex-1;
      }

      &__item-name {
        @apply font-semibold mb-1;
      }

      &__item-price {
        @apply text-gray-600 mb-2;
      }

      &__item-quantity {
        @apply flex items-center space-x-2;
      }

      &__quantity-btn {
        @apply w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50;
      }

      &__remove-btn {
        @apply text-2xl text-gray-500 hover:text-red-500;
      }

      &__summary {
        @apply lg:col-span-1 bg-white p-4 rounded-lg shadow h-fit;
      }

      &__total {
        @apply flex justify-between text-xl font-semibold mb-4;
      }

      &__checkout-btn {
        @apply w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors;
      }

      &__empty {
        @apply text-center py-12;

        p {
          @apply text-xl text-gray-600 mb-4;
        }
      }

      &__continue-btn {
        @apply bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors;
      }
    }
  `]
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total = 0;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  private loadCart(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });

    this.cartService.getTotal().subscribe(total => {
      this.total = total;
    });
  }

  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
  }
} 