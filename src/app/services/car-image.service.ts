import { HttpClient,HttpEvent,HttpErrorResponse,HttpEventType } from '@angular/common/http';
import { map } from  'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/car-image';
import { ListResponseModel } from '../models/response/listResponseModel';
import { ResponseModel } from '../models/response/responseModel';


@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  SERVER_URL: string = "https://file.io/";
  constructor(private httpClient:HttpClient) { }
   
  
  apiUrl="https://localhost:44332/api/"
  getCarImages(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl+"carimages/getimagescarbyid?carId="+carId
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }
  getCarImageByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    return this.httpClient
    .get<ListResponseModel<CarImage>>(this.apiUrl + 'images/getimagesbycarid?carId=' + carId)
  }
  add(carimage:CarImage):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"images/add",carimage)
  }
   upload(carimage:CarImage)
  {
    return this.httpClient.post<any>(this.SERVER_URL,carimage,{
      reportProgress:true,
      observe:'events'
    });
  }
  
}