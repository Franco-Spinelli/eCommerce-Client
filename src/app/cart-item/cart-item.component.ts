import { Component, Input } from '@angular/core';
import { CartItem } from '../models';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  @Input() cartItem: CartItem;
  constructor(private cartService: CartService){}
  removeItem() {
    if (this.cartItem.id) {
      this.cartService.removeProductFromCart(this.cartItem.id).subscribe(
        () => {
          console.log('Product removed successfully');
         
        },
        error => {
          console.error('Error removing product from cart:', error);
          
        }
      );
    } else {
      console.error('CartItem ID not available');
      
    }
  }
}
