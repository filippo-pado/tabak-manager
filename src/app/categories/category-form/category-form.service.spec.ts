import { TestBed, inject } from '@angular/core/testing';

import { CategoryFormService } from './category-form.service';

describe('CategoryFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryFormService]
    });
  });

  it('should be created', inject([CategoryFormService], (service: CategoryFormService) => {
    expect(service).toBeTruthy();
  }));
});
