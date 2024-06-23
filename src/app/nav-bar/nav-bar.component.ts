import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isLoggedIn: boolean = false;
  constructor(private authService: AuthService, private router: Router){
    this.isLoggedIn = authService.isUserLoggedIn();
  }
  logout(){
    this.authService.logOut();
    alert("Logout success")
    this.router.navigateByUrl("/login")
  }
}
