import { TestBed } from '@angular/core/testing';

import { CustomErrorsService } from './custom-errors.service';

describe('CustomErrorsService', () => {
  let service: CustomErrorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomErrorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
