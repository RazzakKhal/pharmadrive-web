import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { API_URL } from '../helpers/constantes';
import { Pharmacy } from '../models/interfaces/pharmacy';

@Injectable({
  providedIn: 'root'
})
export class PharmacyService {

  constructor(private httpClient : HttpClient) { }

  getAllPharmacies() : Observable<Pharmacy[]>{
    return this.httpClient.get<Pharmacy[]>(`${API_URL}/pharmacy`).pipe(
      take(1)
    );
  }

  getPharmacy(id : number) : Observable<Pharmacy>{
    return this.httpClient.get<Pharmacy>(`${API_URL}/pharmacy/${id}`).pipe(
      take(1)
    );
  }
}
