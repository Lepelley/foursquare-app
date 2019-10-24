import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RestaurantsGraphComponent } from './restaurants-graph/restaurants-graph.component';


const routes: Routes = [
  {
    path: '',
    component: RestaurantComponent
  },
  {
    path: 'graph',
    component: RestaurantsGraphComponent
  },
  {
    path: 'data',
    component: RestaurantComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
