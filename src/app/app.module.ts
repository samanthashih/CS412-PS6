import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {ResultComponent} from "./result.component";
import {FormComponent} from "./form.component";
import {ParentComponent} from "./parent.component";

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ResultComponent,
    ParentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
