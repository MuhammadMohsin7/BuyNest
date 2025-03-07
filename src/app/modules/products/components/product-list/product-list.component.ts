import { Component, OnInit } from '@angular/core';
import { Product } from '../../services/product.service';
import { CartService } from '../../../../shared/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = 'all';
  sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' }
  ];
  selectedSort: string = 'featured';
  loading: boolean = true;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // TODO: Load products from service
    this.loading = false;
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    if (category === 'all') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.category === category);
    }
  }

  sortProducts(sortBy: string): void {
    this.selectedSort = sortBy;
    switch (sortBy) {
      case 'price-low':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // TODO: Implement newest sort when we have dates
        break;
      default:
        // Featured sort (default)
        break;
    }
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
} 