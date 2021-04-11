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
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/add",component:CarAddComponent,canActivate:[LoginGuard]},
  {path:"cars/update/:carId", component:CarUpdateComponent,canActivate:[LoginGuard]},

  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"car/details/:carId", component:CarDetailComponent },
  {path:"cars/filter/:brandId/:colorId",component:CarComponent},

  {path:"brands",component:CarBrandComponent,canActivate:[LoginGuard]},
  {path:"brands/add", component:BrandAddComponent,canActivate:[LoginGuard]},
  {path:"brands/update/:brandId", component:BrandUpdateComponent,canActivate:[LoginGuard]},


  {path:"colors", component:ColorComponent,canActivate:[LoginGuard]},
  {path:"colors/add", component:ColorAddComponent,canActivate:[LoginGuard]},
  {path:"colors/update/:colorId", component:ColorUpdateComponent,canActivate:[LoginGuard]},
  
  {path:"rental/:carId" ,component:RentalComponent},
  {path:"payment/:rental", component:PaymentComponent},

  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
