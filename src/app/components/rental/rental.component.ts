import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { CarDetail } from 'src/app/models/car-detail';
import { Rental } from 'src/app/models/rental';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { FindeksService } from 'src/app/services/findeks.service';
import { RentalService } from 'src/app/services/rental.service';
import { environment } from 'src/environments/environment';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  car:CarDetail;
  cars:CarDetail[]=[]
  startDate:Date;
  endDate:Date;
  rentPrice:number = 0;
  rental:Rental;
  rentable:Boolean = false;
  imageBasePath = environment.baseUrl;
  defaultImg="/images/default.jpg"
  minDate:string|null;
  endMinDate:string|null;
  maxDate:string|null;
  constructor(
    private rentalService:RentalService,
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private datePipe:DatePipe,
    private toastrService:ToastrService,
    private authService:AuthService,
    private findeksService:FindeksService,
    private dialogService:DialogService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetail(params["carId"])
      }
    })
    this.minDate=this.datePipe.transform(new Date(),"yyyy-MM-dd");
    this.maxDate=this.datePipe.transform(new Date(new Date().setFullYear(new Date().getFullYear() + 1)),"yyyy-MM-dd");
  }
  
  

  getCarDetail(carId:number) {
    this.carService.getCarDetail(carId).subscribe((response) => {
      this.car = response.data[0];
    });
  }

  async addRental(){
    debugger;
    this.rentable = (await this.setRentable())
    if(this.rentable){
      let currentUserId = 5012;
      if(await this.findeksService.isCustomerFindexEnough(currentUserId,this.car.carId)){
        this.rental = this.rental;
        this.rental.userId = this.authService.getCurrentUserId()
        this.openCreditCard()
       
      }
      else{
        this.toastrService.error("Findeks puanınız yeterli değil")
      }
    }else{
      this.toastrService.error("Bu tarihler arasında araba zaten kiralanmış","Hata")
    }
  }
  openCreditCard(){
    
    const ref = this.dialogService.open(CardComponent, {
      data:{
        rental: this.rental
      },
      header: 'Kart bilgileri',
      width: '40%'
    });
  }

  async setRentable(){
    this.rental = {carId:this.car.carId,rentStartDate:this.startDate,rentEndDate:this.endDate,totalRentPrice:this.calculatePrice()};
    return (await this.rentalService.isRentable(this.rental).toPromise()).success
  }

  calculatePrice():number{
    if(this.startDate && this.endDate){
      let endDate = new Date(this.endDate.toString())
      let startDate = new Date(this.startDate.toString())
      let endDay = Number.parseInt(endDate.getDate().toString())
      let endMonth = Number.parseInt(endDate.getMonth().toString())
      let endYear = Number.parseInt(endDate.getFullYear().toString())
      let startDay = Number.parseInt(startDate.getDate().toString())
      let startMonth = Number.parseInt(startDate.getMonth().toString())
      let startYear = Number.parseInt(startDate.getFullYear().toString())
      let result =  ((endDay - startDay) + ((endMonth - startMonth)*30) + ((endYear - startYear)*365) + 1) * this.car.dailyPrice
      if (result>0){
        return result
      }
    }
    this.toastrService.info("Bu tarihler arasında arabayı kiralayamazsınız","!")
    return 0
  }
  

  controlEndDate(){
    if(this.endDate<this.startDate){
      this.endDate = this.startDate
    }
  }
}