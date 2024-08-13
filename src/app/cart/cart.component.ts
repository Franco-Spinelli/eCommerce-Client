import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { Cart } from '../models';
import { Subject, Subscription, switchMap } from 'rxjs';
import { OrderService } from '../services/order/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, OnDestroy{
  cart: Cart;
  isOpen = false;
  subscription: Subscription;
  
   constructor(private cartService: CartService, private orderService: OrderService){
   }

   ngOnInit(): void {
    this.updateCart();
    this.subscription = this.cartService.getCartUpdateObservable().subscribe(
      () => {
        this.updateCart(); 
      },
      (error) => {
        console.error('Error in cart update observable:', error);
      }
    );
    this.orderService.orderCreated$.subscribe(() => {
      this.updateCart();
    });
  }
  private updateCart(): void {
    this.cartService.getCart().subscribe(
      (data) => {
        if (data) {
          this.cart = data;
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
