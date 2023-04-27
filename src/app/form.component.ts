import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-form',
  template: `
    <form (ngSubmit)="onSubmit()">
      <label>
        City Name
        <input type="text" [(ngModel)]="cityName" name="queryTerm" required minlength="2">
      </label>
      <button type="submit" [disabled]="!isValid()">Query</button>
    </form>
  `
})
export class FormComponent {
  cityName = '';

  @Output() query = new EventEmitter<string>();

  onSubmit() {
    this.query.emit(this.cityName);
  }

  isValid() {
    return this.cityName.length >= 2;
  }
}
