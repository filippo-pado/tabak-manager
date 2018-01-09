import { TestBed, inject } from '@angular/core/testing';

import { MovementFormService } from './movement-form.service';

describe('MovementFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovementFormService]
    });
  });

  it('should be created', inject([MovementFormService], (service: MovementFormService) => {
    expect(service).toBeTruthy();
  }));
});
