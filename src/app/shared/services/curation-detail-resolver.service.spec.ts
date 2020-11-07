import { TestBed } from '@angular/core/testing';

import { CurationDetailResolverService } from './curation-detail-resolver.service';

describe('CurationDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurationDetailResolverService = TestBed.get(CurationDetailResolverService);
    expect(service).toBeTruthy();
  });
});
