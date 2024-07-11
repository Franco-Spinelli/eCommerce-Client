import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order/order.service';
import { Address, Cart, CartItem } from '../models';
import { CartService } from '../services/cart/cart.service';
import { UserService } from '../services/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent  implements OnInit {
  shippingCost: number = 5;
  orderForm: FormGroup;
  allAddress: Address[];
  selectedAddress: Address;
  cart: Cart;
  hasDelivery: boolean;
  subscription: Subscription;
  constructor(private orderService: OrderService, private cartService:CartService, private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }
  ngOnInit(): void {
    this.initializeForm();
    this.loadCart();
    this.getAddresses();
  }
  onSubmit(){
    const formData = this.orderForm.value;
    this.orderService.createOrder(formData.hasDelivery, formData.selectedAddress).subscribe(
      (response: string) => {
        console.log('Order creation successful:', response);
        alert('Order created successfully!');
        localStorage.setItem('selectedAddress', JSON.stringify(formData.selectedAddress));
        this.orderService.setSelectedAddress(formData.selectedAddress)
        console.log(this.orderService.getSelectedAddress());
        
        this.router.navigateByUrl('/products');
      },
      (error: any) => {
        console.error('Error creating order:', error);
        alert('Error creating order: ' + error.message);
      }
    );
  }
  private loadCart(): void {
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
  getAddresses(){
    this.userService.getAllAddresses().subscribe((data)=>{
      this.allAddress = data;
      this.selectedAddress = this.orderService.getSelectedAddress();
      this.filterSelectedAddress();
    })
  }
  private filterSelectedAddress() {
    if (this.selectedAddress) {
      this.allAddress = this.allAddress.filter(address => address.id !== this.selectedAddress.id);
    }
  }
  initializeForm() {
    this.selectedAddress = this.orderService.getSelectedAddress();
    this.orderForm = this.formBuilder.group({
      hasDelivery: [false, [Validators.required]],
      selectedAddress: [this.selectedAddress, [Validators.required]]
    });
  }

  removeItem(cartItem: CartItem) {
    if (cartItem.id) {
      this.cartService.removeProductFromCart(cartItem.id).subscribe(
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
}
