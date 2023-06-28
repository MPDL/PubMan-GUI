import { TestBed } from '@angular/core/testing';

import { AffiliationResolverService } from './affiliation-resolver.service';

describe('AffiliationResolverService', () => {
  let service: AffiliationResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffiliationResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
