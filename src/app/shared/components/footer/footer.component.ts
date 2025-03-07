import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="bg-gray-800 text-white mt-8">
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4">Cool Shades</h3>
            <p class="text-gray-400">
              Your one-stop shop for stylish sunglasses and eyewear.
            </p>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li><a routerLink="/products" class="text-gray-400 hover:text-white">Products</a></li>
              <li><a routerLink="/contact" class="text-gray-400 hover:text-white">Contact</a></li>
              <li><a routerLink="/about" class="text-gray-400 hover:text-white">About Us</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-4">Contact Us</h3>
            <ul class="space-y-2 text-gray-400">
              <li>Email: info&#64;coolshades.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Sunglass Street, Style City</li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {{ currentYear }} Cool Shades. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
} 