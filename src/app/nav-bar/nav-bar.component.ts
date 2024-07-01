import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { UserService } from '../services/user/user.service';
import { Address } from '../models';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  @ViewChild('cartModal') cartModal: CartComponent;
  isLoggedIn: boolean = false;
  addresses: Address[];
  selectedAddress: Address;
  constructor(private authService: AuthService, private router: Router, private userService: UserService) {
    
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
  getAddresses(){
    this.userService.getAllAddresses().subscribe((data)=>{
      this.addresses = data;
      console.log(data);
      this.selectedAddress = this.addresses[0];
    })
  }
  selectAddress(address: any) {
    this.selectedAddress = address;
  }
}
