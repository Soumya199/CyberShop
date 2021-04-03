import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { ProductDetail } from '../Models/ProductDetail';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
readonly rootUrl="https://localhost:44360/api";
  constructor(private http:HttpClient) { }
getProducts:ProductDetail;
  GetProductDetailsByRating(rating:number):Observable<ProductDetail[]>{
    return this.http.get<ProductDetail[]>(this.rootUrl+'/Products?rating='+rating);
  }
  GetProductDetailsById(id:number):Observable<ProductDetail>
  {
    return this.http.get<ProductDetail>(this.rootUrl+'/Products?id='+id)
  }
  GetProductDetailsByCategory(category:string):Observable<ProductDetail[]>
  {
    return this.http.get<ProductDetail[]>(this.rootUrl+'/Products?category='+category)
  }
}
