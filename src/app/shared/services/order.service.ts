import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../helpers/constantes';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient : HttpClient) { }


  createOrdonnance(formData: FormData) {
    return this.httpClient.post(`${API_URL}/home/prescription`, formData).pipe(
      take(1)
    )
  }

}
