using System;
using System.Collections.Generic;

namespace AudApi.Models;

public partial class NivelEducativo
{
    public int NivelEducativoId { get; set; }

    public string? NivelEducativo1 { get; set; }

    public virtual ICollection<Empleado> Empleados { get; set; } = new List<Empleado>();
}
