import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { GuardarUsuarioService } from '../../../guardar-usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { UserService } from '../../../services/user.service';
import { UserEstados } from '../../../models/user-estados.model';
import { UserRoles } from '../../../models/user-estados.model';
@Component({
  selector: 'app-agg-usuario-modal',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './agg-usuario-modal.component.html',
  styleUrl: './agg-usuario-modal.component.scss'
})
export class AggUsuarioModalComponent {
  title = 'Agregar usuario';

  estados: UserEstados[] = [];
  roles: UserRoles[] = [];
  userForm: FormGroup;
 constructor( private userService: UserService, private fb: FormBuilder, private guardarUserService: GuardarUsuarioService,  public _matDialogRef: MatDialogRef<AggUsuarioModalComponent>){
  this.userForm = this.fb.group({
    empleadoId: ['', [Validators.required]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    estadoUserId: ['', [Validators.required,]],
    rolId: ['', [Validators.required,]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?=.*[a-zA-Z]).{8,}/)
    ]]
  });
 }

 close() {
  this._matDialogRef.close();
}

get password() {
  return this.userForm.get('password');
}



ngOnInit(): void{
  this.userService.getEstados().subscribe({
    next: (data) => {
      
      this.estados = data;
      console.log(this.estados);
    },
    error: (err) => {
      console.error('Error al cargar cargos:', err)
    }

  })

  this.userService.getRoles().subscribe({
    next: (data) => {
      
      this.roles = data;
      console.log(this.roles);
    },
    error: (err) => {
      console.error('Error al cargar cargos:', err)
    }

  })

 }

onSubmit(){
  if (this.userForm.invalid) {
    alert('Debe completar los campos correctamente.');
    return;
  }

  const { username, password, empleadoId } = this.userForm.value;

  this.guardarUserService.SaveUser(username, password, empleadoId).subscribe({
    next: (response) => {
      console.log('Usuario registrado', response);
      alert('Se ha registrado el usuario');
      this._matDialogRef.close();
    },
    error: (error) => {
      console.error('Error', error);
      alert('Error al guardar el usuario');
      console.log(username, password, empleadoId)
    }
  });
  
 }


}
