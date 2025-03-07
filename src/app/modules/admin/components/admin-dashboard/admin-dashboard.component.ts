import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  stats = {
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0
  };

  recentOrders = [
    {
      id: 1,
      customer: 'John Doe',
      date: '2024-03-07',
      total: 299.99,
      status: 'Delivered'
    },
    {
      id: 2,
      customer: 'Jane Smith',
      date: '2024-03-06',
      total: 149.99,
      status: 'Processing'
    },
    {
      id: 3,
      customer: 'Mike Johnson',
      date: '2024-03-05',
      total: 199.99,
      status: 'Shipped'
    }
  ];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // TODO: Load dashboard stats from service
  }

  navigateTo(path: string): void {
    this.router.navigate(['/admin', path]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
} 