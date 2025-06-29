import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VerUserDTO, UserEstados } from '../models/user-estados.model';
import { UserRoles } from '../models/user-estados.model';
import { EditUserDTO } from '../models/user-estados.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:44318/api/Usuario';
  constructor(private http: HttpClient) { }

  getEstados(): Observable<UserEstados[]>{
    return this.http.get<UserEstados[]>(`${this.apiUrl}/Estado`); 
  }

  getRoles(): Observable<UserRoles[]>{
    return this.http.get<UserRoles[]>(`${this.apiUrl}/Rol`); 
  }
  
   getUserPorId(id: number): Observable<VerUserDTO> {
      return this.http.get<VerUserDTO>(`${this.apiUrl}/GetUser${id}`);
    }

   editUser(id: number, datos: EditUserDTO): Observable<any>{
      return this.http.put(`${this.apiUrl}/editUser${id}`, datos);
    }
}
