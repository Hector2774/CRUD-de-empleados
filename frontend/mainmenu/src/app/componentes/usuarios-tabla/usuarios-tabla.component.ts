import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { ListarService } from '../../listar.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import { AggUsuarioModalComponent } from '../modales/agg-usuario-modal/agg-usuario-modal.component';
import { EditUsuarioModalComponent } from '../modales/edit-usuario-modal/edit-usuario-modal.component';
import { readSync } from 'fs';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-usuarios-tabla',
  imports: [MatTableModule, CommonModule, MatIconModule],
  templateUrl: './usuarios-tabla.component.html',
  styleUrl: './usuarios-tabla.component.scss'
})


export class UsuariosTablaComponent implements OnInit{
    usuarios: any[] = [];

    constructor (private listarService: ListarService, private dialog: MatDialog, private getUserService: UserService){}


    ngOnInit(): void {
     this.actualizarTabla();
    }

    actualizarTabla(){
      this.listarService.getUsers().subscribe({
        next: (data) =>{
          this.usuarios = data;
          console.log('Cargados correctamente');
        },
        error: (error) =>{
          console.log('Error al cargar los usuarios', error);
        }
      });
    }

    openRegisterDialog() {
      const _matDialogRef = this.dialog.open(AggUsuarioModalComponent, {
        width: '400px',  // Personaliza el ancho
        height: 'auto',   // Ajusta la altura automáticamente
        maxWidth: '90vw',
      });

      _matDialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.actualizarTabla();
        }
      });
    }

    openEditUsuario(id: number){
      this.getUserService.getUserPorId(id).subscribe({
        next: (data) => {
          
          const _matDialogRef = this.dialog.open(EditUsuarioModalComponent, {
            width: '400px',  // Personaliza el ancho
            height: 'auto',   // Ajusta la altura automáticamente
            maxWidth: '90vw',
            data
          });

          _matDialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.actualizarTabla();
            }
          });
        }
      })
      
    }
    }
   
