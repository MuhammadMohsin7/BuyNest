import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { Product } from '../products/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  categories = [
    { id: 1, name: 'Electronics', image: 'assets/images/categories/electronics.jpg' },
    { id: 2, name: 'Fashion', image: 'assets/images/categories/fashion.jpg' },
    { id: 3, name: 'Home & Living', image: 'assets/images/categories/home.jpg' },
    { id: 4, name: 'Sports', image: 'assets/images/categories/sports.jpg' }
  ];
  testimonials = [
    {
      name: 'John Doe',
      role: 'Customer',
      image: 'assets/images/testimonials/user1.jpg',
      text: 'Amazing products and great customer service!'
    },
    {
      name: 'Jane Smith',
      role: 'Customer',
      image: 'assets/images/testimonials/user2.jpg',
      text: 'The best shopping experience I\'ve had in years.'
    },
    {
      name: 'Mike Johnson',
      role: 'Customer',
      image: 'assets/images/testimonials/user3.jpg',
      text: 'Fast delivery and high-quality products.'
    }
  ];
  brands = [
    { name: 'Brand 1', logo: 'assets/images/brands/brand1.png' },
    { name: 'Brand 2', logo: 'assets/images/brands/brand2.png' },
    { name: 'Brand 3', logo: 'assets/images/brands/brand3.png' },
    { name: 'Brand 4', logo: 'assets/images/brands/brand4.png' },
    { name: 'Brand 5', logo: 'assets/images/brands/brand5.png' }
  ];
  email: string = '';

  constructor(
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // TODO: Load featured products from service
    this.featuredProducts = [
      {
        id: 1,
        name: 'Product 1',
        description: 'Description 1',
        price: 99.99,
        imageUrl: 'assets/images/products/product1.jpg',
        rating: 4.5,
        category: 'Electronics',
        stock: 10,
        specifications: {}
      },
      {
        id: 2,
        name: 'Product 2',
        description: 'Description 2',
        price: 149.99,
        imageUrl: 'assets/images/products/product2.jpg',
        rating: 4.8,
        category: 'Fashion',
        stock: 15,
        specifications: {}
      },
      {
        id: 3,
        name: 'Product 3',
        description: 'Description 3',
        price: 199.99,
        imageUrl: 'assets/images/products/product3.jpg',
        rating: 4.2,
        category: 'Home & Living',
        stock: 8,
        specifications: {}
      },
      {
        id: 4,
        name: 'Product 4',
        description: 'Description 4',
        price: 79.99,
        imageUrl: 'assets/images/products/product4.jpg',
        rating: 4.7,
        category: 'Sports',
        stock: 12,
        specifications: {}
      }
    ];
  }

  navigateTo(path: string): void {
      this.router.navigate([path]);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  subscribeNewsletter(): void {
    if (this.email) {
      // TODO: Implement newsletter subscription
      console.log('Newsletter subscription:', this.email);
      this.email = '';
    }
  }
} 