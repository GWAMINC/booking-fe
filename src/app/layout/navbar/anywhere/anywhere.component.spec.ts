import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnywhereComponent } from './anywhere.component';

describe('AnywhereComponent', () => {
  let component: AnywhereComponent;
  let fixture: ComponentFixture<AnywhereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnywhereComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnywhereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
