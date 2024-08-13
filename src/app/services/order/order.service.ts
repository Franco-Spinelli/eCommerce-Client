import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address, Order, OrderStatus } from '../../models';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private selectedAddress: Address;
  private orderCreated = new BehaviorSubject<void>(undefined);
  orderCreated$ = this.orderCreated.asObservable();
  constructor(private http: HttpClient) { }
  createOrder(hasDelivery: boolean, address: Address): Observable<string> {
    const hasDeliveryRequest = { hasDelivery, address };
    return this.http.post<string>(environment.urlApi + "/order/create", hasDeliveryRequest).pipe(
      tap(()=>{
        this.orderCreated.next();
    }));
  }
  getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(environment.urlApi + "/order/get-all-user");
  }
  getAllOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(environment.urlAdmin + "/get-all-orders");
  }
  setSelectedAddress(address: Address) {
    this.selectedAddress = address;
  }
  changeOrderStatus(orderId: number, newStatus: OrderStatus): Observable<Order> {
    const url = `${environment.urlAdmin}/${orderId}/change-status`;
    return this.http.put<Order>(url, { status: newStatus });
  }
  getSelectedAddress() {
    return this.selectedAddress;
  }
}
