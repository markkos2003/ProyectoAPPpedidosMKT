import { TestBed } from '@angular/core/testing';

import { Mostrar } from './mostrar';

describe('Mostrar', () => {
  let service: Mostrar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mostrar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
