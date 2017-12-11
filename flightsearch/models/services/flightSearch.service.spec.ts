import {async,Inject,TestBed,fakeAsync} from '@angular/core/testing';
import {HttpModule,XHRBackend,Response,ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {FlightSearchService} from './flightSearch.service';

describe('Flight Search Service',function(){
    beforeEach(async(()=>{
        TestBed.configureTestingModule({

            imports:[
                HttpModule
            ],
            providers:[
                FlightSearchService,
                {provide:XHRBackend,useClass:MockBackend}
            ]
        })
    }))

})
it('Should validate flight data retrieval functionality',async(inject([FlightSearchService,XHRBackend],(FlightSearchService,MockBackend)=>{
    MockBackend.connections.subscribe(connection)=>{
        connection.mockRespond(new Response(new ResponseOptions({
            body:JSON.stringify(flightResponseMock())
        })))
    }
});
FlightSearchService.getFlights().subscribe(flight)=>{

    expect(flight[0].From).toBe("JOHA");
    expect(flight[0].To).toBe("CAPE");
    expect(flight[0].FlightNumber).toBe(1000);
    expect(flight[0].Departs).toBe("6.00 PM");
    expect(flight[0].Arrives).toBe("8.00 PM");
    expect(flight[0].MainCabinPrice).toBe(100);
    expect(flight[0].FirstClassPrice).toBe(200);

}
it('Should validate airport data retrieval functionality',async(
    Inject([FlightSearchService,XHRBackend],(FlightSearchService,MockBackend)=>{
        MockBackend.connections.subscribe(connection)=>{
            connection.mockRespond(new Response(new ResponseOptions({
                body:JSON.stringify(airportResponseMock())
            })))
        }
    });
    FlightSearchService.getAirport().subscribe(airport)=>{
        expect(airport[0].Code).toBe("JOHA");
        expect(airport[0].Name).toBe("Johannesburg");
    }
)
function flightResponseMock():object{
    return [{
        from:"JOHA",
        To:"CAPE",
        FlightNumber:1000,
        Departs:"6:00 PM",
        Arrives:"8.00 PM",
        MainCabinPrice:100,
        FirstClassPrice:200
    }]
}
function AirportResponseMock():object{
    return[{
        Code:"JOHA",
        Name:"Johannesburg"
    }]
}