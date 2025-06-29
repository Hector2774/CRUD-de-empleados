using System;
using System.Collections.Generic;

namespace AudApi.Models;

public partial class Cargo
{
    public int CargoId { get; set; }

    public string? NombreCargo { get; set; }

    public string? Descripcion { get; set; }

    public virtual ICollection<Empleado> Empleados { get; set; } = new List<Empleado>();
}
