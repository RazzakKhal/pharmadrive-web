import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { LoginForm } from '../models/classes/login-form';
import { RegisterForm } from '../models/classes/register-form';
import { TokenResponse } from '../models/interfaces/token-response';
import { API_URL } from '../helpers/constantes';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly token = "token";

  constructor(private httpClient : HttpClient) { }

  login(loginForm : LoginForm) : Observable<TokenResponse>{
   return this.httpClient.post<TokenResponse>(`${API_URL}/auth/login`, loginForm).pipe(
    take(1)
  );
  }

  register(registerForm : FormData) : Observable<TokenResponse>{
    return this.httpClient.post<TokenResponse>(`${API_URL}/auth/register`, registerForm).pipe(
      take(1)
    );
  }

  getToken(){
    return localStorage.getItem(this.token);
  }

  setToken(token : string){
    localStorage.setItem(this.token ,token);
  }

  isAuthenticate(){
    // penser à ajouter la date de validité du token
    if(this.getToken()){
      const decoded = jwtDecode(this.getToken() as string)
      if(decoded.exp as number > (new Date().getTime())){
        localStorage.removeItem('token')
        return false;
      }
      return true;
    }
    return false;

  }
}
