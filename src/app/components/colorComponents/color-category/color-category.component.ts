import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-category',
  templateUrl: './color-category.component.html',
  styleUrls: ['./color-category.component.css']
})
export class ColorCategoryComponent implements OnInit {

  filterColorText:string;
  currentColor:Color;
  colors:Color[]=[];
  dataLoaded=false;
  constructor(private colorService:ColorService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getColors();
  }
  getColors()
  {
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
      
    })
  }
  setCurrentColor(color:Color)
  {
    this.currentColor=color;
  }
  getCurrentColorClass(color:Color)
  {
    if(color==this.currentColor)
    {
      return "list-group-item active"
    }
    else
    {
      return "list-group-item"
    }
  }
  getAllColorClass()
  {
    if(this.currentColor)
    {
      return "list-group-item ";
    }
    else
    {
      return "list-group-item"
    }
  }
}
