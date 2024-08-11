import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { UserService } from '../services/user/user.service';
import { Address, Cart } from '../models';
import { AddressFormComponent } from '../address-form/address-form.component';
import { OrderService } from '../services/order/order.service';
import { CartService } from '../services/cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {

  @ViewChild('cartModal') cartModal: CartComponent;
  @ViewChild('addressModal') addressModal: AddressFormComponent;
  isLoggedIn: boolean = false;
  addresses: Address[];
  selectedAddress: Address;
  subscription: Subscription;
  cart: Cart;
  ordersCount: number;
  ordersCountAdmin:number;
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private orderService: OrderService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.authService.authStatus.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.getAddresses();
        this.getItemCount();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logOut();
    localStorage.removeItem('selectedAddress');
    alert('Logout success');
    this.router.navigateByUrl('/login');
  }

  openCartModal() {
    this.cartModal.openModal();
  }

  openAddressModal() {
    this.addressModal.openCreate();
  }

  getAddresses() {
    if(this.isCustomerlogin()){    
      this.userService.getAllAddresses().subscribe((data) => {
      this.addresses = data;
      console.log(data);
      this.restoreSelectedAddress();
    });
  }
  }

  selectAddress(address: any) {
    this.selectedAddress = address;
    localStorage.setItem('selectedAddress', JSON.stringify(address));
  }

  openEditAddressModal(address: Address) {
    this.addressModal.open(address);
  }

  restoreSelectedAddress() {
    const savedAddress = localStorage.getItem('selectedAddress');
    if (savedAddress) {
      const addressObj = JSON.parse(savedAddress);
      const foundAddress = this.addresses.find((address) => address.id === addressObj.id);
      if (foundAddress) {
        this.selectedAddress = foundAddress;
      } else {
        this.selectedAddress = this.addresses[0];
      }
    } else {
      this.selectedAddress = this.addresses[0];
    }
    this.orderService.setSelectedAddress(this.selectedAddress);
  }

  getItemCount() {
    if(this.isCustomerlogin()){
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
      this.orderService.getOrders().subscribe((data) => {
        this.ordersCount = data.length;
      });
    }
    if(this.isAdminlogin()){
      this.orderService.getAllOrders().subscribe((data)=>{
        this.ordersCountAdmin = data.length;
      })
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
  isCustomerlogin(): boolean{
    return this.authService.isCustomer();
  }
  isAdminlogin(): boolean{
    return this.authService.isAdmin();
  }
  
  deleteAddress(address: Address) {
    this.userService.deleteAddress(address).subscribe((data)=>{
    })
    }
}
