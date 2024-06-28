import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { Cart } from '../models';
import { Subject, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, OnDestroy{
  cart: Cart;
  isOpen = false;
  subscription: Subscription;
  
   constructor(private cartService: CartService){
   }

   ngOnInit(): void {
    console.log('Initializing cart component');
    this.subscription = this.cartService.getCartUpdateObservable().subscribe(
      () => {
        console.log('Cart update triggered');
        this.updateCart(); 
      },
      (error) => {
        console.error('Error in cart update observable:', error);
      }
    );
    this.updateCart();
  }
  private updateCart(): void {
    this.cartService.getCart().subscribe(
      (data) => {
        if (data) {
          this.cart = data;
          console.log('Data received:', data);
        } else {
          console.error('Empty response from getCart()');
        }
      },
      (error) => {
        console.error('Error fetching cart:', error);
      }
    );
  }
  closeModal() {
    this.isOpen = false;
  }

  openModal() {
    this.isOpen = true;
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
