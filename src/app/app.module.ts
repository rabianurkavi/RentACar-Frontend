import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http';
import{FormsModule,ReactiveFormsModule} from "@angular/forms"
import{BrowserAnimationsModule} from "@angular/platform-browser/animations"
import { FileUploadModule } from 'ng2-file-upload';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/carComponents/car/car.component';
import { CarBrandComponent } from './components/brandComponents/car-brand/car-brand.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ColorComponent } from './components/colorComponents/car-color/car-color.component';
import { RentalComponent } from './components/rental/rental.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarDetailComponent } from './components/carComponents/car-detail/car-detail.component';

import { FilterPipePipe } from './pipes/car-filter-pipe.pipe';


import{ToastrModule} from "ngx-toastr";
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { CarAddComponent } from './components/carComponents/car-add/car-add.component';
import { BrandAddComponent } from './components/brandComponents/brand-add/brand-add.component';
import { ColorAddComponent } from './components/colorComponents/color-add/color-add.component';
import { CarUpdateComponent } from './components/carComponents/car-update/car-update.component';
import { CarFilterComponent } from './components/carComponents/car-filter/car-filter.component';
import { BrandCategoryComponent } from './components/brandComponents/brand-category/brand-category.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { ImageAddComponent } from './components/image-add/image-add.component';
import { BrandUpdateComponent } from './components/brandComponents/brand-update/brand-update.component';
import { ColorUpdateComponent } from './components/colorComponents/color-update/color-update.component';
import { ColorCategoryComponent } from './components/colorComponents/color-category/color-category.component';





@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    CarBrandComponent,
    CustomerComponent,
    ColorComponent,
    RentalComponent,
    NaviComponent,
    CarDetailComponent,
    FilterPipePipe,
    BrandFilterPipe,
    ColorFilterPipe,
    CarAddComponent,
    BrandAddComponent,
    CarUpdateComponent,
    CarFilterComponent,
    CarDetailComponent,
    BrandCategoryComponent,
    PaymentComponent,
    ColorAddComponent,
    ImageAddComponent,
    BrandUpdateComponent,
    ColorUpdateComponent,
    ColorCategoryComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
