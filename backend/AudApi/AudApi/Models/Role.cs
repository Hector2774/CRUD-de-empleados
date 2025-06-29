using System;
using System.Collections.Generic;

namespace AudApi.Models;

public partial class Role
{
    public int IdRol { get; set; }

    public string? Rol { get; set; }

    public string? Descripcion { get; set; }

    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
