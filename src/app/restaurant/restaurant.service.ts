import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { RestaurantModel } from "./restaurant.model";

@Injectable({ providedIn: 'root' })
export class RestaurantService {

   private obj: object = {};
   private restaurant: RestaurantModel[] = [];
   private restaurantUpdated = new Subject<object>();
   private baseUrl:string = "https://he-backend.herokuapp.com";
   constructor(private http: HttpClient) { }

   getData() {
      this.http.get(`${this.baseUrl}/top-resto`)
         .subscribe(response => {
            // console.log('response from server in service', response);
            this.restaurant = response['data'];
            this.obj['data'] = this.restaurant;
            this.obj["page"] = response["page"],
               this.obj["skip"] = response["skip"],
               this.obj["count"] = response["count"],
               this.restaurantUpdated.next(this.obj);
         });
   }

   getDataByName(query) {
      this.http.get(`${this.baseUrl}/search/${query}`)
         .subscribe(response => {
            // console.log('response from server in service', response);
            this.restaurant = response['data'];
            this.obj['data'] = this.restaurant;
            this.obj["page"] = response["page"],
               this.obj["skip"] = response["skip"],
               this.obj["count"] = response["count"],
               this.restaurantUpdated.next(this.obj);
         });
   }
   getDataByPage(pageNumber) {
      this.http.get(`${this.baseUrl}/top-resto/${pageNumber}`)
         .subscribe(response => {
            // console.log('response from server in service', response);
            this.restaurant = response['data'];
            this.obj['data'] = this.restaurant;
            this.obj["page"] = response["page"],
               this.obj["skip"] = response["skip"],
               this.obj["count"] = response["count"],
               this.restaurantUpdated.next(this.obj);
         });
   }

   getDataSearchPlusPagination(query, pageNumber) {
      this.http.get(`${this.baseUrl}/search/${query}/${pageNumber}`)
         .subscribe(response => {
            // console.log('response from server in service', response);
            this.restaurant = response['data'];
            this.obj['data'] = this.restaurant;
            this.obj["page"] = response["page"],
               this.obj["skip"] = response["skip"],
               this.obj["count"] = response["count"],
               this.restaurantUpdated.next(this.obj);
         });
   }

   getRestaurantsByCuisine(cuisine) {
      this.http.post(`${this.baseUrl}/cuisines`, cuisine)
         .subscribe(response => {
            console.log('response from server in service', response);
            // this.restaurant = response['data'];
            // this.obj['data'] = this.restaurant;
            // this.obj["page"] = response["page"],
            //    this.obj["skip"] = response["skip"],
            //    this.obj["count"] = response["count"],
            //    this.restaurantUpdated.next(this.obj);
         });
   }

   restaurantUpdateListener() {
      return this.restaurantUpdated.asObservable();
   }
}