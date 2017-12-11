import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import {FlightSearchComponent} from './flightSearch.component';

const routes:Routes=[{
    path:'',component:FlightSearchComponent
}]

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ]
})

export class FlightSearchRoutingModule{}