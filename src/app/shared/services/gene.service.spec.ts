import { TestBed } from '@angular/core/testing';

import { GeneService } from './gene.service';

describe('GeneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneService = TestBed.get(GeneService);
    expect(service).toBeTruthy();
  });
});
