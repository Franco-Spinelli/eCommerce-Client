import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../../models';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getAllAddresses(): Observable<Address[]>{
    return this.http.get<Address[]>(environment.urlApi + "/user/get-addresses");
  }
}
