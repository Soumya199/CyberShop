import { OrderService } from './../../Service/order.service';
import { Order } from './../../Models/order';
import { CartService } from './../../Service/cart.service';
import { Component, OnInit } from '@angular/core';
import { LogInService } from 'src/app/Service/log-in.service';
import { Router } from '@angular/router';
import { Cart } from 'src/app/Models/Cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private logInServiceObject: LogInService,private router: Router,private cartService:CartService,private orderService:OrderService) { }
  TotalAmount;
  cartDetails:Cart[];
  IsDeleted:boolean=false;
  Message:string;
  Order:Order=<any>{};
  ngOnInit(): void {
    if (!this.logInServiceObject.authenticated) {
      this.router.navigate(['/LogIn']);
    }
    else{
      
      this.cartService.GetCartDetailOfUser(this.logInServiceObject.userLogedIn.Customer_EmailId).subscribe(les=>
        {this.cartDetails=les
          if(this.cartDetails.length>0)
          {
        this.cartService.GetTotalAmount(this.logInServiceObject.userLogedIn.Customer_EmailId).subscribe(res=>this.TotalAmount=res);
          }}); 
      
        
    }
  }
  DeleteItem(cartid:number)
  {
    if(window.confirm("Are you sure ? you Want to remove from cart"))
     this.cartService.DeleteCartItem(cartid).subscribe((x)=>
      {
        this.Message="Your product Removed Succesfully";
        this.ngOnInit();
      }
    );
    
  }
  ConfirmOrder()
  {
    this.Order.Customer_Id=this.logInServiceObject.userLogedIn.Customer_EmailId;
    this.Order.Order_Amount=this.TotalAmount;
    this.Order.Order_Date=new Date();
    this.Order.Order_DeliveryDate=new Date((new Date()).setDate(this.Order.Order_Date.getDate()+7));
    this.Order.Payment_Mode='COD',
    console.log(this.Order)
    this.orderService.UserOrders(this.Order).subscribe(()=>
    {
      this.cartService.DeleteCartItemByUser(this.Order.Customer_Id).subscribe(()=>
      {
        alert("Your Order will be Delivered Soon")
        this.router.navigate(['/AccountDetail'])
        
      }
      )
    }
    );
    
    
  }

    
}