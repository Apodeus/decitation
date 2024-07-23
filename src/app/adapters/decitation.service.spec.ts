import { TestBed } from '@angular/core/testing';

import { InMemoryDecitationService } from './in-memory-decitation.service';

describe('DecitationService', () => {
  let service: InMemoryDecitationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryDecitationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
