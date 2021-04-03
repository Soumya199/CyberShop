import { ProductService } from './Service/product.service';
import { StarRatingComponent } from './Component/star-rating/star-rating.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule ,Myrouter} from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './Component/about/about.component';
import { CategoryComponent } from './Component/category/category.component';
import { HomeComponent } from './Component/home/home.component';
import { LogInComponent } from './Component/log-in/log-in.component';
import { RegisterComponent } from './Component/register/register.component';
import { NavigationComponent } from './Component/navigation/navigation.component';
import { RegistrationService } from './Service/registration.service';
import{HttpClientModule} from'@angular/common/http';
import { ProductDetailsComponent } from './Component/product-details/product-details.component';
import { LogInService } from './Service/log-in.service';
import { CartComponent } from './Component/cart/cart.component';
import { AccocuntDetailsComponent } from './Component/accocunt-details/accocunt-details.component';

@NgModule({
  declarations: [
    AppComponent,
    Myrouter,
    NavigationComponent,
    ProductDetailsComponent,
    StarRatingComponent,
    CartComponent,
    AccocuntDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,HttpClientModule
  ],
  providers: [RegistrationService,ProductService,LogInService],
  bootstrap: [AppComponent]
})
export class AppModule { }
