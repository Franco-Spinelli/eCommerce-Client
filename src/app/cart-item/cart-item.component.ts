import { Component, Input } from '@angular/core';
import { CartItem } from '../models';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
removeItem() {
throw new Error('Method not implemented.');
}
  @Input() cartItem: CartItem;
}
