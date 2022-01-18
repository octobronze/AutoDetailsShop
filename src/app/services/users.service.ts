import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UsersInfo } from '../users/users-info';



const httpOptions = {
  headers: new HttpHeaders({'Content-type' : 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = 'http://localhost:8080/api/users/';


  getUsers(): Observable<UsersInfo[]>{
      return this.http.get<UsersInfo[]>(this.usersUrl);
  }

  addUser(user: any): Observable<UsersInfo>{
      return this.http.post<UsersInfo>(this.usersUrl, user, httpOptions);
  }

  removeUser(id: number): Observable<string>{
      return this.http.delete<string>(this.usersUrl + id.toString(), httpOptions);
  }

  setUSer(id: number, usersInfo: UsersInfo): Observable<UsersInfo>{
    return this.http.post<UsersInfo>(this.usersUrl + id.toString(), usersInfo, httpOptions);
  }

  constructor(private http: HttpClient) { 
    
  }
}
