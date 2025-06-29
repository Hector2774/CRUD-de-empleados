using System;
using System.Collections.Generic;

namespace AudApi.Models;

public partial class Empleado
{
    public int EmpleadoId { get; set; }

    public string? Nombres { get; set; }

    public string? Apellidos { get; set; }

    public string? Identidad { get; set; }

    public DateOnly? FechaContratacion { get; set; }

    public string? Telefono { get; set; }

    public string? Correo { get; set; }

    public int? NivelEducativoId { get; set; }

    public int? CargoId { get; set; }

    public byte[]? FotoEmpleado { get; set; }

    public virtual Cargo? Cargo { get; set; }

    public virtual NivelEducativo? NivelEducativo { get; set; }

    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
