import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Role {
  idRol: number;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor() { }
}
