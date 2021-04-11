import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/response/listResponseModel';
import { CarDetail } from '../models/car-detail';
import { ResponseModel } from '../models/response/responseModel';
import { Car } from '../models/car';
import { ItemResponseModel } from '../models/response/itemResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  car:Car;
  apiUrl="https://localhost:44332/api/"
  constructor(private httpClient:HttpClient) { }
  getCars():Observable<ListResponseModel<CarDetail>>
  {
     let newPath=this.apiUrl+"cars/getalldetails";
     return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDetail>>
  {
    let newPath=this.apiUrl+"cars/getbybrand?brandId="+brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarsByColor(colorId:number):Observable<ListResponseModel<CarDetail>>
  {
    let newPath=this.apiUrl+"cars/getbycolor?colorId="+colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarDetails(carId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getcardetail"
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }
  getByCarId(carId:number):Observable<ItemResponseModel<Car>>{
    let newPath = this.apiUrl +"cars/getbyid?carId="+carId
    return this.httpClient.get<ItemResponseModel<Car>>(newPath)
  }
  getCarDetail(carId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + 'cars/getcardetail?carId='+carId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }
  getCarDetailsColorAndBrand(brandId:number, colorId:number){
    let newPath = this.apiUrl + "cars/getcarsfilterdetails?brandId=" + brandId + "&colorId=" + colorId;
    return this.httpClient
      .get<ListResponseModel<CarDetail>>(newPath);
  }
  add(car:Car)
  {
    return this.httpClient.post(this.apiUrl+"cars/add",car);
  }
  update(car:Car):Observable<ResponseModel>{
    return this.httpClient.put<ResponseModel>(this.apiUrl+"cars/update",car)
  }
  setCurrentCar(car: Car) {
    this.car = car;
  }
  
  getCurrentCar() {
    return this.car;
  }
 
}
