import { LogInService } from './log-in.service';
import { ProductService } from './product.service';
import { Cart } from './../Models/Cart';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
holdMydata:Cart;
readonly rootUrl="https://localhost:44360/api";
  constructor(public httpClient:HttpClient,private productService:ProductService,private login:LogInService) { }

  PostShopping_Cart(cartData:Cart):Observable<Cart>{
    return this.httpClient.post<Cart>(this.rootUrl+'/Shopping_Cart',cartData);
  }
  CheckUserCartDetail(UserId:string):Observable<Cart>
  {
    return this.httpClient.get<Cart>(this.rootUrl+'/Shopping_Cart?UerId='+UserId);
  
  }
  UpdateShopping_Cart(cartObject:Cart)
  {
      return this.httpClient.put(this.rootUrl+'/Shopping_Cart?id='+cartObject.Cart_Id,cartObject);
  }
  GetCartDetailOfUser(UserId:string):Observable<Cart[]>
  {
    return this.httpClient.get<Cart[]>(this.rootUrl+'/Shopping_Cart?UserCart='+UserId);
  }
  DeleteCartItem(cartId:number):Observable<Cart>
  {
    return this.httpClient.delete<Cart>(this.rootUrl+'/Shopping_Cart/'+cartId)
  }
  GetTotalAmount(emailId: string): Observable<number> {
    return this.httpClient.get<number>(this.rootUrl+'/Shopping_Cart?emailId=' + emailId);
  }
  DeleteCartItemByUser(UserId:string):Observable<Cart>
  {
    return this.httpClient.delete<Cart>(this.rootUrl+'/Shopping_Cart/?UserId='+UserId)
  }
}
