import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { UserService } from '../services/user/user.service';
import { Address } from '../models';
import { AddressFormComponent } from '../address-form/address-form.component';
import { OrderService } from '../services/order/order.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  @ViewChild('cartModal') cartModal: CartComponent;
  @ViewChild('addressModal') addressModal: AddressFormComponent;
  isLoggedIn: boolean = false;
  addresses: Address[];
  selectedAddress: Address;
  constructor(private authService: AuthService, private router: Router, private userService: UserService, private orderService: OrderService) {
  }
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.getAddresses();
  }
  logout() {
    this.authService.logOut();
    alert("Logout success")
    this.router.navigateByUrl("/login")
  }
  openCartModal() {
    this.cartModal.openModal();
  }
  openAddressModal(){
    this.addressModal.openModal();
  }
  getAddresses(){
    this.userService.getAllAddresses().subscribe((data)=>{
      this.addresses = data;
      console.log(data);
      this.restoreSelectedAddress();
    })
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
      const foundAddress = this.addresses.find(address => address.id === addressObj.id);
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
  
}
