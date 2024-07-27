import {TestBed} from '@angular/core/testing';

import {SaveStoreService} from './save-store.service';

describe('SaveStoreService', () => {
  let service: SaveStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
