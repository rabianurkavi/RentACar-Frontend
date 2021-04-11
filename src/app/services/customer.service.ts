import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { RealCustomer } from '../models/real-customer';
import { ItemResponseModel } from '../models/response/itemResponseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { ResponseModel } from '../models/response/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl="https://localhost:44332/api/customers/getalldetails"
  apiUrll="https://localhost:44332/api/customers/"
  constructor(private httpClient:HttpClient) { }
  getCustomers():Observable<ListResponseModel<Customer>>
  {
       return this.httpClient.get<ListResponseModel<Customer>>(this.apiUrl);
  }
  getCustomerId(userId:number):Observable<ItemResponseModel<RealCustomer>>{
    let newPath = this.apiUrll + "getbyuserid?userId=" + userId
    return this.httpClient.get<ItemResponseModel<RealCustomer>>(newPath)
  }
  Update(customer:Customer):Observable<ResponseModel>{
    let newPath = this.apiUrl + "update"
    return this.httpClient.post<ResponseModel>(newPath,customer)
  }
}
