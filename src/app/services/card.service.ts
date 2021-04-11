import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card';
import { ItemResponseModel } from '../models/response/itemResponseModel';

import { ListResponseModel } from '../models/response/listResponseModel';
import { ResponseModel } from '../models/response/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  
  constructor(private httpClient: HttpClient) { }

  apiUrl = 'https://localhost:44332/api/cards/';

  isCardExist(payment:Card):Observable<ResponseModel>{
    let newPath = this.apiUrl + "iscardexist"
    console.log("pepepe")
    return this.httpClient.post<ResponseModel>(newPath,payment);
  }

  getCardByNumber(cardNumber:string):Observable<ListResponseModel<Card>>{
    let newPath = this.apiUrl + "getbycardnumber?cardnumber=" + cardNumber
    return this.httpClient.get<ListResponseModel<Card>>(newPath);
  }

  updateCard(payment:Card):Observable<ResponseModel>{
    let newPath = this.apiUrl + "update"
    return this.httpClient.post<ResponseModel>(newPath,payment)
  }
  getCardById(id:number):Observable<ItemResponseModel<Card>>{
    let newPath = this.apiUrl +"getbyid?id="+id
    return this.httpClient.get<ItemResponseModel<Card>>(newPath)
  }
  getAllCards():Observable<ListResponseModel<Card>>{
    let newPath=this.apiUrl+"getall";       return this.httpClient.get<ListResponseModel<Card>>(newPath);
  }

  addCard(card:Card):Observable<ResponseModel>{
    let newPath=this.apiUrl+"addcard";       return this.httpClient.post<ResponseModel>(newPath,card);
  }

  deleteCard(card:Card):Observable<ResponseModel> {
    let newPath=this.apiUrl+"deletecard";    return this.httpClient.post<ResponseModel>(newPath,card);
  }

  getCardsByCustomerId(customerId:number):Observable<ListResponseModel<Card>>{
    let newPath=this.apiUrl+"getcardsbycustomerid?customerid="+customerId;
  return this.httpClient.get<ListResponseModel<Card>>(newPath);}


}
