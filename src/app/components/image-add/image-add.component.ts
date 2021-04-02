import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CarImage } from 'src/app/models/car-image';
import { FileUploader,FileItem } from 'ng2-file-upload';
import { of } from 'rxjs'; 
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';  
import { CarImageService } from 'src/app/services/car-image.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-image-add',
  templateUrl: './image-add.component.html',
  styleUrls: ['./image-add.component.css']
})
export class ImageAddComponent implements OnInit {

   

  constructor() { }

  

  ngOnInit(): void {

  }

}
