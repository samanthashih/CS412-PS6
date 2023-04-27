import { Component } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-parent',
  template: `
    <app-form (query)="getWeather($event)"></app-form>
    <app-result [weather]="weather" [weatherFromCache]="weatherFromCache"></app-result>
  `,
  providers: [WeatherService]
})
export class ParentComponent {
  weather: any[] | undefined;
  weatherFromCache: boolean | undefined;

  constructor(private weatherService: WeatherService) {}

  getWeather(cityName: string) {
    this.weatherService.getWeather(cityName).subscribe((data: any) => {
      this.weather = Array(3).fill(data); // Duplicate data 3x for *ngFor
      this.weatherFromCache = data.fromCache;
    });
  }
}
