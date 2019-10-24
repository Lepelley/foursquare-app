import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Restaurant } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private restaurants: Restaurant[] = [];
  uri = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getRestaurants() {
    return this.http.get(this.uri + '/restaurants/get');
  }

  addRestaurant(id: number) {
    this.http.get(this.uri + '/restaurant/add/' + id).subscribe(res => console.log('Restaurant added !'));
  }

  addSomeRestaurants(city: string) {
    this.http.get(this.uri + '/restaurants/add/' + city).subscribe(res => console.log('Restaurant added !'));
  }
}
