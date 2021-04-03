import { Order } from './../../Models/order';
import { Component, OnInit } from '@angular/core';
import { LogInService } from 'src/app/Service/log-in.service';
import { Customer } from 'src/app/Models/Customer';
import { OrderService } from 'src/app/Service/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accocunt-details',
  templateUrl: './accocunt-details.component.html',
  styleUrls: ['./accocunt-details.component.css']
})
export class AccocuntDetailsComponent implements OnInit {
  orederDetails:Order=<any>{};
 CustomerName :string;
 CustomerEmaiId:string;
 CustomerPhoneNo:string;
  constructor(private logInServiceObject:LogInService,private orderservice:OrderService,private router: Router) { }
  ngOnInit(): void {
    if (!this.logInServiceObject.authenticated) {
      console.log(this.logInServiceObject.authenticated)
      this.router.navigate(['/LogIn']);
    }
    else{
      this.CustomerName=this.logInServiceObject.userLogedIn.Customr_Name;
    this.CustomerEmaiId=this.logInServiceObject.userLogedIn.Customer_EmailId;
    this.CustomerPhoneNo=this.logInServiceObject.userLogedIn.Customer_Contact;
    this.orderservice.GetOrderDetailOfUser(this.logInServiceObject.userLogedIn.Customer_EmailId).subscribe(data=>{
    this.orederDetails=data;
    } );

    }
    
  }

}
