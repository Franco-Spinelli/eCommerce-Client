import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GeoService } from '../services/geo/geo.service';
import { Address } from '../models';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css'
})
export class AddressFormComponent implements OnInit{

  countries: any[];
  states: any[] = [];
  //cities: any[] = [];
  addressForm: FormGroup;
  submissionSuccess: boolean = false;
  isOpen = false;
  isUpdate = false;
  constructor(private formBuilder: FormBuilder,private geoService: GeoService, private userService: UserService){}
  ngOnInit(): void {
    this.addressForm =  this.formBuilder.group({
      id:'',
      country: [,[Validators.required]],
      state:  ['',[Validators.required]],
      city:  ['',[Validators.required]],
      postalCode:  ['',[Validators.required]],
      street:  ['',[Validators.required]],
      number: ['',[Validators.required]]
    });
    this.loadCountries();
    this.addressForm.get('country')?.valueChanges.subscribe(country => {
      if (country) {
        
        this.states = [];
       // this.cities = []; 

        
        this.geoService.getStates(country).subscribe(data => {
          if (data && data.data) {
            this.states = data.data.states;
          }
        });
      }
    });

    
   /* this.addressForm.get('state')?.valueChanges.subscribe(state => {
      if (state) {
        this.geoService.getCities(this.addressForm.value.country, state).subscribe(data => {
          if (data && data.data) {
            this.cities = data.data;
            console.log(data);
            
          }
        });
      }
    });
    */
  }
  loadCountries(): void {
    this.geoService.getCountries().subscribe(data => {
      this.countries = data.data;
    });
  }
  onSubmit(): void {
    console.log(this.addressForm.value);
    
    if (this.addressForm.valid) {
      console.log(this.addressForm.value);
      const address: Address = this.addressForm.value;
      this.userService.addAddress(address).subscribe((address) => {
        console.log('Address added successfully!');
        this.submissionSuccess = true;
      }, (error) => {
        console.error('Error adding address:', error);
        this.submissionSuccess = false;
      });
    }
  }
  update():void{
    const address: Address = this.addressForm.value;
    this.setDefaults();
    this.userService.updateAddress(address).subscribe((address) => {
      console.log('Address update successfully!');
      this.submissionSuccess = true;
    }, (error) => {
      this.submissionSuccess = false;
      console.error('Error adding address:', error);
    });
  
  }
  closeModal() {
    this.isOpen = false;
  }
  openModal() {
    this.isOpen = true;
  }
  open(address: Address) {
    this.addressForm.patchValue({
      id:address.id,
      country: address.country,
      state: address.state,
      street: address.street,
      number: address.number,
      city: address.city,
      postalCode:  address.postalCode,
    });
    this.isUpdate = true;
    this.openModal();
  }
  setDefaults(): void {
    Object.keys(this.addressForm.value).forEach(key => {
      if (this.addressForm.value[key] === '') {
        this.addressForm.value[key] = null;
      }
    });
  }
}
