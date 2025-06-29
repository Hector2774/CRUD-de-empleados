import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUsuarioModalComponent } from './edit-usuario-modal.component';

describe('EditUsuarioModalComponent', () => {
  let component: EditUsuarioModalComponent;
  let fixture: ComponentFixture<EditUsuarioModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUsuarioModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUsuarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
