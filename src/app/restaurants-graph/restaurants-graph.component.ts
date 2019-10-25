import { Component, OnInit } from '@angular/core';
import * as CanvasJS from 'canvasjs.min';
import { Restaurant } from '../models/restaurant.model';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-restaurants-graph',
  templateUrl: './restaurants-graph.component.html',
  styleUrls: ['./restaurants-graph.component.css']
})
export class RestaurantsGraphComponent implements OnInit {

  restaurants: Restaurant[] = [];

  constructor(public restaurantService: RestaurantService) {}

  ngOnInit() {
    this.restaurantService.getRestaurants().subscribe(
      (data: Restaurant[]) => {
        this.restaurants = data;
      },
      (error) => { console.log(error); },
      () => { // we can continue when we got the data
        const dataPoints: any[] = [];
        this.restaurants.forEach(restaurant => {
          for (const point of dataPoints) {
            if (point.name === restaurant.type) {
              point.y++;
              return;
            }
          }
          dataPoints.push({y: 1, name: restaurant.type});
        });
        // Pie chart
        const chart = new CanvasJS.Chart('chartContainer', {
          theme: 'light2',
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: this.restaurants.length + ' restaurant(s)'
          },
          data: [{
            type: 'pie',
            showInLegend: true,
            toolTipContent: '<b>{name}</b>: {y} (#percent%)',
            indexLabel: '{name} - #percent%',
            dataPoints
          }]
        });

        chart.render();
      }
    );
  }
}
