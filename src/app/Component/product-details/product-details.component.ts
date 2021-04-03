import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Service/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductDetail } from 'src/app/Models/ProductDetail';
import { CartService } from 'src/app/Service/cart.service';
import { LogInService } from 'src/app/Service/log-in.service';
import { Cart } from 'src/app/Models/Cart';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  cartdetails:Cart=<any>{};
  message: string;
  dataSaved: number = 0;
  varified:number=0;
  UserCartdetail:Cart=<any>{};
  status: boolean=false;
  constructor(private router:ActivatedRoute,private productService:ProductService,private cartService: CartService,private logInServiceObject: LogInService) { }

  id:number; //Declare for accepting parameter id
    productDetail:ProductDetail;
  ngOnInit() {
    this.id=this.router.snapshot.params['id'];
    this.productService.GetProductDetailsById(this.id).subscribe(res=>this.productDetail=res
      );
      
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
