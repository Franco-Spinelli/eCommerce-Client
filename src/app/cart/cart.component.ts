import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { Cart } from '../models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  cart: Cart;
  isOpen = false;
  
   constructor(private cartService: CartService){
   }
  ngOnInit(): void {
    this.cartService.getCart().subscribe((data)=>{
      this.cart = data;
    })
  }
  closeModal() {
    this.isOpen = false;
  }

  openModal() {
    this.isOpen = true;
  }
}
