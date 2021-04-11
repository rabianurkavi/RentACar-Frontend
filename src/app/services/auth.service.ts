import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemResponseModel } from '../models/response/itemResponseModel';
import { LoginModel } from '../models/response/loginModel';
import { RegisterModel } from '../models/response/registerModel';
import { TokenModel } from '../models/response/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl='https://localhost:44332/api/auth/'
  constructor(private httpClient:HttpClient) { }

  login(loginModel:LoginModel){
    return this.httpClient.post<ItemResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
  }
  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else
    {
      return false;
    }
  }
  register(registerModel:RegisterModel){
    return this.httpClient.post<ItemResponseModel<TokenModel>>(this.apiUrl+"register",registerModel);
  }

}
