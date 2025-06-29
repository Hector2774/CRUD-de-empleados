using System;
using System.Collections.Generic;

namespace AudApi.Models;

public partial class Usuario
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string Pswrd { get; set; } = null!;

    public int? IdRol { get; set; }

    public int? EstadoUserId { get; set; }

    public int? EmpleadoId { get; set; }

    public virtual Empleado? Empleado { get; set; }

    public virtual EstadoUser? EstadoUser { get; set; }

    public virtual Role? IdRolNavigation { get; set; }
}
