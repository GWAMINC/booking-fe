import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceTypeDashboardComponent } from './place-type-dashboard.component';

describe('PlaceTypeDashboardComponent', () => {
  let component: PlaceTypeDashboardComponent;
  let fixture: ComponentFixture<PlaceTypeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceTypeDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaceTypeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
