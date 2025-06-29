import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Cargos } from '../../../models/cargos.model';
import { NivelEducativo } from '../../../models/nivel-educativo.model';
import { CargarDatosService } from '../../../services/cargar-datos.service';
import { SaveEmpleadoDTO } from '../../../models/save-empleado.dto';
import { VerEmpleadoDTO } from '../../../ver-empleado.dto';
@Component({
  selector: 'app-edit-empleado',
 
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatSelectModule,],
  templateUrl: './edit-empleado.component.html',
  styleUrl: './edit-empleado.component.scss'
})
export class EditEmpleadoComponent {
  nivelEducativo: NivelEducativo[] = [];
  cargo: Cargos[] = [];
  empleadoForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: VerEmpleadoDTO, public cargarService: CargarDatosService,  private fb: FormBuilder, private dialogRef: MatDialogRef<EditEmpleadoComponent>){
    this.empleadoForm = this.fb.group({
      nombres: data.nombres,
      apellidos: data.apellidos,
      identidad: data.identidad,
      fechaContratacion: data.fechaContratacion,
      telefono: data.telefono,
      correo: data.correo,
      cargoId: data.cargoId,
      nivelEducativoId: data.nivelEducativoId,
      // etc.
    });

  }

  ngOnInit(): void {
    this.cargarService.getCargos().subscribe({
      next: (res) => this.cargo = res,
      error: (err) => console.error('Error al cargar cargos', err)
    });
  
    this.cargarService.getnivelEducativo().subscribe({
      next: (res) => this.nivelEducativo = res,
      error: (err) => console.error('Error al cargar nivel educativo', err)
    }); 
  }
  

  onSubmit(): void {
    if (this.empleadoForm.invalid) {
      alert('Formulario inválido');
      return;
    }

    console.log(this.data.empleadoId)
  
    const datosActualizados: SaveEmpleadoDTO = this.empleadoForm.value;
  
    this.cargarService.editEmpleado(this.data.empleadoId, datosActualizados).subscribe({
      next: () => {
        alert('Empleado actualizado exitosamente');
        console.log(datosActualizados);
        this.dialogRef.close(true); // ✅ Notificamos al padre que hubo actualización
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
        alert('Error al actualizar empleado');
      }
    });
  }

  close(){
    this.dialogRef.close();
  }

 
  
  

}
