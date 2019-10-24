import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-restaurant-add',
  templateUrl: './restaurant-add.component.html',
  styleUrls: ['./restaurant-add.component.css']
})
export class RestaurantAddComponent {

  restaurantId = 0;
  nearCity = '';

  constructor(public restaurantService: RestaurantService, private router: Router) {
  }

  onSearchRestaurantById(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const restaurantId = form.value.id;
    this.restaurantService.addRestaurant(restaurantId);
    this.router.navigate(['graph']);
    form.resetForm();
  }

  onSearchRestaurantsNearCity(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const cityNear = form.value.city;
    this.restaurantService.addSomeRestaurants(cityNear);
    this.router.navigate(['graph']);
    form.resetForm();
  }

}
