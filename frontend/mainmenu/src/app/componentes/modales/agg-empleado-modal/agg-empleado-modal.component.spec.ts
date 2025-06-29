import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggEmpleadoModalComponent } from './agg-empleado-modal.component';

describe('AggEmpleadoModalComponent', () => {
  let component: AggEmpleadoModalComponent;
  let fixture: ComponentFixture<AggEmpleadoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AggEmpleadoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggEmpleadoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
