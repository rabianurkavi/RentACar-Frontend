import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brandComponents/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brandComponents/brand-update/brand-update.component';
import { CarBrandComponent } from './components/brandComponents/car-brand/car-brand.component';
import { CarAddComponent } from './components/carComponents/car-add/car-add.component';
import { CarDetailComponent } from './components/carComponents/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/carComponents/car-update/car-update.component';
import { CarComponent } from './components/carComponents/car/car.component';
import { ColorComponent } from './components/colorComponents/car-color/car-color.component';
import { ColorAddComponent } from './components/colorComponents/color-add/color-add.component';
import { ColorCategoryComponent } from './components/colorComponents/color-category/color-category.component';
import { ColorUpdateComponent } from './components/colorComponents/color-update/color-update.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/add",component:CarAddComponent},
  {path:"cars/update/:carId", component:CarUpdateComponent},

  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"car/details/:carId", component:CarDetailComponent },
  {path:"cars/filter/:brandId/:colorId",component:CarComponent},

  {path:"brands",component:CarBrandComponent},
  {path:"brands/add", component:BrandAddComponent},
  {path:"brands/update/:brandId", component:BrandUpdateComponent},


  {path:"colors", component:ColorComponent},
  {path:"colors/add", component:ColorAddComponent},
  {path:"colors/update/:colorId", component:ColorUpdateComponent},
  
  {path:"rental/:carId" ,component:RentalComponent},
  {path:"payment/:rental", component:PaymentComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
