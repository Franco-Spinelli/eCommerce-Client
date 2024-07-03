import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order/order.service';
import { Address, Cart } from '../models';
import { CartService } from '../services/cart/cart.service';
import { UserService } from '../services/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  constructor(private orderService: OrderService, private cartService:CartService, private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }
  ngOnInit(): void {
    this.loadCart();
    this.getAddresses();
  }
  onSubmit(){
    const formData = this.orderForm.value;
    console.log(formData.selectedAddress);
    
    this.orderService.createOrder(formData.hasDelivery, formData.selectedAddress).subscribe(
      (response: string) => {
        console.log('Order creation successful:', response);
        alert('Order created successfully!');
        this.router.navigateByUrl('/products');
      },
      (error: any) => {
        console.error('Error creating order:', error);
        alert('Error creating order: ' + error.message);
      }
    );
  }
  private loadCart(): void {
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
  getAddresses(){
    this.userService.getAllAddresses().subscribe((data)=>{
      this.allAddress = data;
      this.selectedAddress = this.orderService.getSelectedAddress();
      console.log(this.selectedAddress);
      
      this.filterSelectedAddress();
      this.initializeForm();
    })
  }
  private filterSelectedAddress() {
    if (this.selectedAddress) {
      this.allAddress = this.allAddress.filter(address => address.id !== this.selectedAddress.id);
    }
  }
  initializeForm() {
    this.orderForm = this.formBuilder.group({
      hasDelivery: [false, [Validators.required]],
      selectedAddress: [this.selectedAddress, [Validators.required]]
    });
  }
}
