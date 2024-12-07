import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DateComponent } from './layout/navbar/search-navbar/date/date.component';
import { AppRoutingModule } from './app.routes';

@NgModule({
  declarations: [
    DateComponent, // Declare DateComponent here
    // other components
  ],
  imports: [
    BrowserModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }), // Import CalendarModule here
    AppRoutingModule, // Import AppRoutingModule here
    // other modules
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
