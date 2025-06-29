export interface UserEstados{
    estadoUserId: number;
    estado: string;
}

export interface UserRoles{
    idRol: number;
    rol: string;
} 

export interface VerUserDTO {
    id: number;
    username: string;
    estadoUserId: number;
    idRol: number;
    rol: string;
    EstadoUserNombre: string;
  }

export interface EditUserDTO{
    username: string;
    idRol: number; 
    estadoUserId: number;
    
}
  