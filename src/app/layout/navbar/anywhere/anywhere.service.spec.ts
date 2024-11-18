import { TestBed } from '@angular/core/testing';

import { AnywhereService } from './anywhere.service';

describe('AnywhereService', () => {
  let service: AnywhereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnywhereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
