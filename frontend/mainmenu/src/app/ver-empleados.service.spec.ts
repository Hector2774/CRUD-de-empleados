import { TestBed } from '@angular/core/testing';

import { VerEmpleadosService } from './ver-empleados.service';

describe('VerEmpleadosService', () => {
  let service: VerEmpleadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerEmpleadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
