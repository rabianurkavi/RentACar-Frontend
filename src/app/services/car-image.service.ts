import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarImage } from '../models/carImage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl="https://localhost:44332/api/"
  constructor(private httpClient:HttpClient) { }

    getCarImages(carId:number):Observable<ListResponseModel<CarImage>>
    {
    let newPath =this.apiUrl+"carImages/getimagesbycarid?carId="
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath+carId)
    }
}