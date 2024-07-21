import { TestBed } from '@angular/core/testing';

import { DecitationService } from './decitation.service';

describe('DecitationService', () => {
  let service: DecitationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecitationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
