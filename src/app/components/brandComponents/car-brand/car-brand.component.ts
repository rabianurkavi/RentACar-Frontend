import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-car-brand',
  templateUrl: './car-brand.component.html',
  styleUrls: ['./car-brand.component.css']
})
export class CarBrandComponent implements OnInit {

  constructor(private brandService: BrandService,private toastrService:ToastrService) {}
 
  brands: Brand[];
  brand:Brand;
  dataLoaded = false;
  filterText="";
  
  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(): void {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.brand=response.data[0]
      this.dataLoaded = true;
    });
  }
  deleteBrand(brand:Brand){
    this.brandService.delete(brand).subscribe((response=>{
      this.toastrService.success("Makra ismi silindi")
      setTimeout(function(){
        location.reload()
      },400)
    }),errorResponse=>{
      if(errorResponse.error.error.length>0){
        for (let i = 0; i < errorResponse.error.error.length; i++) {
          this.toastrService.error(errorResponse.error.error[i].ErrorMessage,"Doğrulama hatası")
          
        }
      }
    })
  }
    
}
