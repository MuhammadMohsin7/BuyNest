import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService, Product } from '../../../../shared/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  productForm: FormGroup;
  isEditing = false;
  selectedProduct: Product | null = null;
  categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys'];
  loading = false;
  error = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]],
      image: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.loading = false;
      },
      error: (error: Error) => {
        this.error = 'Failed to load products. Please try again later.';
        this.loading = false;
      }
    });
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  openAddProductModal(): void {
    this.isEditing = false;
    this.selectedProduct = null;
    this.productForm.reset();
  }

  openEditProductModal(product: Product): void {
    this.isEditing = true;
    this.selectedProduct = product;
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: product.image
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      
      if (this.isEditing && this.selectedProduct) {
        this.productService.updateProduct(this.selectedProduct.id, productData).subscribe({
          next: () => {
            this.loadProducts();
            this.selectedProduct = null;
          },
          error: (error: Error) => {
            this.error = 'Failed to update product. Please try again.';
          }
        });
      } else {
        this.productService.createProduct(productData).subscribe({
          next: () => {
            this.loadProducts();
          },
          error: (error: Error) => {
            this.error = 'Failed to create product. Please try again.';
          }
        });
      }
    }
  }

  deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (error: Error) => {
          this.error = 'Failed to delete product. Please try again.';
        }
      });
    }
  }

  onImageUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Here you would typically upload the file to your server or cloud storage
      // and get back a URL. For now, we'll just use a placeholder
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.productForm.patchValue({
          image: e.target?.result
        });
      };
      reader.readAsDataURL(file);
    }
  }
} 