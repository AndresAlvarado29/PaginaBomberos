import { TestBed } from '@angular/core/testing';

import { ArchivoClienteService } from './archivo-cliente.service';

describe('ArchivoClienteService', () => {
  let service: ArchivoClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchivoClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
