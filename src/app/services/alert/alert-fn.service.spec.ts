import { TestBed } from '@angular/core/testing';

import { AlertFnService } from './alert-fn.service';

describe('AlertFnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlertFnService = TestBed.get(AlertFnService);
    expect(service).toBeTruthy();
  });
});
