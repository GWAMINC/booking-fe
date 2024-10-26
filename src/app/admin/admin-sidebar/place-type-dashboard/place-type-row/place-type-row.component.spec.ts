import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceTypeRowComponent } from './place-type-row.component';

describe('PlaceTypeRowComponent', () => {
  let component: PlaceTypeRowComponent;
  let fixture: ComponentFixture<PlaceTypeRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceTypeRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaceTypeRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
