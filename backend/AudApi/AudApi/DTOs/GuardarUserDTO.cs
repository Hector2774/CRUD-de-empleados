namespace AudApi.DTOs
{
    public class GuardarUserDTO
    {

        public string Username { get; set; } = null!;

        public string Pswrd { get; set; } = null!;

        public int? EmpleadoId { get; set; }
    }
}

public class EditUserDTO
{
    public string Username { get; set; }
    public int IdRol { get; set; }
    public int EstadoUserId { get; set; }
}


public class EstadoUserDTO
{
    public int EstadoUserId { get; set; }

    public string? Estado { get; set; }
}

public class RolUserDTO
{
    public int IdRol { get; set; }

    public string? Rol { get; set; }
}
