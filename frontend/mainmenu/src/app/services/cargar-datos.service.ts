import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cargos } from '../models/cargos.model';
import { NivelEducativo } from '../models/nivel-educativo.model';
import { SaveEmpleadoDTO } from '../models/save-empleado.dto';

@Injectable({
  providedIn: 'root'
})
export class CargarDatosService {
  private apiUrl = 'https://localhost:44318/api/Empleados';

  constructor(private http: HttpClient) {}

  getCargos(): Observable<Cargos[]> {
    return this.http.get<Cargos[]>(`${this.apiUrl}/Cargos`);
  }

  getnivelEducativo(): Observable<NivelEducativo[]> {
    return this.http.get<NivelEducativo[]>(`${this.apiUrl}/niveles`);
  }

  saveEmpleado(empleado: SaveEmpleadoDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/guardarEmpleado`, empleado);
  }

  editEmpleado(id: number, datos: SaveEmpleadoDTO): Observable<any>{
    return this.http.put(`${this.apiUrl}/editEmpleado${id}`, datos);
  }

  eliminarEmpleado(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/EliminarEmpleado${id}`);
  }
  
}
