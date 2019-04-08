import { Component, OnInit } from '@angular/core';

import { RestaurantModel } from "./restaurant.model";
import { Subscription } from 'rxjs';
import { RestaurantService } from './restaurant.service';


@Component({
   selector: 'app-restaurant',
   templateUrl: './restaurant.component.html',
   styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

   restaurants: RestaurantModel[] = [];
   restaurantSubscription: Subscription;
   pageNumber: number = 1;
   total: number = 100;
   perpage: number = 10;
   dataType: string;
   currentQuery: string;
   cuisineList: string[] = ['Sushi',
      'Japanese',
      'Steak',
      'Tapas',
      'Bar Food',
      'BBQ',
      'Seafood',
      'Filipino',
      'Asian',
      'European',
      'Brazilian',
      'Indian',
      'American',
      'Mediterranean',
      'Pizza',
      'Sandwich',
      'Peruvian',
      'Latin American',
      'Mexican',
      'Grill',
      'Lebanese',
      'Arabian',
      'Korean',
      'Juices',
      'Healthy Food',
      'Italian',
      'International',
      'Gourmet Fast Food',
      'Burger',
      'French',
      'Desserts',
      'Beverages',
      'Fast Food',
      'Cafe',
      'Coffee and Tea',
      'Chinese',
      'Vegetarian',
      'Bakery',
      'North Eastern',
      'Mineira',
      'Ice Cream']
      ;
   constructor(private restaurantService: RestaurantService) { }

   getPath(index) {
      return index % 2 == 0 ? "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?dpr=2&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=" : "https://images.unsplash.com/photo-1464652149449-f3b8538144aa?dpr=2&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=%27";
   }

   ngOnInit() {
      this.dataType = "initial";
      this.getTopTen();
   }
   getRestaurantsByCuisine(cuisine) {
      console.log('clicked', [cuisine]);
      this.restaurantService.getRestaurantsByCuisine([cuisine]);
   }
   handleSubmit(target) {
      this.pageNumber = 1;
      if (target.value.trim().length > 0) {
         this.currentQuery = target.value.trim();
         this.dataType = "search";
         this.restaurantService.getDataByName(target.value.trim());
         this.observeChanges();
      } else {
         this.dataType = "initial";
         this.getTopTen();
      }
   }

   getTopTen() {
      this.restaurantService.getData();
      this.observeChanges();
   }


   previousPage() {
      if (this.pageNumber > 1) {
         this.pageNumber -= 1;
         if (this.dataType == "initial") {
            this.restaurantService.getDataByPage(this.pageNumber);
         } else {
            this.restaurantService.getDataSearchPlusPagination(this.currentQuery, this.pageNumber);
         }
      }
   }

   nextPage() {
      if ((this.pageNumber * this.perpage) < this.total) {
         this.pageNumber += 1;
         if (this.dataType == "initial") {
            this.restaurantService.getDataByPage(this.pageNumber);
         } else {
            this.restaurantService.getDataSearchPlusPagination(this.currentQuery, this.pageNumber);
         }
      }
   }

   observeChanges() {
      this.restaurantSubscription = this.restaurantService.restaurantUpdateListener().subscribe(response => {
         console.log('observing changes [component]', response);
         this.restaurants = response['data'];
         this.total = response['count']
         console.warn('[count]', this.total);
      });
   }
}
