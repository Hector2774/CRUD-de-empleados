// models/ver-empleado.dto.ts (puedes usar otra ruta si preferís)
export interface VerEmpleadoDTO {
    empleadoId: number;
    nombres: string;
    apellidos: string;
    identidad: string;
    fechaContratacion: string;
    telefono: string;
    correo: string;
    nivelEducativoId: number;
    nivelEducativoNombre: string;
    cargoId: number;
    cargoNombre: string;
    usuarios: { id: number; username: string }[];
  }
  