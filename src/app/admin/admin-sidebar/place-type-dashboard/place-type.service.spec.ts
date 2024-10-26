import { TestBed } from '@angular/core/testing';

import { PlaceTypeService } from './place-type.service';

describe('PlaceTypeService', () => {
  let service: PlaceTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaceTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
