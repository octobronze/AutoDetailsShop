import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsersInfo } from './users/users-info';
import { UsersListComponent } from './usersList/usersList.component';

const routes: Routes = [
{
  path: 'home',
  component: HomeComponent
},
{
  path: 'auth/login',
  component: LoginComponent
},
{
  path: "auth/register",
  component: RegisterComponent
}
,
{
  path: "usersList",
  component: UsersListComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
