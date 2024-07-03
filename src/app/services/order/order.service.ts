import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../../models';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private selectedAddress: Address;
  constructor(private http: HttpClient) { }
  createOrder(hasDelivery: boolean, address: Address): Observable<string> {
    const hasDeliveryRequest = { hasDelivery, address };
    console.log(address);
    
    return this.http.post<string>(environment.urlApi + "/order/create", hasDeliveryRequest);
  }
  setSelectedAddress(address: Address) {
    this.selectedAddress = address;
  }

  getSelectedAddress() {
    return this.selectedAddress;
  }
}
