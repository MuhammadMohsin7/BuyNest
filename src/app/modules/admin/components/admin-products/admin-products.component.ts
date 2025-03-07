import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../products/services/product.service';
import { ProductService } from '../../../products/services/product.service';

@Component({
  selector: 'app-admin-products',
  template: `
    <div class="admin-products">
      <div class="admin-products__header">
        <h1 class="admin-products__title">Manage Products</h1>
        <button (click)="showAddForm()" class="admin-products__add-btn">Add New Product</button>
      </div>

      <div *ngIf="isEditing" class="admin-products__form-container">
        <form [formGroup]="productForm" (ngSubmit)="onSubmit()" class="admin-products__form">
          <div class="admin-products__form-group">
            <label for="name" class="admin-products__label">Name</label>
            <input type="text" id="name" formControlName="name" class="admin-products__input">
          </div>
          <div class="admin-products__form-group">
            <label for="description" class="admin-products__label">Description</label>
            <textarea id="description" formControlName="description" class="admin-products__textarea"></textarea>
          </div>
          <div class="admin-products__form-group">
            <label for="price" class="admin-products__label">Price</label>
            <input type="number" id="price" formControlName="price" class="admin-products__input">
          </div>
          <div class="admin-products__form-group">
            <label for="imageUrl" class="admin-products__label">Image URL</label>
            <input type="url" id="imageUrl" formControlName="imageUrl" class="admin-products__input">
          </div>
          <div class="admin-products__form-group">
            <label for="stock" class="admin-products__label">Stock</label>
            <input type="number" id="stock" formControlName="stock" class="admin-products__input">
          </div>
          <div class="admin-products__form-actions">
            <button type="submit" [disabled]="!productForm.valid" class="admin-products__submit-btn">
              {{ editingProduct ? 'Update' : 'Add' }} Product
            </button>
            <button type="button" (click)="cancelEdit()" class="admin-products__cancel-btn">Cancel</button>
          </div>
        </form>
      </div>

      <div class="admin-products__grid">
        <div *ngFor="let product of products" class="admin-products__card">
          <img [src]="product.imageUrl" [alt]="product.name" class="admin-products__card-image">
          <div class="admin-products__card-content">
            <h3 class="admin-products__card-title">{{ product.name }}</h3>
            <p class="admin-products__card-price">{{ product.price | currency }}</p>
            <p class="admin-products__card-stock">Stock: {{ product.stock }}</p>
            <div class="admin-products__card-actions">
              <button (click)="editProduct(product)" class="admin-products__edit-btn">Edit</button>
              <button (click)="deleteProduct(product.id)" class="admin-products__delete-btn">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-products {
      &__header {
        @apply flex justify-between items-center mb-8;
      }

      &__title {
        @apply text-2xl font-bold text-gray-900;
      }

      &__add-btn {
        @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors;
      }

      &__form-container {
        @apply bg-white p-6 rounded-lg shadow-md mb-8;
      }

      &__form {
        @apply space-y-4;
      }

      &__form-group {
        @apply space-y-2;
      }

      &__label {
        @apply block text-sm font-medium text-gray-700;
      }

      &__input {
        @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500;
      }

      &__textarea {
        @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32;
      }

      &__form-actions {
        @apply flex space-x-4 mt-6;
      }

      &__submit-btn {
        @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50;
      }

      &__cancel-btn {
        @apply bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors;
      }

      &__grid {
        @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
      }

      &__card {
        @apply bg-white rounded-lg shadow-md overflow-hidden;
      }

      &__card-image {
        @apply w-full h-48 object-cover;
      }

      &__card-content {
        @apply p-4;
      }

      &__card-title {
        @apply text-lg font-semibold mb-2;
      }

      &__card-price {
        @apply text-gray-600 mb-2;
      }

      &__card-stock {
        @apply text-sm text-gray-500 mb-4;
      }

      &__card-actions {
        @apply flex space-x-2;
      }

      &__edit-btn {
        @apply flex-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors;
      }

      &__delete-btn {
        @apply flex-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors;
      }
    }
  `]
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  productForm: FormGroup;
  isEditing = false;
  editingProduct: Product | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      imageUrl: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  showAddForm(): void {
    this.isEditing = true;
    this.editingProduct = null;
    this.productForm.reset();
  }

  editProduct(product: Product): void {
    this.isEditing = true;
    this.editingProduct = product;
    this.productForm.patchValue(product);
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingProduct = null;
    this.productForm.reset();
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      if (this.editingProduct) {
        this.productService.updateProduct(this.editingProduct.id, productData).subscribe({
          next: () => {
            this.loadProducts();
            this.cancelEdit();
          },
          error: (error) => {
            console.error('Failed to update product:', error);
          }
        });
      } else {
        this.productService.createProduct(productData).subscribe({
          next: () => {
            this.loadProducts();
            this.cancelEdit();
          },
          error: (error) => {
            console.error('Failed to create product:', error);
          }
        });
      }
    }
  }

  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (error) => {
          console.error('Failed to delete product:', error);
        }
      });
    }
  }
} 