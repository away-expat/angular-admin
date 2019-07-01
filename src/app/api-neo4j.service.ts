import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from './token.model';
import { Info } from './info.model';
import { Country } from './country.model';
import { City } from './city.model';
import { Activity } from './activity.model';

@Injectable({
  providedIn: 'root'
})
export class ApiNeo4jService {
  constructor(private http: HttpClient) { }

  login(mail: string, password: string): Observable<Token> {
    let body = {
      mail : mail,
      password : password
    }

    return this.http.post<Token>('http://51.75.122.187:3000/auth/login', body);
  }

  // City & Country

  getCountry(token: string): Observable<Country> {
    return this.http.get<Country>('http://51.75.122.187:3000/cities/allCountry', {
      headers: new HttpHeaders({
        'Authorization': token
      }),
    });
  }

  getCity(name: string): Observable<City> {
    return this.http.get<City>('http://51.75.122.187:3000/cities/getCityByName/' + name);
  }

  // Activity

  getActivity(token: string, name: string, location: string): Observable<Activity> {
    return this.http.get<Activity>('http://51.75.122.187:3000/activities/rechercheAngular/' + name + '/' + location, {
      headers: new HttpHeaders({
        'Authorization': token
      }),
    });
  }

  // Event

  getEvent(token: string): Observable<Event> {
    return this.http.get<Event>('http://51.75.122.187:3000/events/getPromotedEvent/' , {
      headers: new HttpHeaders({
        'Authorization': token
      }),
    });
  }

  postEvent(token: string, body): Observable<Event> {
    return this.http.post<Event>('http://51.75.122.187:3000/events/promotedEvent/', body , {
      headers: new HttpHeaders({
        'Authorization': token
      }),
    });
  }
  
  putEvent(token: string, body): Observable<Info> {
    return this.http.put<Info>('http://51.75.122.187:3000/events/', body,{
      headers: new HttpHeaders({
        'Authorization': token
      }),
    });
  }
  
  deleteEvent(token: string, id: number): Observable<void> {
    return this.http.delete<void>('http://51.75.122.187:3000/events/' + id, {
      headers: new HttpHeaders({
        'Authorization': token
      }),
    });
  }
  
  
  
  // Info

  getInfo(token: string, country: string): Observable<Info> {
    return this.http.get<Info>('http://51.75.122.187:3000/infos/byCountry/' + country, {
      headers: new HttpHeaders({
        'Authorization': token
      }),
    });
  }

  postInfo(token: string, body: Info): Observable<Info> {
    return this.http.post<Info>('http://51.75.122.187:3000/infos/', body,{
      headers: new HttpHeaders({
        'Authorization': token
      }),
    });
  }

  putInfo(token: string, body: Info): Observable<Info> {
    return this.http.put<Info>('http://51.75.122.187:3000/infos/', body,{
      headers: new HttpHeaders({
        'Authorization': token
      }),
    });
  }
  
  deleteInfo(token: string, id: number): Observable<void> {
    return this.http.delete<void>('http://51.75.122.187:3000/infos/' + id, {
      headers: new HttpHeaders({
        'Authorization': token
      }),
    });
  }


  

  


}
