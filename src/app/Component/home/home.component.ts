import { CartService } from './../../Service/cart.service';
import { Cart } from './../../Models/Cart';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogInService } from 'src/app/Service/log-in.service';
import { ProductService } from 'src/app/Service/product.service';
import { ProductDetail } from 'src/app/Models/ProductDetail';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
  export class HomeComponent implements OnInit {
  status: boolean=false;
  constructor(private logInServiceObject: LogInService, private router: Router, private productService: ProductService, private cartService: CartService) { }
  PopularProducts: ProductDetail[];
  ProductDetails: ProductDetail;
  ProductByRating: number = 5;
  cartdetails:Cart=<any>{};
  message: string;
  dataSaved: number = 0;
  varified:number=0;
  UserCartdetail:Cart=<any>{};
  ngOnInit() {
    if (!this.logInServiceObject.authenticated) {
      console.log(this.logInServiceObject.authenticated)
      this.router.navigate(['/LogIn']);
    }
    else {
      this.productService.GetProductDetailsByRating(this.ProductByRating).subscribe(
        x => this.PopularProducts = x);
    }
    
  }
  ViewProductDetail(id: number): void {
    this.router.navigate(['ProductDetails/' + id]);
  }
  AddTocart(productImage:string,productId: number,productName:string,productPrice:any): void {
    this.cartService.CheckUserCartDetail(this.logInServiceObject.userLogedIn.Customer_EmailId).subscribe((data)=>
    {
      this.UserCartdetail=data;
      if(this.cartdetails.product_Id==productId)
      {
        this.status=true
        console.log(this.status)
      }
      console.log(this.UserCartdetail);
    });
      if(this.status==true)
      {
        
        console.log(this.cartdetails.Product_Name); 
        console.log(productId);
        console.log(this.cartdetails.product_Id);
        this.cartdetails.Product_Quentity=+1;
        this.cartdetails.Total_Amounts=+productPrice;
        console.log(this.cartdetails)
        console.log(this.cartdetails.Cart_Id)
        this.cartService.UpdateShopping_Cart(this.cartdetails).subscribe();
      }
      else{
        this.cartdetails.Customer_Id=this.logInServiceObject.userLogedIn.Customer_EmailId;
        this.cartdetails.Product_Name=productName;
        this.cartdetails.Product_Image=productImage;
        this.cartdetails.product_Id=productId;
        this.cartdetails.Product_Quentity=1;
        this.cartdetails.Total_Amounts=productPrice;
        this.AddDatatoDatabase(this.cartdetails);
      }
    
  }
  AddDatatoDatabase(myData: any) {
    console.log(myData);
    this.cartService.PostShopping_Cart(myData).subscribe((data) => {
    this.dataSaved = 1;
    this.message = 'Congratulations Product Added to Cart succesfully';
  },
  (error:HttpErrorResponse)=>
  {
    if(error.status==404)
    {
      this.message=(" Sorry !!Resource cannot be found");
    }
    else if(error.status==0 || error.status==400)
    {
      this.message=("Server is Offline,We are working on it,Please try again later");
    }
  }

  )};
}
