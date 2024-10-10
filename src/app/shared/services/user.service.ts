import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../helpers/constantes';
import { take } from 'rxjs';
import { User } from '../models/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  constructor(private httpClient : HttpClient) { }

  getUser(){
    return this.httpClient.get<User>(`${API_URL}/auth/me`).pipe(
      take(1)
    )
  }


}
