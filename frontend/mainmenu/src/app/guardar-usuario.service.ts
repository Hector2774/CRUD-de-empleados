import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GuardarUsuarioService {
  private apiUrl = 'https://localhost:44318/api/Usuario';

  constructor(private http: HttpClient) {}

  SaveUser(username: string, pswrd: string, empleadoId: number): Observable<any> {
    const body = { username, pswrd, empleadoId};
    return this.http.post(`${this.apiUrl}/guardaruser`, body);
  }
}
