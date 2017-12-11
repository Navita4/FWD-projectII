import {FlightSearchComponent} from './flightsearch.component';
import {Flight} from './models/flight';
import {Airport} from './models/airport';
import {FlightSearchService} from './flightSearch.service';
import {async,componentFixture,TestBed,fakeAsync} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {Observable} from 'rxjs/observable';
import 'rxjs/add/observable/of';

describe("Flight Search Component",function(){
    let comp:FlightSearchComponent;
    let fixture:ComponentFixture<FlightSearchComponent>;
    beforeEach(async()=>{
        TestBed.configureTestingModule({
            imports:[
                FormsModule
            ],
            declarations:[
                FlightSearchComponent
            ],
            providers:[
                {provide:FlightSearchService, useClass:FlightSearchServiceMock
                }
            ]
        })
        .compileComponents();
    })
})
beforeEach(()=>{
    fixture=TestBed.createComponent(FlightSearchComponent);
    comp=fixture.componentInstance;
    fixture.detectChanges();
})
it('Should create component',()=>expect(component).toBeDefined());
it('Should validate default dropdown values',()=>{
    expect(comp.airportSelectionFrom).toBe("JOHA");
    expect(comp.airportSelectionTo).toBe("CAPE");
})
it('Should validate data retrieval',()=>{
    expect(comp.currentAirports[0].Code).toBe("JOHA");
    expect(comp.currentAirports[0].Name).toBe("Johannesburg");
    expect(comp.currentAirports[0].To).toBe("CAPE");
    expect(comp.currentAirports[0].From).toBe("JOHA");
    expect(comp.currentAirports[0].FlightNumber).toBe(1000);
    expect(comp.currentAirports[0].Departs).toBe("6:00 PM");
    expect(comp.currentAirports[0].Arrieves).toBe("8:00 PM");
    expect(comp.currentAirports[0].MainCabinPrice).toBe(100);
    expect(comp.currentAirports[0].FirstClassPrice).toBe(200);
})
it('Should validate choosing a flight',()=>{
    comp.chooseFlight();
    expect(comp.currentSearchSelection).toEqual([{
        From:"JOHA",TO:"CAPE",FlightNumber:1000,Departs:"6:00 PM",Arrieves:"8:00 PM",MainCabinPrice:100,FirstClassPrice:200},
        From:"JOHA",TO:"CAPE",FlightNumber:1001,Departs:"7:00 PM",Arrieves:"9:00 PM",MainCabinPrice:110,FirstClassPrice:190}
    ]);
})
it('Should validate the sorting functionality',()=>{
    comp.chooseFlight();
    comp.SortBy("Departs");
    expect(comp.currentSearchSelection.toEqual([{
        From:"JOHA",TO:"CAPE",FlightNumber:1000,Departs:"6:00 PM",Arrieves:"8:00 PM",MainCabinPrice:100,FirstClassPrice:200},
        From:"JOHA",TO:"CAPE",FlightNumber:1001,Departs:"7:00 PM",Arrieves:"9:00 PM",MainCabinPrice:110,FirstClassPrice:190}
    ]);
    comp.SortBy("FlightNumber");
    expect(comp.currentSearchSelection.toEqual([{
        From:"JOHA",TO:"CAPE",FlightNumber:1000,Departs:"6:00 PM",Arrieves:"8:00 PM",MainCabinPrice:100,FirstClassPrice:200},
        From:"JOHA",TO:"CAPE",FlightNumber:1001,Departs:"7:00 PM",Arrieves:"9:00 PM",MainCabinPrice:110,FirstClassPrice:190}
    ]);
    comp.SortBy("Arrieves");
    expect(comp.currentSearchSelection.toEqual([{
        From:"JOHA",TO:"CAPE",FlightNumber:1000,Departs:"6:00 PM",Arrieves:"8:00 PM",MainCabinPrice:100,FirstClassPrice:200},
        From:"JOHA",TO:"CAPE",FlightNumber:1001,Departs:"7:00 PM",Arrieves:"9:00 PM",MainCabinPrice:110,FirstClassPrice:190}
    ]);
    comp.SortBy("MainCabinPrice");
    expect(comp.currentSearchSelection.toEqual([{
        From:"JOHA",TO:"CAPE",FlightNumber:1000,Departs:"6:00 PM",Arrieves:"8:00 PM",MainCabinPrice:100,FirstClassPrice:200},
        From:"JOHA",TO:"CAPE",FlightNumber:1001,Departs:"7:00 PM",Arrieves:"9:00 PM",MainCabinPrice:110,FirstClassPrice:190}
    ]);
    comp.SortBy("FirstClassPrice");
    expect(comp.currentSearchSelection.toEqual([{
        From:"JOHA",TO:"CAPE",FlightNumber:1000,Departs:"6:00 PM",Arrieves:"8:00 PM",MainCabinPrice:100,FirstClassPrice:200},
        From:"JOHA",TO:"CAPE",FlightNumber:1001,Departs:"7:00 PM",Arrieves:"9:00 PM",MainCabinPrice:110,FirstClassPrice:190}
    ]);

}

export class FlightSearchServiceMock{
    getFlights():Observable<Flight[]>{
        return Observable.of([{
            From:"JOHA",
            To:"CAPE",
            FlightNumber:1000,
            Departs:"6:00PM",
            Arrieves:"8:00 PM",
            MainCabinPrice:100,
            FirstClassPrice:200
        }])
        {
            From:"JOHA",
            To:"CAPE",
            FlightNumber:1001,
            Departs:"7:00PM",
            Arrieves:"9:00 PM",
            MainCabinPrice:110,
            FirstClassPrice:190

        }

    getAirports():Observable<Airport[]>{
        return Observable.of([{
            Code:"JOHA",
            Name:"Johannesburg"
        }])
    }
    {
        Code:"CAPE",
        Name:"Cape Town"
    }