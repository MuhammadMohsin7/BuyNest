import { Component, OnInit } from '@angular/core';
import { Product } from '../../../modules/products/services/product.service';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-wishlist',
  template: `
    <div class="wishlist">
      <div class="wishlist__container">
        <h1 class="wishlist__title">My Wishlist</h1>
        <div *ngIf="wishlistItems.length > 0; else emptyWishlist" class="wishlist__grid">
          <div *ngFor="let product of wishlistItems" class="wishlist__item">
            <img [src]="product.imageUrl" [alt]="product.name" class="wishlist__item-image">
            <div class="wishlist__item-details">
              <h3 class="wishlist__item-name">{{ product.name }}</h3>
              <p class="wishlist__item-price">{{ product.price | currency }}</p>
              <div class="wishlist__item-actions">
                <button (click)="addToCart(product)" class="wishlist__add-btn">
                  Add to Cart
                </button>
                <button (click)="removeFromWishlist(product.id)" class="wishlist__remove-btn">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
        <ng-template #emptyWishlist>
          <div class="wishlist__empty">
            <p>Your wishlist is empty</p>
            <button routerLink="/products" class="wishlist__continue-btn">Continue Shopping</button>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .wishlist {
      &__container {
        @apply container mx-auto px-4 py-8;
      }

      &__title {
        @apply text-3xl font-bold mb-8;
      }

      &__grid {
        @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
      }

      &__item {
        @apply bg-white rounded-lg shadow overflow-hidden;
      }

      &__item-image {
        @apply w-full h-48 object-cover;
      }

      &__item-details {
        @apply p-4;
      }

      &__item-name {
        @apply font-semibold mb-2;
      }

      &__item-price {
        @apply text-gray-600 mb-4;
      }

      &__item-actions {
        @apply flex space-x-2;
      }

      &__add-btn {
        @apply flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors;
      }

      &__remove-btn {
        @apply px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50 transition-colors;
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
export class WishlistComponent implements OnInit {
  wishlistItems: Product[] = [];

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadWishlist();
  }

  private loadWishlist(): void {
    this.wishlistService.getWishlistItems().subscribe(items => {
      this.wishlistItems = items;
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.removeFromWishlist(product.id);
  }

  removeFromWishlist(productId: number): void {
    this.wishlistService.removeFromWishlist(productId);
  }
} 