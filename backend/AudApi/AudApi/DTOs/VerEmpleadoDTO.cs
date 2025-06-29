using AudApi.Models;

namespace AudApi.DTOs
{
    public class VerEmpleadoDTO
    {
        public int EmpleadoId { get; set; }

        public string? Nombres { get; set; }

        public string? Apellidos { get; set; }

        public string? Identidad { get; set; }

        public DateOnly? FechaContratacion { get; set; }

        public string? Telefono { get; set; }

        public string? Correo { get; set; }

        public int? NivelEducativoId { get; set; }
        public string NivelEducativoNombre { get; set; }
        public int? CargoId { get; set; }
        
        public string CargoNombre { get; set; }

        

        public List<EmpleadoUsuarioDTO> Usuarios { get; set; } = new List<EmpleadoUsuarioDTO>();
    }

    public class EmpleadoUsuarioDTO
    {
        public int Id { get; set; }
        public string Username { get; set; }

        }
}
