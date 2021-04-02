import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm:FormGroup
  constructor(private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private brandService:BrandService) { }

  ngOnInit(): void {
    this.createBrandAddForm()
  }

  createBrandAddForm(){
    this.brandAddForm = this.formBuilder.group({
      brandName:["",Validators.required],

    })
    }
    add(){
      if(this.brandAddForm.valid){
        let carModel=Object.assign({},this.brandAddForm.value)
        this.brandService.add(carModel).subscribe(response=>{
          this.toastrService.success("Araba eklendi","Başarılı")
        })
        this.toastrService.success("Araba eklendi","Başarılı")
       }else{
         console.log(console.error());
         
         this.toastrService.error("Formunuz eksik","Dikkat")
       }
    }
}
