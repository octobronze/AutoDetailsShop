import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { OffersInfo } from '../offers/offers-info';
import { OffersStorageInfo } from '../offers/offers-storage-info';
import { OffersService } from '../services/offers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  info: any;
  offers: OffersStorageInfo | undefined;
  errorMessage = '';
  toggledEdit = false;
  form: any = {};
  filter: any = {};
  keyWord: string = '';
  constructor(private token: TokenStorageService, private offersService: OffersService, private http: HttpClient) { }

  ngOnInit(): void {
    
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      role: this.token.getRole()
    };

    this.offersService.getOffers().subscribe(
      data => {
        console.log(data);
        console.log(data[0].id);
        this.offers = new OffersStorageInfo(data);
        console.log(this.offers.getOffers(this.keyWord).length);
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
    this.offersService.removeOffer(id).subscribe(
      data => {
        console.log(id);
        this.offers?.remove(id);
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  toggleEdit(){
    this.toggledEdit = !this.toggledEdit;
  }

  add(){
    this.offersService.addOffer(this.form).subscribe(
      data =>{
        console.log(this.form);
        console.log(data);
        this.offers?.add(new OffersInfo(data.id, data.detailId, data.carBrand, data.carModel, data.price));
        console.log(this.offers);
      },
      error =>{
        console.log(error);
      }
      
    )
  }
  
  doFilter(){
    this.keyWord = this.filter.keyWord;
  }
}
