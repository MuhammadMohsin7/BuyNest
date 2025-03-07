import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { CartService } from '../../../shared/services/cart.service';
import { WishlistService } from '../../../shared/services/wishlist.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isAuthenticated$!: Observable<boolean>;
  cartCount$!: Observable<number>;
  wishlistCount$!: Observable<number>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    // Subscribe to authentication state changes
    this.isAuthenticated$ = this.authService.currentUser$.pipe(
      map(user => !!user)
    );
    
    // Get cart and wishlist counts
    this.cartCount$ = this.cartService.getCartCount();
    this.wishlistCount$ = this.wishlistService.getWishlistCount();
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
} 