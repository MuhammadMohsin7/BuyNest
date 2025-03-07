import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  template: `
    <div class="product-list">
      <div class="product-list__container">
        <h1 class="product-list__title">Our Products</h1>
        <div class="product-list__grid">
          <app-product-card
            *ngFor="let product of products"
            [product]="product"
            class="product-list__card">
          </app-product-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-list {
      &__container {
        @apply container mx-auto px-4 py-8;
      }

      &__title {
        @apply text-3xl font-bold mb-8;
      }

      &__grid {
        @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
      }

      &__card {
        @apply h-full;
      }
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }
} 