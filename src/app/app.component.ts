import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_KEY } from "./api-keys";

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="dataAvailable">
      <h1>Weather Information for {{ cityName }}</h1>
      <ul>
        <li *ngFor="let weather of weatherData">
          {{ weather.dt_txt }}: {{ weather.main.temp }}°C, {{ weather.weather[0].description }}
        </li>
      </ul>
    </div>
    <button (click)="fetchData()">Fetch Data</button>
  `,
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  weatherData: any[] = [];
  dataAvailable = false;
  cityName: any;

  constructor(private http: HttpClient) {}
  ngOnInit() {}

  fetchData() {
    this.http.get<any>(`https://api.openweathermap.org/data/2.5/forecast?q=${this.cityName}&appid=${API_KEY}&units=metric`)
      .subscribe(response => {
        this.weatherData = response.list;
        this.dataAvailable = true;
      });
  }
}
