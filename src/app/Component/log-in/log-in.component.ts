import { Customer } from './../../Models/Customer';
import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LogInService } from 'src/app/Service/log-in.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  @Input() user={Customer_EmailId:"",Customer_Password:""}
  encryptSecretKey:string="capgemini";
  UserId:string;
  message:string;
   data:any;
   authenticated:boolean=false;
  constructor(private logInServiceObject:LogInService,private router:Router) { }
  customerObject:Customer[];
  ngOnInit(): void {
  }
  LogInForm(loginDetails:NgForm)
  {
    this.VarifyCustomer(this.user.Customer_EmailId);
  }
  VarifyCustomer(UserId)
  {
    this.logInServiceObject.GetCustomer(UserId).subscribe(data=>{
      this.data=data
      if(data!=null)
      {
        const bytes = CryptoJS.AES.decrypt(data.Customer_Password, this.encryptSecretKey);
        data.Customer_Password=JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        console.log(data.Customer_Password);
        if(data.Customer_EmailId==this.user.Customer_EmailId && data.Customer_Password== this.user.Customer_Password)
        {
          this.authenticated=true;
          this.logInServiceObject.Authentication();
          this.logInServiceObject.userLogedIn=data;
          this.router.navigate(['/Home']);
        }
        else
        {
          this.message="Invalid Credentials"
        }
      }
      else
        {
          this.message="Invalid Credentials"
        }  
    }
    );
  }
}
