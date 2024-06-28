import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  @ViewChild('cartModal') cartModal: CartComponent;
  isLoggedIn: boolean = false;
  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = authService.isUserLoggedIn();
  }
  logout() {
    this.authService.logOut();
    alert("Logout success")
    this.router.navigateByUrl("/login")
  }
  openCartModal() {
    this.cartModal.openModal();
  }
}
