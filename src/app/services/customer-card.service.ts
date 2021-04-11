import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card';
import { CustomerCard } from '../models/customer-card';
import { ListResponseModel } from '../models/response/listResponseModel';
import { ResponseModel } from '../models/response/responseModel';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerCardService {

  apiUrl='https://localhost:44332/api/customercards'
  constructor(private httpClient:HttpClient,
    private authService:AuthService) { }
  saveCard(payment:Card):Observable<ResponseModel>{
    let customerCreditCard:CustomerCard = {customerId:this.authService.currentUserId,cardId:payment.id}
    let newPath = this.apiUrl +"/add"
    return this.httpClient.post<ResponseModel>(newPath,customerCreditCard)
  }
  getByCustomerId(customerId:number):Observable<ListResponseModel<CustomerCard>>{
    let newPath = this.apiUrl + "/getbycustomerid?customerId="+customerId
    return this.httpClient.get<ListResponseModel<CustomerCard>>(newPath)
  }
}
