import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
   
})
export class ListarService {
  private apiUrl = 'https://localhost:44318/api/Usuario'; 
  constructor(private http: HttpClient) { }
  
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listar`);
  }

}
