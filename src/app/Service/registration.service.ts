import { Customer } from './../Models/Customer';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs'; 
 
// import 'rxjs/add/operator/catch';
import * as CryptoJS from 'crypto-js'; 
// import {catchError} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  conversionEncryptOutput: string;
  encryptSecretKey:string="capgemini";
  readonly rootUrl="https://localhost:44360/api";
  constructor( public httpClient:HttpClient) { } 
  userRegistered:Customer;
  InsertData(selectedEmployee:Customer):Observable<Customer>{
    //console.log(selectedEmployee);
    console.log(selectedEmployee.Customer_Password);
    this.conversionEncryptOutput= CryptoJS.AES.encrypt(JSON.stringify(selectedEmployee.Customer_Password), this.encryptSecretKey).toString();  
    selectedEmployee.Customer_Password=this.conversionEncryptOutput;
    console.log(selectedEmployee.Customer_Password);
    console.log(this.userRegistered);
    return this.httpClient.post<Customer>(this.rootUrl+'/Customers',selectedEmployee);
    
}

}

