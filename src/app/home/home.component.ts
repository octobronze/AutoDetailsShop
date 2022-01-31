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
  putForm: any = {};
  filter: any = {};
  keyWord: string = '';
  editField: number = 0;
  deleteVisability: number = 0;
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
    const isOk = confirm("Are you sure?");
    if(isOk){
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
      alert("Offer has been deleted");
    }
  }

  toggleEdit(){
    this.toggledEdit = !this.toggledEdit;
  }

  async add(){
    const res = await this.offersService.addOffer(this.form).toPromise();
    if(res != undefined){
      this.offers?.add(new OffersInfo(res.id, res.detailId, res.carBrand, res.carModel, res.price));
      alert("Offer has been added");
    }
  }
  
  doFilter(){
    this.keyWord = this.filter.keyWord;
  }

  setValues(id: number, detailId: number, carBrand: string, carModel: string, price: DoubleRange){
    this.editField = id;
    this.putForm.detailId = detailId;
    this.putForm.carBrand = carBrand;
    this.putForm.carModel = carModel;
    this.putForm.price = price;
  }

  putEditField(id: number){
    this.hideDeleteButton();
    if(this.editField == 0){
      return;
    }
    console.log(this.editField);
    this.editField = 0;
    const editOffer = new OffersInfo(id, this.putForm.detailId, this.putForm.carBrand, this.putForm.carModel, this.putForm.price);
    console.log(editOffer);
    this.offersService.setOffer(editOffer).subscribe(
      data =>{
        this.offers?.change(editOffer);
        console.log(data);
        alert("Offer has been changed");
      },
      error =>{
        console.log(error);
      }
      
    )
  }

  showDeleteButton(value: number){
    this.deleteVisability = value;
  }

  hideDeleteButton(){
    this.deleteVisability = 0;
  }

}
