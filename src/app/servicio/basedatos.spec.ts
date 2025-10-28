import { TestBed } from '@angular/core/testing';

import { Basedatos } from './basedatos';

describe('Basedatos', () => {
  let service: Basedatos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Basedatos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
