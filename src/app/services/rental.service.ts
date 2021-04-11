import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/response/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rental-detail';
import { ResponseModel } from '../models/response/responseModel';


@Injectable({
  providedIn: 'root'
})
export class RentalService {
  rental:Rental;

  apiUrl="https://localhost:44332/api/rentals/getalldetails"
  apiUrll="https://localhost:44332/api/rentals/"
  constructor(private httpClient:HttpClient) { }
  getAllRentalDetail():Observable<ListResponseModel<RentalDetail>> {
    let newPath = this.apiUrll + "getallrentaldetails"
    return this.httpClient
      .get<ListResponseModel<RentalDetail>>(this.apiUrl);
  }

  getRentalsByCarId(carId:number):Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrll + "getallbycarid?=" + carId
    return this.httpClient
    .get<ListResponseModel<Rental>>(newPath);
  }
  
  addRental(rental:Rental){
    let newPath = this.apiUrll + "add"
    this.httpClient.post(newPath,rental).subscribe()
  }

  getLastByCarId(carId:number):Observable<Rental>{
    let newPath = this.apiUrll + "getlastbycarid?carId=" + carId
    return this.httpClient.get<Rental>(newPath);
  }

  isRentable(rental:Rental):Observable<ResponseModel>{
    let newPath = this.apiUrll + "isrentable"
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }
  getRentingCar() {
    return this.rental;
  }
}
