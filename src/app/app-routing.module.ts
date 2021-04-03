import { AccocuntDetailsComponent } from './Component/accocunt-details/accocunt-details.component';
import { CartComponent } from './Component/cart/cart.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { AboutComponent } from './Component/about/about.component';
import { CategoryComponent } from './Component/category/category.component';
import { LogInComponent } from './Component/log-in/log-in.component';
import { ProductDetailsComponent } from './Component/product-details/product-details.component';
import { RegisterComponent } from './Component/register/register.component';


const routes: Routes = [
  {path:'',component:LogInComponent},
  {path:'Home',component:HomeComponent},
    {path:'About',component:AboutComponent},
    {path:'Category',component:CategoryComponent},
    {path:'LogIn',component:LogInComponent},
    {path:'Cart',component:CartComponent},
    {path:'register',component:RegisterComponent},
    {path:'AccountDetail',component:AccocuntDetailsComponent},
    {path:'ProductDetails/:id',component:ProductDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const Myrouter=[HomeComponent,AboutComponent,CategoryComponent,LogInComponent,RegisterComponent,CartComponent];
