import { TestBed } from '@angular/core/testing';

import { Servicioimagen } from './servicioimagen';

describe('Servicioimagen', () => {
  let service: Servicioimagen;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Servicioimagen);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
