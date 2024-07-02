import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  private countryUrl = 'https://countriesnow.space/api/v0.1/countries/states'
  private countriesStatesUrl = 'https://countriesnow.space/api/v0.1/countries/states';
  //private countriesCitiesUrl = 'https://countriesnow.space/api/v0.1/countries/state/cities';
  constructor(private http: HttpClient) { }

  getCountries(): Observable<any> {
    return this.http.get<any>(this.countryUrl);
  }
  getStates(country: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { country: country };
    return this.http.post<any>(this.countriesStatesUrl, body, { headers: headers });
  }
 /* getCities(country: string, state: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { country: country, state: state };

    return this.http.post<any>(this.countriesCitiesUrl, body, { headers: headers });
  }
  */
}
