import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  email = this.localStorageService.getItem('email');
  user:User=new User();
  constructor(private authService:AuthService,
    private localStorageService:LocalStorageService,
    private userService:UserService,
    private  toastrService:ToastrService,
    private router:Router) { }

  
  ngOnInit(): void {
    this.checkToLogin();
    this.checkToEmail();
    this.getEmail();

  }

  checkToLogin(){
    if(this.authService.isAuthenticated()){
      return true;
    }else{
      return false;
    }
  }

  checkToEmail(){
    if(this.localStorageService.getItem('email')){
      return true;
    }else{
      return false;
    }
  }

  logOut(){
   this.localStorageService.clear()
    this.toastrService.success("Başarıyla Çıkış Yapıldı");
    this.router.navigate(["/"])
  }

  getEmail(){
    if(this.email){
      this.userService.getByEmail(this.email).subscribe(response=>{
        this.user = response;
      })
    }
  }
}
