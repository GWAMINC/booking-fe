import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeDashboardComponent } from './attribute-dashboard.component';

describe('CategoryDashboardComponent', () => {
  let component: AttributeDashboardComponent;
  let fixture: ComponentFixture<AttributeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttributeDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
