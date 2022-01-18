import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OffersInfo } from '../offers/offers-info';

const httpOptions = {
  headers: new HttpHeaders({'Content-type' : 'application/json'})
};
@Injectable({
  providedIn: 'root'
})


export class OffersService{

  private offersUrl = 'http://localhost:8080/api/offers/';


  getOffers(): Observable<OffersInfo[]>{
      return this.http.get<OffersInfo[]>(this.offersUrl);
  }

  addOffer(offer: any): Observable<OffersInfo>{
      return this.http.post<OffersInfo>(this.offersUrl, offer, httpOptions);
  }

  removeOffer(id: number): Observable<string>{
      return this.http.delete<string>(this.offersUrl + id.toString(), httpOptions);
  }

  setOffer(id: number, offersInfo: OffersInfo): Observable<OffersInfo>{
    return this.http.post<OffersInfo>(this.offersUrl + id.toString(), offersInfo, httpOptions);
  }

  constructor(private http: HttpClient) { 
    
  }
}