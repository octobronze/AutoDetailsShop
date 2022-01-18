import { Component, OnInit } from '@angular/core';
import { RegisterInfo } from '../auth/register-info';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  form : any = {};
  registerInfo: RegisterInfo | undefined;
  isRegistered = false;
  isRegisterFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }


  ngOnInit() {
  }
  onSubmit(){
    console.log(this.form);

    this.registerInfo = new RegisterInfo(
      this.form.username,
      this.form.password, 
      this.form.firstName, 
      this.form.lastName);

    this.authService.register(this.registerInfo).subscribe( 
      data => {
        console.log(data);
        this.isRegistered = true;
        this.isRegisterFailed = false;
      },
      error => {
        console.log(error);
        this.isRegisterFailed = true;
      }
    );
  }

}
function data(data: any) {
  throw new Error('Function not implemented.');
}

