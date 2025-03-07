import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">My Wishlist</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Wishlist items will be displayed here -->
      </div>
    </div>
  `
})
export class WishlistComponent implements OnInit {
  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {}
} 