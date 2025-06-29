import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:44318/api/Usuario'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  login(username: string, pswrd: string): Observable<any> {
    
    const body = { username, pswrd };
    return this.http.post<any>(`${this.apiUrl}/login`, body);
  }
}