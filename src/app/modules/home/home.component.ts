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
    { 
      id: 1, 
      name: 'Electronics', 
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      description: 'Latest gadgets and electronic devices'
    },
    { 
      id: 2, 
      name: 'Fashion', 
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      description: 'Trendy clothing and accessories'
    },
    { 
      id: 3, 
      name: 'Home & Living', 
      image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      description: 'Home decor and furniture'
    },
    { 
      id: 4, 
      name: 'Sports', 
      image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      description: 'Sports equipment and accessories'
    }
  ];
  testimonials = [
    {
      name: 'John Doe',
      role: 'Customer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      text: 'Amazing products and great customer service! The quality is exceptional.',
      rating: 5
    },
    {
      name: 'Jane Smith',
      role: 'Customer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      text: 'The best shopping experience I\'ve had in years. Fast delivery and great prices!',
      rating: 5
    },
    {
      name: 'Mike Johnson',
      role: 'Customer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      text: 'Fast delivery and high-quality products. Will definitely shop here again!',
      rating: 5
    }
  ];
  heroImage = 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80';
  brands = [
    {
      name: 'Apple',
      logo: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      description: 'Premium Quality'
    },
    {
      name: 'Samsung',
      logo: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=50',
      description: 'Innovative Design'
    },
    {
      name: 'Sony',
      logo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      description: 'Sustainable Products'
    },
    {
      name: 'LG',
      logo: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      description: 'Global Leader'
    },
    {
      name: 'Dell',
      logo: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      description: 'Customer Focused'
    }
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
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 99.99,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        rating: 4.5,
        category: 'Electronics',
        stock: 10,
        specifications: {
          'Brand': 'Premium Audio',
          'Color': 'Black',
          'Battery Life': '20 hours',
          'Connectivity': 'Bluetooth 5.0'
        }
      },
      {
        id: 2,
        name: 'Smart Watch',
        description: 'Fitness tracking smartwatch with heart rate monitoring',
        price: 149.99,
        imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        rating: 4.8,
        category: 'Electronics',
        stock: 15,
        specifications: {
          'Brand': 'TechFit',
          'Color': 'Silver',
          'Battery Life': '5 days',
          'Water Resistant': 'Yes'
        }
      },
      {
        id: 3,
        name: 'Smart Home Hub',
        description: 'Control your entire home with this smart hub',
        price: 199.99,
        imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        rating: 4.2,
        category: 'Electronics',
        stock: 8,
        specifications: {
          'Brand': 'SmartHome',
          'Color': 'White',
          'Voice Assistant': 'Yes',
          'Compatibility': 'All major platforms'
        }
      },
      {
        id: 4,
        name: 'Wireless Earbuds',
        description: 'True wireless earbuds with premium sound quality',
        price: 79.99,
        imageUrl: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        rating: 4.7,
        category: 'Electronics',
        stock: 12,
        specifications: {
          'Brand': 'SoundPro',
          'Color': 'White',
          'Battery Life': '6 hours',
          'Charging Case': 'Included'
        }
      }
    ];
  }

  navigateTo(path: string): void {
    if (path === 'home') {
      this.router.navigate(['/']);
    } else {
      this.router.navigate([path]);
    }
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

  navigateToProducts(): void {
    this.router.navigate(['/products']);
  }
} 