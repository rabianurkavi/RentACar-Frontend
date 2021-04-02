import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-color',
  templateUrl: './car-color.component.html',
  styleUrls: ['./car-color.component.css']
})
export class ColorComponent implements OnInit {
  
  colors: Color[] 
  dataLoaded = false;
  constructor(
    private colorService: ColorService,
    private toastrService:ToastrService) {}

    ngOnInit(): void {
      this.getColors();
    }
  
    getColors(){
      this.colorService.getColors().subscribe((response)=>{
        this.colors=response.data
      })
    }
    deleteColor(color:Color){
      this.colorService.delete(color).subscribe((response)=>{
        this.toastrService.success("Renk silindi")
        setTimeout(()=>{window.location.reload},1500)
      })
    }
}
