import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private API_URL = 'http://localhost:3000/api/weather';

  constructor(private http: HttpClient) { }

  getWeather(cityName: string): Observable<any> {
    return this.http.post<any>(this.API_URL, { city: cityName });
  }
}
