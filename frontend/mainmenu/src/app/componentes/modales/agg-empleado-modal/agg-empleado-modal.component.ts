import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CargarDatosService } from '../../../services/cargar-datos.service';
import { Cargos } from '../../../models/cargos.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { NivelEducativo } from '../../../models/nivel-educativo.model';
import { SaveEmpleadoDTO } from '../../../models/save-empleado.dto';
import { GuardarUsuarioService } from '../../../guardar-usuario.service';

@Component({
  selector: 'app-agg-empleado-modal',
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './agg-empleado-modal.component.html',
  styleUrl: './agg-empleado-modal.component.scss'
})
export class AggEmpleadoModalComponent {

  nivelEducativo: NivelEducativo[] = [];
  cargos: Cargos[] = [];
  empleadoForm: FormGroup;

  constructor( private fb: FormBuilder, private guardarUserService: GuardarUsuarioService,  public _matDialogRef: MatDialogRef<AggEmpleadoModalComponent>, private cargarDatosService: CargarDatosService){
      this.empleadoForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      identidad: ['', Validators.required],
      fechaContratacion: ['', Validators.required],
      telefono: [''],
      correo: [''],
      cargoId: ['', Validators.required],
      nivelEducativoId: ['', Validators.required], // Aquí se enlazará el mat-select

      //datos del usuario
      username: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?=.*[a-zA-Z]).{8,}/)
      ]],
    
    });
   }

   ngOnInit(): void{
    this.cargarDatosService.getCargos().subscribe({
      next: (data) => this.cargos = data,
      error: (err) => console.error('Error al cargar cargos:', err)
    })

    this.cargarDatosService.getnivelEducativo().subscribe({
      next: (data) => this.nivelEducativo = data,
      error: (err) => console.error('Error al cargar cargos:', err)
    })

   }

   onSubmit(){
    if (this.empleadoForm.invalid) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }
  
    const empleado: SaveEmpleadoDTO = this.empleadoForm.value;
  
    this.cargarDatosService.saveEmpleado(empleado).subscribe({
      next: (res) => {

        const empleadoId = res.empleadoId;
        const { username, password } = this.empleadoForm.value;

        this.guardarUserService.SaveUser(username, password, empleadoId).subscribe({
          next: () => {
            console.log('Usuario registrado');
            alert('Se ha registrado el usuario');
           
          },
          error: (error) => {
            console.error('Error', error);
            alert('Error al guardar el usuario');
            console.log(username, password, empleadoId)
          }
        });
        console.log('Empleado guardado:', res);
        console.log(empleadoId);
        alert('Empleado guardado exitosamente.');
        this.empleadoForm.reset();
        this._matDialogRef.close(true);
      },
      error: (err) => {
        console.error('Error al guardar el empleado:', err);
        alert('Error al guardar el empleado.');
      }
    });

   
   }

   close() {
    this._matDialogRef.close();
  }
}
