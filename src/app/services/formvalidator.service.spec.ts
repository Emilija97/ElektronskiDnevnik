import { TestBed } from '@angular/core/testing';

import { FormvalidatorService } from './formvalidator.service';

describe('FormvalidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormvalidatorService = TestBed.get(FormvalidatorService);
    expect(service).toBeTruthy();
  });
});
