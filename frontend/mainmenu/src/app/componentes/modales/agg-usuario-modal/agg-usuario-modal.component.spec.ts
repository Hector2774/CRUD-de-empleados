import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggUsuarioModalComponent } from './agg-usuario-modal.component';

describe('AggUsuarioModalComponent', () => {
  let component: AggUsuarioModalComponent;
  let fixture: ComponentFixture<AggUsuarioModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AggUsuarioModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggUsuarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
