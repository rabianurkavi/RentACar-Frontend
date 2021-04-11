export interface Card{
    id?:number;
    nameOnTheCard:string;
    cardNumber:string;
    cvv:string;
    expirationDate:string;
    moneyInTheCard?:number;
}