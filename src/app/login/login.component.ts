 import { Component, OnInit } from '@angular/core';
import { AuthLoginInfo } from '../auth/login-info';
import { TokenStorageService } from '../auth/token-storage.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: string | null | undefined;
  username: string | null | undefined;

  private loginInfo: AuthLoginInfo | undefined;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) {
   }


  ngOnInit(){
    if(this.tokenStorage.getToken()){
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getRole();
      this.username = this.tokenStorage.getUsername();
    }
  }

  onSubmit(){
    console.log('text this form');
    console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password
    );

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {

        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveRole(data.role);
        this.tokenStorage.saveUsername(data.username);

        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.role = this.tokenStorage.getRole();
        this.username = this.tokenStorage.getUsername();
        this.reloadPage();
      },
      error => {
        console.log(error);
        this.isLoginFailed = true;
      }
      
    )
  }

  reloadPage(){
    window.location.reload();
  }

}
