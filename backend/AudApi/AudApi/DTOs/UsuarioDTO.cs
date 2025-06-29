using AudApi.Models;

namespace AudApi.DTOs
{
    public class UsuarioDTO
    {
        public int Id { get; set; }
        public string Username { get; set; }

        public int? EstadoUserId { get; set; }

        public int? EmpleadoId { get; set; }

        public int? IdRol { get; set; }

        public string Rol { get; set; }

        public string EstadoUserNombre { get; set; }  // Nombre del Estado
        public string EmpleadoNombre { get; set; }  // Nombre del Empleado


    }

    public class VerUserIdDTO
    {
        public int Id { get; set; }
        public string Username { get; set; }

        public int? EstadoUserId { get; set; }
        public int? IdRol { get; set; }

        public string Rol { get; set; }

        public string EstadoUserNombre { get; set; }  // Nombre del Estado
    
    }
}
