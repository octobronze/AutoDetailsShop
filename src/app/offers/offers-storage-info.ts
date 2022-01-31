import { OffersInfo } from "./offers-info";

export class OffersStorageInfo{

    offers: OffersInfo[];
    filtredOffers: OffersInfo[] = [];

    constructor(offers: OffersInfo[]){
        this.offers = offers;
    }

    add(offer: OffersInfo){
        this.offers.push(offer);
    }

    remove(id: number){
        const index = this.findById(id);
        if(index != -1){
            this.offers.splice(index, 1);
        }
    }

    findById(id: number){
        for(var i = 0; i < this.offers.length; i ++){
            if(this.offers[i].id == id){
                return i;
            }
        }
        return -1;
    }

    change(offer: OffersInfo){
        const index = this.findById(offer.id);
        if(index != -1){
            this.offers[index] = offer;
        }
    }

    getById(id: number){
        return this.offers[id];
    }

    getOffers(keyWord: string){
        if(keyWord == ''){
            return this.offers;
        }
        return this.offers.filter(offer => this.isOk(offer, keyWord));
    }

    setOffers(offers: OffersInfo[]){
        this.offers = offers;
    }

    isOk(offer: OffersInfo, keyWord: string){
        return offer.carBrand.includes(keyWord) ||
                offer.carModel.includes(keyWord) ||
                offer.price.toString().includes(keyWord);
    }
}