import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeCategoryDashboardComponent } from './attribute-category-dashboard.component';

describe('AttributeCategoryDashboardComponent', () => {
  let component: AttributeCategoryDashboardComponent;
  let fixture: ComponentFixture<AttributeCategoryDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttributeCategoryDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttributeCategoryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
