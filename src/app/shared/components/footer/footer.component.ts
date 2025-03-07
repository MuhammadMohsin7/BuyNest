import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  footerLinks = {
    shop: [
      { name: 'Electronics', path: '/products?category=electronics' },
      { name: 'Fashion', path: '/products?category=fashion' },
      { name: 'Home & Living', path: '/products?category=home-living' },
      { name: 'Sports', path: '/products?category=sports' }
    ],
    support: [
      { name: 'Contact Us', path: '/contact' },
      { name: 'FAQs', path: '/faqs' },
      { name: 'Shipping Policy', path: '/shipping' },
      { name: 'Returns', path: '/returns' }
    ],
    about: [
      { name: 'Our Story', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press', path: '/press' },
      { name: 'Blog', path: '/blog' }
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
      { name: 'Sitemap', path: '/sitemap' }
    ]
  };

  socialLinks = [
    { name: 'Facebook', icon: 'fab fa-facebook-f', url: 'https://facebook.com' },
    { name: 'Twitter', icon: 'fab fa-twitter', url: 'https://twitter.com' },
    { name: 'Instagram', icon: 'fab fa-instagram', url: 'https://instagram.com' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: 'https://linkedin.com' },
    { name: 'YouTube', icon: 'fab fa-youtube', url: 'https://youtube.com' }
  ];

  contactInfo = {
    address: '123 Store Street, Shopping District, City, Country',
    phone: '+1 (555) 123-4567',
    email: 'support@store.com',
    hours: 'Mon-Fri: 9:00 AM - 8:00 PM'
  };
} 