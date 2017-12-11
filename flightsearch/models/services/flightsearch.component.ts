import {Component,OnInit} from '@angular/core';
import {Observable} from 'rxjs/observable';
import {FlightSearchService} from './services/flightsearch.service';
import {Flight} from './models/flight';
import {Airport} from './models/airport';

@Component({
    selector:'flightsearch-component',
    templateUrl:'./flightsearch.component.html'
})

export class FlightSearchComponent implements OnInit{
    constructor(private flightsearch:FlightSearchService){
        currentAirports:Array<Airport>=new Array<Airport>();
        currentFlights:Array<Flight>=new Array<Flight>();
        airportSelectionFrom:any;
        airportSelectionTo:any;
        differentSelection:boolean=true;
        hideResultsDataTable:boolean=true;
        currentSearchSelection:any;
        ngOnInit(){
            // Initial Data retrieval
            this.flightsearch.getFlight()
            .subscribe(flightResponse=>{
                this.currentFlights=flightResponse;
            },
            error=>{
                console.log("Error getting flights:"+error);
            }
            });
            this.flightsearch.getAirports()
            .subscribe(airportResponse=>{
                this.currentAirports=airportResponse;
            }),error=>{
                console.log("Error getting Airports:"+error);

            }

            // Default dropdown selection
            this.airportSelectionFrom="JOHA";
            this.airportSelectionTo="CAPE";
        }
        chooseFlight(){
            if(this.airportSelectionFrom===this.airportSelectionTo){
                this.differentSelection=false;
                this.hideResultDataTable=true;
            }
            else{
                this.differentSelection=true;
            }
            // set current search criteria
            this.currentSearchSelection=this.currentFlights.filter(flights=>
                (flights.From===this.airportSelectionFrom&&flights.To===this.airportSelectionTo));
                this.hideResultsDataTable=false;
        }
    }
    sortBy(type:string){
        // sort list ascending
        switch(type){
            case "FlightNumber":this.currentSearchSelection=this.currentSearchSelection.sort(departsA,departsB)=>{
                if(departsA.FlightNumber>departsB.FlightNumber){
                    return 1;
                }
                else{
                    return 0;
                }
            }
            break;
            case "Departs";
            default:
            this.currentSearchSelection=this.currentSearchSelection.sort((departsA,departsB)=>{
                let departingA=new Date();
                let departingB=new Date();
                
                departingA.setHours(departsA.Departs.substr(0,1),departsA.Departs.substr(2,2));
                departingB.setHours(departsA.Departs.substr(0,1),departsA.Departs.substr(2,2));

                if(departingA<departingB){
                    return -1;


                }
                else{
                    return 0;
                }

            })
            break;
            case "Arrieves":
            this.currentSearchSelection=this.currentSearchSelection.sort((departsA,departsB)=>{
                let arrievingA=new Date();
                let arrievingB=new Date();

                arrievingA.setHours(departsA.Departs.substr(0,1),departsA.Departs.substr(2,2));
                arrievingB.setHours(departsA.Departs.substr(0,1),departsA.Departs.substr(2,2));

                if(arrievingA<arrievingB){
                    return -1;


                }
                else if(arrievingA>arrievingB){
                    return 1;
                }
                else{
                    return 0;
                }
            })
            break:
            case "MainCabinPrice":
            this.currentSearchSelection=this.currentSearchSelection.sort(departsA,departsB)=>{
                if(departsA.FirstClassprice<departsB.FirstClassprice){
                    return -1;
                }
                else if(departsA.FirstClassprice>departsB.FirstClassprice){
                    return 1;

                }
                else{
                    return 0;
                }
            })
            break;
        }
    }
}