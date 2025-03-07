import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { WishlistService } from './services/wishlist.service';

@NgModule({
  declarations: [
    WishlistComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: WishlistComponent }
    ])
  ],
  providers: [WishlistService]
})
export class WishlistModule { } 