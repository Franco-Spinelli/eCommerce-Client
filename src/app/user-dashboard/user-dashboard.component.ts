import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  personalInfoForm: FormGroup;
  notificationsForm: FormGroup;
  paymentForm: FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.personalInfoForm = this.formBuilder.group({
      name:['',[Validators.required]],
      lastName: ['', [Validators.required,Validators.minLength(6)]]
    })
    this.notificationsForm = this.formBuilder.group({
      emailNotifications:['',[Validators.required]]
    })
    this.paymentForm = this.formBuilder.group({
      creditCardNumber:['',[Validators.required]],
      expirationDate:['',[Validators.required]],
      cvv:['',[Validators.required]]
      
    })
  }

  saveSettings() {
    console.log(this.personalInfoForm.value);
    console.log(this.notificationsForm.value);
    console.log(this.paymentForm.value);
  }
}
