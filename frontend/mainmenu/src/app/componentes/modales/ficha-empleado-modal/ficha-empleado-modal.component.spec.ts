import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaEmpleadoModalComponent } from './ficha-empleado-modal.component';

describe('FichaEmpleadoModalComponent', () => {
  let component: FichaEmpleadoModalComponent;
  let fixture: ComponentFixture<FichaEmpleadoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichaEmpleadoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaEmpleadoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
