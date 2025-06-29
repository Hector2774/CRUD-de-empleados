import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VerEmpleadoDTO } from './ver-empleado.dto';


@Injectable({
  providedIn: 'root'
})
export class VerEmpleadosService {

  private apiUrl = 'https://localhost:44318/api/Empleados'; 
  constructor(private http: HttpClient) { }
  
  getVerEmpleado(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/VerEmpleados`);
  }

  getEmpleadoPorId(id: number): Observable<VerEmpleadoDTO> {
    return this.http.get<VerEmpleadoDTO>(`${this.apiUrl}/${id}`);
  }
}
