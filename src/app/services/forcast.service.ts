import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForcastService {

  constructor(private http: HttpClient) { }

  LoadForecastWeather(zip: any): Observable<any> {
    return this.http.get('https://api.openweathermap.org/data/2.5/forecast?zip=' + zip + ',za&APPID=98965abafd40da94713ae71f167fa8de&units=imperial' );
  }

  LoadCurrentWeather(zip: any): Observable<any> {
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',za&APPID=98965abafd40da94713ae71f167fa8de&units=imperial' );
  }

  // degrees
  LoadForecastWeather2(zip: any): Observable<any> {
    return this.http.get('https://api.openweathermap.org/data/2.5/forecast?zip=' + zip + ',za&APPID=98965abafd40da94713ae71f167fa8de&units=metric ' );
  }

  LoadCurrentWeather2(zip: any): Observable<any> {
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',za&APPID=98965abafd40da94713ae71f167fa8de&units=metric ' );
  }
}
