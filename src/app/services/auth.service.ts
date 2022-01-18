import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtResponse } from '../auth/jwt-response';
import { AuthLoginInfo } from '../auth/login-info';
import { RegisterInfo } from '../auth/register-info';

const httpOptions = {
  headers: new HttpHeaders({'Content-type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private loginUrl = 'http://localhost:8080/api/auth/login';
  private registerUrl = 'http://localhost:8080/api/auth/registration';

  attemptAuth(authLoginInfo: AuthLoginInfo): Observable<jwtResponse>{
    return this.http.post<jwtResponse>(this.loginUrl, authLoginInfo, httpOptions);
  }

  register(registerInfo: RegisterInfo): Observable<string>{
    return this.http.post<string>(this.registerUrl, registerInfo, httpOptions);
  }
  constructor(private http: HttpClient) { }
}
