import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../Models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
readonly rootUrl="https://localhost:44360/api"
  constructor(private httpClient:HttpClient) { }
  UserOrders(orders:Order):Observable<Order>
  {
    return this.httpClient.post<Order>(this.rootUrl+'/Orders',orders)
  }
  GetOrderDetailOfUser(UserId:string):Observable<Order>
  {
    return this.httpClient.get<Order>(this.rootUrl+'/Orders?UserEmailId='+UserId);
  }
}
