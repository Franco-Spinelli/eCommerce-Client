import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ProductService{

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(environment.urlApi + "/products/get-products");
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(environment.urlApi + "/products/get-categories");
  }
  createProduct(productDTO: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.urlAdmin}/create-product`, productDTO);
  }
  
  deleteProduct(productId: number): Observable<string> {
    return this.http.delete<string>(`${environment.urlAdmin}/delete-product/${productId}`);
  }

  updateProduct(productDTO: Product): Observable<Product> {
    return this.http.put<Product>(`${environment.urlAdmin}/update-product`, productDTO);
  }
  
  
}
