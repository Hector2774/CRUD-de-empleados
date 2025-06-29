import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { VerEmpleadosService } from '../../ver-empleados.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import { FichaEmpleadoModalComponent } from '../modales/ficha-empleado-modal/ficha-empleado-modal.component';
import { AggEmpleadoModalComponent } from '../modales/agg-empleado-modal/agg-empleado-modal.component';
import { UsuariosTablaComponent } from '../usuarios-tabla/usuarios-tabla.component';



@Component({
  selector: 'app-empleados',
  imports: [MatTableModule, CommonModule, MatIconModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.scss'
})
export class EmpleadosComponent {

  empleados: any[] = [];

  constructor (private verEmpleadosService: VerEmpleadosService, private dialog: MatDialog,){}

  
  ngOnInit(): void {
    this.actualizarTabla();
   } 

   actualizarTabla(){
     this.verEmpleadosService.getVerEmpleado().subscribe({
       next: (data) =>{
         this.empleados = data;
         console.log('Cargados correctamente');
       },
       error: (error) =>{
         console.log('Error al cargar los empleados', error);
       }
     });
   }

   editarEmpleado(emp: any){
    console.log("Editar")
   }

   eliminarEmpleado(emp: any){
    console.log("Eliminar")
   }

   openFichaEmpleado(empleadoId: number){

    this.verEmpleadosService.getEmpleadoPorId(empleadoId).subscribe({
      next: (data) => {
     const dialogRef = this.dialog.open(FichaEmpleadoModalComponent, {
        width: '500px',
        data
         
      });
      dialogRef.afterClosed().subscribe((resultado) => {
        if (resultado) {
          this.actualizarTabla();// recarga la tabla solo si se guardó un nuevo empleado
        }
      });
        console.log('Empleado:', data);
        // aquí puedes abrir el modal y pasar los datos
      },
      error: (err) => {
        console.error('Error al cargar empleado:', err);
      }
    });
       }

   openAgregarEmpleado(){
    const dialogRef = this.dialog.open(AggEmpleadoModalComponent, {
      width: '830px'
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.actualizarTabla();// recarga la tabla solo si se guardó un nuevo empleado
      }
    });
}

openUsuarios(){
  console.log("holaaa")

this.dialog.open(UsuariosTablaComponent, {
    width: '800px',
    panelClass: 'modal-usuarios'
   
  });

}

}