import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../services/product.service';
import { CartService } from '../../../../shared/services/cart.service';
import { WishlistService } from '../../../../shared/services/wishlist.service';

@Component({
  selector: 'app-product-card',
  template: `
    <div class="product-card">
      <img [src]="product.imageUrl" [alt]="product.name" class="product-card__image">
      <div class="product-card__content">
        <h3 class="product-card__title">{{ product.name }}</h3>
        <p class="product-card__description">{{ product.description }}</p>
        <div class="product-card__footer">
          <span class="product-card__price">{{ product.price | currency }}</span>
          <div class="product-card__rating">
            <span class="product-card__star">★</span>
            <span class="product-card__rating-value">{{ product.rating }}</span>
          </div>
        </div>
        <div class="product-card__actions">
          <button (click)="addToCart()" class="product-card__button product-card__button--primary">
            Add to Cart
          </button>
          <button (click)="toggleWishlist()" 
                  [class.product-card__button--active]="isInWishlist"
                  class="product-card__button product-card__button--secondary">
            {{ isInWishlist ? '❤️' : '🤍' }}
          </button>
        </div>
        <button (click)="viewDetails()" class="product-card__button product-card__button--outline">
          View Details
        </button>
      </div>
    </div>
  `,
  styles: [`
    .product-card {
      @apply bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col;

      &__image {
        @apply w-full h-48 object-cover;
      }

      &__content {
        @apply p-4 flex flex-col flex-grow;
      }

      &__title {
        @apply text-lg font-semibold mb-2;
      }

      &__description {
        @apply text-gray-600 mb-4 flex-grow;
      }

      &__footer {
        @apply flex justify-between items-center mb-4;
      }

      &__price {
        @apply text-2xl font-bold;
      }

      &__rating {
        @apply flex items-center;
      }

      &__star {
        @apply text-yellow-400;
      }

      &__rating-value {
        @apply ml-1;
      }

      &__actions {
        @apply flex space-x-2 mb-4;
      }

      &__button {
        @apply flex-1 py-2 px-4 rounded transition-colors;

        &--primary {
          @apply bg-blue-600 text-white hover:bg-blue-700;
        }

        &--secondary {
          @apply border border-gray-300 hover:bg-gray-50;
        }

        &--outline {
          @apply border border-blue-600 text-blue-600 hover:bg-blue-50;
        }

        &--active {
          @apply border-red-500 text-red-500;
        }
      }
    }
  `]
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  isInWishlist = false;

  constructor(
    private router: Router,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    if (this.product) {
      this.isInWishlist = this.wishlistService.isInWishlist(this.product.id);
    }
  }

  viewDetails(): void {
    this.router.navigate(['/products', this.product.id]);
  }

  addToCart(): void {
    this.cartService.addToCart(this.product);
  }

  toggleWishlist(): void {
    if (this.isInWishlist) {
      this.wishlistService.removeFromWishlist(this.product.id);
    } else {
      this.wishlistService.addToWishlist(this.product);
    }
    this.isInWishlist = !this.isInWishlist;
  }
} 