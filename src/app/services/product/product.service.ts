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
}
