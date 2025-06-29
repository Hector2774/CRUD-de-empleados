using System;
using System.Collections.Generic;

namespace AudApi.Models;

public partial class EstadoUser
{
    public int EstadoUserId { get; set; }

    public string? Estado { get; set; }

    public string? Descripcion { get; set; }

    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
