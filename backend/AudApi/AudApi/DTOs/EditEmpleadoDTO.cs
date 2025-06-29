namespace AudApi.DTOs
{
    public class EditEmpleadoDTO
    {
        public string? Nombres { get; set; }

        public string? Apellidos { get; set; }

        public string? Identidad { get; set; }

        public DateOnly? FechaContratacion { get; set; }

        public string? Telefono { get; set; }

        public string? Correo { get; set; }

        public int? NivelEducativoId { get; set; }

        public int? CargoId { get; set; }
    }
}
