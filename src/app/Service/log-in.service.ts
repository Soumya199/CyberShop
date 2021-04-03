import { Customer } from './../Models/Customer';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/catch';
@Injectable({
  providedIn: 'root'
})
export class LogInService {
  EmailId:string; 
  authenticated=false;
  readonly rootUrl="https://localhost:44360/api";
  constructor(private httpClient:HttpClient) { }
  userLogedIn:Customer;
  GetCustomer(EmailId):Observable<Customer>
  {
    return this.httpClient.get<Customer>(this.rootUrl+'/Customers?id='+EmailId);
  }
  Authentication()
  {
    return this.authenticated=true;
  }
}
