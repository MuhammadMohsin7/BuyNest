export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  rating: number;
  specifications: Record<string, any>;
  createdAt: string;
  updatedAt: string;
} 