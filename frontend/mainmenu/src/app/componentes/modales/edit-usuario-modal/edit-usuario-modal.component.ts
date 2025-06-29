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
import { UserService } from '../../../services/user.service';
import { VerUserDTO, UserEstados } from '../../../models/user-estados.model';
import { UserRoles } from '../../../models/user-estados.model';
import { EditUserDTO } from '../../../models/user-estados.model';

@Component({
  selector: 'app-edit-usuario-modal',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './edit-usuario-modal.component.html',
  styleUrl: './edit-usuario-modal.component.scss'
})
export class EditUsuarioModalComponent {
  title = 'Editar usuario';
  estados: UserEstados[] = [];
  roles: UserRoles[] = [];
  userForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: VerUserDTO, public userService: UserService, private fb: FormBuilder, public _matDialogRef: MatDialogRef<EditUsuarioModalComponent>){
     this.userForm = this.fb.group({
       
        username: data.username,
        idRol: data.idRol,
        estadoUserId:data.estadoUserId,
        
        
      });
  }

  ngOnInit(): void{
    console.log(this.data);
    this.userService.getEstados().subscribe({
      next: (res) => {
        
        this.estados = res;
        console.log(this.estados);
      },
      error: (err) => {
        console.error('Error al cargar cargos:', err)
      }
  
    })
  
    this.userService.getRoles().subscribe({
      next: (res) => {
        
        this.roles = res;
        console.log(this.roles);
      },
      error: (err) => {
        console.error('Error al cargar cargos:', err)
      }
  
    })
   }

 onSubmit(): void {
    if (this.userForm.invalid) {
      alert('Formulario inválido');
      return;
    }

    console.log(this.data)
  
    const datosActualizados: EditUserDTO = this.userForm.value;
    
  
    this.userService.editUser(this.data.id, datosActualizados).subscribe({
      next: () => {
        alert('Usuario actualizado exitosamente');
        this._matDialogRef.close(true); // ✅ Notificamos al padre que hubo actualización
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
        alert('Error al actualizar empleado');
        console.log(datosActualizados);
      }
    });
  }

  close() {
   this._matDialogRef.close();
 }
}
 