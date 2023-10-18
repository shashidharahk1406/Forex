import { TestBed } from '@angular/core/testing';

import { AddLeadEmitterService } from './add-lead-emitter.service';

describe('AddLeadEmitterService', () => {
  let service: AddLeadEmitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddLeadEmitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
