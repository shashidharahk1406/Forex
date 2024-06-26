import { TestBed } from '@angular/core/testing';

import { CommonFiletrService } from './common-filetr.service';

describe('CommonFiletrService', () => {
  let service: CommonFiletrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonFiletrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
