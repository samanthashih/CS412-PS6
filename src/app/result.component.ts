import { Component, Input } from '@angular/core';

// @Component({
//   selector: 'app-result',
//   template: `
//     <div *ngIf="weather">
//       <div *ngIf="weatherFromCache; else weatherFromApi">Weather data retrieved from cache:</div>
//       <ng-template #weatherFromApi>Weather data retrieved from API:</ng-template>
//       <div *ngFor="let data of weather">{{ data | json }}</div>
//     </div>
//     <div *ngIf="!weather">No weather data to display.</div>
//   `
// })

@Component({
  selector: 'app-result',
  template: `
    \`
    <div *ngIf="weather">
      <div *ngIf="weatherFromCache; else weatherFromApi">Weather data retrieved from cache:</div>
      <ng-template #weatherFromApi>Weather data retrieved from API:</ng-template>
      <div *ngFor="let data of weather">{{ data | json }}</div>
    </div>
    <div *ngIf="!weather">No weather data to display.</div>
  `,
  styleUrls: ['./app.component.css']
})


export class ResultComponent {
  @Input() weather: any[] | undefined;
  @Input() weatherFromCache: boolean | undefined;
}
