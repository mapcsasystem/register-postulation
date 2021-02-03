import { TestBed } from '@angular/core/testing';

import { PostulationsService } from './postulations.service';

describe('PostulationsService', () => {
  let service: PostulationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostulationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
