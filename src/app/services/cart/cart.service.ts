import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Cart } from '../../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartUpdated = new Subject<void>();
  constructor(private http: HttpClient) { }
  getCart(): Observable<Cart>{
    return this.http.get<Cart>(environment.urlApi + "/cart/get");
  }
 
  addProductToCart(productId: number, quantity: number): Observable<Cart> {
    const cartItemRequest = { productId, quantity };
    return this.http.post<Cart>(environment.urlApi + "/cart/add-products", cartItemRequest).pipe(
      tap(() => this.cartUpdated.next()) 
    );
  }
  public getCartUpdateObservable(): Observable<void> {
    return this.cartUpdated.asObservable();
  }
}
