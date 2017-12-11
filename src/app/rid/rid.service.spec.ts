import { TestBed, inject } from '@angular/core/testing';

import { RidService } from './rid.service';

describe('RidService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RidService]
    });
  });

  it('should be created', inject([RidService], (service: RidService) => {
    expect(service).toBeTruthy();
  }));
});
