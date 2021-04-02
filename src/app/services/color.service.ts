import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ItemResponseModel } from '../models/response/itemResponseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { ResponseModel } from '../models/response/responseModel';


@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrll="https://localhost:44332/api/"
  apiUrl="https://localhost:44332/api/carcolors/getall"
  constructor(private httpClient:HttpClient) { }
  getColors():Observable<ListResponseModel<Color>>
  {
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl);
  }
  getColorById(colorId:number):Observable<ItemResponseModel<Color>>{
    return this.httpClient.get<ItemResponseModel<Color>>(this.apiUrll + "carcolors/getbyid?id="+colorId)
  }
  add(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrll+"carcolors/add",color)
  }
  update(color:Color):Observable<ResponseModel>{
    return this.httpClient.put<ResponseModel>(this.apiUrll+"carcolors/update",color)
  }
  delete(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrll + "carcolors/delete" ,color)
  }
}
