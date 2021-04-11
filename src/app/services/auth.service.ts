import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ItemResponseModel } from '../models/response/itemResponseModel';
import { LoginModel } from '../models/response/loginModel';
import { RegisterModel } from '../models/response/registerModel';
import { TokenModel } from '../models/response/tokenModel';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserId: number;
  jwtHelperService:JwtHelperService = new JwtHelperService();
  
  apiUrl='https://localhost:44332/api/auth/'
  constructor(private httpClient:HttpClient,private localStorageService:LocalStorageService) { }

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
  setCurrentUserId(){
    var decoded = this.getDecodedToken()
    var propUserId = Object.keys(decoded).filter(x => x.endsWith("nameidentifier"))[0];
    this.currentUserId = Number(decoded[propUserId]);
  }

  getCurrentUserId():number {
    return this.currentUserId
  }
  getDecodedToken(){
    try{
      return this.jwtHelperService.decodeToken(this.localStorageService.getToken());
    }
    catch(Error){
        return null;
    }
  }
  async setUserStats(){
    if(this.loggedIn()){
      this.setCurrentUserId()
    }
  }
  logout(){
    this.localStorageService.removeToken("token");
  }
  loggedIn(): boolean {
    let isExpired = this.jwtHelperService.isTokenExpired(this.localStorageService.getToken());
    return !isExpired;
  }

}
