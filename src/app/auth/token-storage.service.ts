import { Injectable } from '@angular/core';
import { windowWhen } from 'rxjs';


const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const ROLE_KEY = 'AuthRole';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private role: string | undefined;
  constructor() { }

  signOut(){
    window.sessionStorage.clear();
  }

  public saveToken(token: string){
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken() : string | null{
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string){
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }
  public getUsername(): string | null {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public saveRole(role: string){
    window.sessionStorage.removeItem(ROLE_KEY);
    window.sessionStorage.setItem(ROLE_KEY, role);
  }

  public getRole() : string | null{
    return sessionStorage.getItem(ROLE_KEY);
  }
}
