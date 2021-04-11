import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemResponseModel } from '../models/response/itemResponseModel';
import { ResponseModel } from '../models/response/responseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }
  apiUrl = 'https://localhost:44332/api/users/';


  getById(id:number):Observable<ItemResponseModel<User>>{
    let newPath=this.apiUrl+"getbyid?id="+id;
    return this.httpClient.get<ItemResponseModel<User>>(newPath);
  }

  Update(user:User):Observable<ResponseModel>{
    console.log(user)
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'updateprofile', {
      user:{
        'id': user.id,
        'firstName': user.firstName,
        'lastName': user.lastName,
        'email': user.email,
        'status':user.status
      },
      password:user.password
    });
  }
  getByEmail(email:string):Observable<User>{
    return this.httpClient.get<User>(this.apiUrl+"email?email="+email)
  }
}
