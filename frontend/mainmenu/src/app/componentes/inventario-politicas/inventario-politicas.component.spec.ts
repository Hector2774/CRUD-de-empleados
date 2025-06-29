import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioPoliticasComponent } from './inventario-politicas.component';

describe('InventarioPoliticasComponent', () => {
  let component: InventarioPoliticasComponent;
  let fixture: ComponentFixture<InventarioPoliticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventarioPoliticasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarioPoliticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
