import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { UsersService } from '../services/users.service';
import { UsersStorageInfo } from '../users/users-storage-info';


@Component({
  selector: 'app-home',
  templateUrl: './usersList.component.html',
  styleUrls: ['./usersList.component.css']
})
export class UsersListComponent implements OnInit {
  info: any;
  users: UsersStorageInfo | undefined;
  
  constructor(private token: TokenStorageService, private usersService: UsersService, private http: HttpClient) { }

  ngOnInit(): void {
    
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      role: this.token.getRole()
    };

    this.usersService.getUsers().subscribe(
      data => {
        console.log(data);
        console.log(data[0].id);
        this.users = new UsersStorageInfo(data);
        console.log(this.users.getUsers().length);
      },
      error => {
        console.log(error);
      }
      
    )

  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }

  delete(id: number){
    console.log(id);
    this.usersService.removeUser(id).subscribe(
      data => {
        console.log(id);
        this.users?.remove(id);
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }
  
}
