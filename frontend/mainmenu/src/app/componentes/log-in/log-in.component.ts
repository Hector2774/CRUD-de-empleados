import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatLabel } from '@angular/material/form-field';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FloatLabelType, MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button'
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule, FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule, MatButtonModule,],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {

  username: string = '';
  password: string = '';
  

  constructor(private router: Router, private authService: AuthService){
   
  }
  onSubmit(){
    
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login exitoso', response);
        this.router.navigate(['/principal']);
        alert('Bienvenid@ ' + this.username); // Redirige al dashboard después del login
      },
      error: (error) => {
        if(this.username === '' || this.password === ''){
          alert('Debe completar los campos');
        }
        else{
          console.error('Error en el login', error);
        alert('Credenciales inválidas'); // Muestra un mensaje de error
        }
        
      }
    });
    
  }

}
