import { TestBed, inject } from '@angular/core/testing';

import { InterestsService } from './interests.service';

describe('InterestsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterestsService]
    });
  });

  it('should be created', inject([InterestsService], (service: InterestsService) => {
    expect(service).toBeTruthy();
  }));
});
