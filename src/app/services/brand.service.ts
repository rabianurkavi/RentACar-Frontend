import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ItemResponseModel } from '../models/response/itemResponseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { ResponseModel } from '../models/response/responseModel';



@Injectable({
  providedIn: 'root'
})
export class BrandService {

  brand:Brand
  apiUrll="https://localhost:44332/api/"
  apiUrl="https://localhost:44332/api/carbrands/getall"
  constructor(private httpClient:HttpClient) { }
  getBrands():Observable<ListResponseModel<Brand>>
  {
      return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl);
  }
  getBrandById(brandId:number):Observable<ItemResponseModel<Brand>> {
    return this.httpClient.get<ItemResponseModel<Brand>>(this.apiUrll + "carbrands/getbyid?id=" + brandId);
  }
  add(brand:Brand){
    return this.httpClient.post(this.apiUrll+"carbrands/add",brand)
  }
  update(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.put<ResponseModel>(this.apiUrll+"carbrands/update",brand)
  }
  delete(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrll +"carbrands/delete",brand)
  }
  setCurrentBrand(brand: Brand) {
    this.brand = brand;
  }
  
  getCurrentBrand() {
    return this.brand;
  }
}
