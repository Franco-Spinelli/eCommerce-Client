import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router){
    this.registerForm = this.formBuilder.group({
      username:['',[Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    })
  }
  onSubmit() {
    this.authService.register(this.registerForm.value).subscribe((data)=>{
      console.log(data);
      alert("Welcome!")
      this.router.navigateByUrl("/products")
    },
    (error)=>{
      console.log(error);
      alert("Something went wrong, please check the email or password")
    }
  )
}
}
