import { TestBed, inject } from '@angular/core/testing';

import { ProfitService } from './profit.service';

describe('ProfitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfitService]
    });
  });

  it('should be created', inject([ProfitService], (service: ProfitService) => {
    expect(service).toBeTruthy();
  }));
});
