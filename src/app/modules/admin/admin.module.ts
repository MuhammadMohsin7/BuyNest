import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
// import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: 'login', component: AdminLoginComponent },
  { 
    path: 'dashboard', 
    component: AdminDashboardComponent,
    children: [
      { path: 'products', component: AdminProductsComponent },
      // { path: 'orders', component: AdminOrdersComponent },
      { path: '', redirectTo: 'products', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminProductsComponent,
    // AdminOrdersComponent,
    AdminLoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { } 