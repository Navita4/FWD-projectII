import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/http';
import {CommomModule} from '@angular/common';
import {FlightSearchComponent} from './flightsearch.component';
import {FlightSearchRoutingModule} from './flightsearch-routing.module';
import {FlightSearchService} from './services/flightsearch.service';

@NgModule({
    imports:[
        CommomModule,
        FormsModule,
        FlightSearchRoutingModule
    ],
    declarations:[
        FlightSearchComponent
    ],
    providers:[
        FlightSearchService
    ]
})

export class FlightSearchModule{}