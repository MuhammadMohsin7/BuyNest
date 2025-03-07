import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
  category: string;
  stock: number;
  specifications: {
    [key: string]: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  private defaultProducts: Product[] = [
    {
      id: 1,
      name: 'Classic Aviator',
      description: 'Timeless aviator sunglasses with gold-tone metal frame and green-tinted lenses.',
      price: 129.99,
      imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      rating: 4.8,
      category: 'Aviator',
      stock: 15,
      specifications: {
        'Frame Material': 'Metal',
        'Lens Color': 'Green',
        'UV Protection': '100%',
        'Frame Size': 'Medium'
      }
    },
    {
      id: 2,
      name: 'Modern Round',
      description: 'Contemporary round sunglasses with acetate frame and polarized lenses.',
      price: 149.99,
      imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      rating: 4.6,
      category: 'Round',
      stock: 20,
      specifications: {
        'Frame Material': 'Acetate',
        'Lens Color': 'Brown',
        'UV Protection': '100%',
        'Frame Size': 'Medium'
      }
    },
    {
      id: 3,
      name: 'Sport Performance',
      description: 'Lightweight sports sunglasses with wrap-around design and anti-fog coating.',
      price: 179.99,
      imageUrl: 'https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      rating: 4.9,
      category: 'Sports',
      stock: 10,
      specifications: {
        'Frame Material': 'Polycarbonate',
        'Lens Color': 'Gray',
        'UV Protection': '100%',
        'Frame Size': 'Large'
      }
    }
  ];

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return of(this.defaultProducts);
  }

  getProductById(id: number): Observable<Product> {
    const product = this.defaultProducts.find(p => p.id === id);
    return of(product!);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    const products = this.defaultProducts.filter(p => p.category === category);
    return of(products);
  }

  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  uploadProductImage(id: number, image: File): Observable<Product> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<Product>(`${this.apiUrl}/${id}/image`, formData);
  }
} 