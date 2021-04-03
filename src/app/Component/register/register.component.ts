import { HttpErrorResponse } from '@angular/common/http';
import { Customer } from './../../Models/Customer';
import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'src/app/Service/registration.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LogInService } from 'src/app/Service/log-in.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   constructor(public registerServiceObject:RegistrationService,private router:Router) { }
   message:string;
   dataSaved:number=0;
  ngOnInit(): void {
  }
  Register(form:NgForm)
  {
      this.insertData(form);
  }
  insertData(form:NgForm){

    this.registerServiceObject.InsertData(form.value).subscribe(
      (data)=>
      {
        console.log(data);
        this.registerServiceObject.userRegistered=data;
        this.dataSaved=1;
        alert("Your Registration is Sucessfull")
        this.router.navigate(['/LogIn']);
      },
      (error:HttpErrorResponse)=>
      {
        if(error.status==400)
        {
          this.message=("Resource cannot be found");
        }
        else if(error.status==0)
        {
          this.message=("Server is Offline,We are working on it,Please try again later");
        }
        else if(error.status==500)
        {
          this.message=("This Email is already registred with us");
        }
      }
    );
  }
}
