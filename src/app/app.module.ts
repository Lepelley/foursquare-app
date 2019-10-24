import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantAddComponent } from './restaurant-add/restaurant-add.component';
import { HeaderComponent } from './header/header.component';
import { RestaurantViewComponent } from './restaurant-view/restaurant-view.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RestaurantService } from './services/restaurant.service';
import { RestaurantsGraphComponent } from './restaurants-graph/restaurants-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantAddComponent,
    HeaderComponent,
    RestaurantViewComponent,
    RestaurantComponent,
    RestaurantsGraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule
  ],
  providers: [RestaurantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
