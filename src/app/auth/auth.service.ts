import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { LoginRequest } from './loginRequest';
import { environment } from '../../environments/environment';
import { RegisterRequest } from './registerRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentLoginOn:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  currentUserData:BehaviorSubject<String>=new BehaviorSubject<String>('');
  constructor(private http: HttpClient) { 
    this.currentLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
    this.currentUserData = new BehaviorSubject<String>(sessionStorage.getItem("token")||"");
  }
  login(credentials: LoginRequest):Observable<any>{
    return this.http.post<any>(environment.urlHost + "auth/login",credentials).pipe(
      tap((userData)=>{
        sessionStorage.setItem("token",userData.token);
        this.currentUserData.next(userData.token);
        this.currentLoginOn.next(true);
      }),
      map((userData)=>userData.token),
      catchError(this.hadleError)
    )
   }
   register(credentials: RegisterRequest):Observable<any>{
    return this.http.post<any>(environment.urlHost + "auth/signup",credentials).pipe(
      tap((userData)=>{
        sessionStorage.setItem("token",userData.token);
        this.currentUserData.next(userData.token);
        this.currentLoginOn.next(true);
      }),
      map((userData)=>userData.token),
      catchError(this.hadleError)
    )
   }
   logOut(): void{
    sessionStorage.removeItem("token");
    this.currentLoginOn.next(false);
   }
   private hadleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Error',error.error)
    }else{
      console.error("backend returned the status code ", error)
    }
    return throwError(()=> new Error('Something is wrong, please try again'));
  }
  get userData():Observable<String>{
    return this.currentUserData.asObservable();
  }
  get userLoginOn(): Observable<boolean>{
    return this.currentLoginOn.asObservable();
  }
  get userToken():String{
    return this.currentUserData.value;
  }
  public isUserLoggedIn(): boolean{
    if(this.userToken == "") return false;
    return true;
  }

}
