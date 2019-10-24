import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantsGraphComponent } from './restaurants-graph.component';

describe('RestaurantsGraphComponent', () => {
  let component: RestaurantsGraphComponent;
  let fixture: ComponentFixture<RestaurantsGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantsGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
