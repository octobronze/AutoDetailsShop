export class OffersInfo{
    id: number;
    detailId: number;
    carBrand: string;
    carModel: string;
    price: DoubleRange;

    constructor(id: number, detailId: number, carBrand: string, carModel: string, price: DoubleRange){
        this.id = id;
        this.detailId = detailId;
        this.carBrand = carBrand;
        this.carModel = carModel;
        this.price = price;                
    }
}