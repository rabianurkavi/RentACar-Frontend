import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  localStorage: Storage;
  currentCustomer: string = 'currentCustomer';
  tokenKey = "token"

  constructor() { }
  setItem(key:string,value:any){localStorage.setItem(key,value);}
  getItem(key:string){return localStorage.getItem(key);}
  deleteItem(key:string){localStorage.removeItem(key);}
  clear(){localStorage.clear();}

  get isLocalStorageSupported(): boolean {return !!localStorage}

  getCurrentCustomer():Customer{
    return JSON.parse(localStorage.getItem(this.currentCustomer));
  }

  setCurrentCustomer(customer:Customer){
    localStorage.setItem(this.currentCustomer,JSON.stringify(customer));
  }
  
  removeCurrentCustomer(){
    localStorage.removeItem(this.currentCustomer);
  }

  setToken(token: string){
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(){
    return localStorage.getItem(this.tokenKey)
  }

  removeToken(key:string){
    localStorage.removeItem(this.tokenKey)
  }
  
  
}
