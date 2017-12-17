import { TestBed, inject } from '@angular/core/testing';

import { MovementService } from './movement.service';

describe('MovementsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovementService]
    });
  });

  it('should be created', inject([MovementService], (service: MovementService) => {
    expect(service).toBeTruthy();
  }));
});
