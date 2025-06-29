import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { VerEmpleadoDTO } from '../../../ver-empleado.dto';// ajustá la ruta si es distinta
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { EditEmpleadoComponent } from '../edit-empleado/edit-empleado.component';
import { VerEmpleadosService } from '../../../ver-empleados.service';
import { CargarDatosService } from '../../../services/cargar-datos.service';

@Component({
  
  selector: 'app-ficha-empleado-modal',
  imports: [CommonModule, MatDialogModule, MatCardModule, MatIconModule,],
  templateUrl: './ficha-empleado-modal.component.html',
  styleUrl: './ficha-empleado-modal.component.scss'
})
export class FichaEmpleadoModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA)  public data: VerEmpleadoDTO,  private dialog: MatDialog, private empService: VerEmpleadosService, private empleadoService: CargarDatosService, private dialogRef: MatDialogRef<FichaEmpleadoModalComponent>) {}

  cargarEmpleadoActualizado(){
    this.empService.getEmpleadoPorId(this.data.empleadoId).subscribe({
      next: (empleado) => {
        this.data = empleado; // refrescamos la data que la ficha usa
      },
      error: (err) => {
        console.error('Error al cargar empleado actualizado', err);
      }
    });
  }

  openEditarEmpleado(){
    console.log("holaaa")
    console.log(this.data);
  const dialogRef =  this.dialog.open(EditEmpleadoComponent, {
      width: '600px',
      data: this.data
    });

    dialogRef.afterClosed().subscribe((actualizado) => {
      if (actualizado) {
        this.cargarEmpleadoActualizado();
      }
    });
  }

  
  eliminarEmpleado(): void{
    if (confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
      this.empleadoService.eliminarEmpleado(this.data.empleadoId).subscribe({
        next: () => {
          alert('Empleado eliminado correctamente');
          this.dialogRef.close(true); 
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('No se pudo eliminar el empleado');
        }
      });
    }
  }

  close(){
    this.dialogRef.close(true);
  }

}
