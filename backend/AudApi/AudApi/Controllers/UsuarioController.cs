using AudApi.DTOs;
using AudApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static AudApi.DTOs.LogInDTO;


namespace AudApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly DbUsuarioContext _context;

        public UsuarioController(DbUsuarioContext context)
        {
            _context = context;
        }


        [HttpGet("listar")]
        public async Task<ActionResult<IEnumerable<UsuarioDTO>>> GetUsers()
        {
            var users = await _context.Usuarios
      .Include(u => u.IdRolNavigation) // Asegurar que se carga la relación con Role
      .Select(u => new UsuarioDTO
      {
          Id = u.Id,
          Username = u.Username,
          EmpleadoId = u.EmpleadoId ?? 0,
          EstadoUserId = u.EstadoUserId ?? 0,
          EmpleadoNombre = u.Empleado != null ? u.Empleado.Nombres : "Sin empleado",
          EstadoUserNombre = u.EstadoUser != null ? u.EstadoUser.Estado : "Sin estado",
          IdRol = u.IdRol ?? 0, // Si es null, asigna 0 por defecto
          Rol = u.IdRolNavigation != null ? u.IdRolNavigation.Rol : "Sin Rol" // Manejo de valores nulos
      })
      .ToListAsync();

            return Ok(users);
        }


       


        [HttpGet("GetUser{id}")]
        public async Task<ActionResult<VerUserIdDTO>> GetUserPorId(int id)
        {
            var usuario = await _context.Usuarios

     
      .Include(u => u.EstadoUser)
       .Include(u => u.IdRolNavigation)
      .FirstOrDefaultAsync(u => u.Id == id);
            if (usuario == null)
            {
                return NotFound();
            }

            var dto = new VerUserIdDTO
            {
                Id = usuario.Id,
                Username = usuario.Username,
                EstadoUserId = usuario.EstadoUserId,
                EstadoUserNombre = usuario.EstadoUser != null ? usuario.EstadoUser.Estado: "Sin estado",
                IdRol = usuario.IdRol ?? 0, // Si es null, asigna 0 por defecto
                Rol = usuario.IdRolNavigation != null ? usuario.IdRolNavigation.Rol : "Sin Rol" // Manejo de valores nulos
               

            };


            return Ok(dto);
        }

        [HttpPut("editUser{id}")]
        public async Task<IActionResult> ActualizarUsuario(int id, [FromBody] EditUserDTO dto)
        {
            var usuario = await _context.Usuarios.FindAsync(id);

            if (usuario == null)
                return NotFound("Usario no encontrado");

            // Actualizar campos
            usuario.Username = dto.Username;
            usuario.EstadoUserId = dto.EstadoUserId;
            usuario.IdRol = dto.IdRol;


            try
            {
                await _context.SaveChangesAsync();
                return Ok(new { message = "Usuario actualizado correctamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error al actualizar el usuario: " + ex.Message);
            }
        }

        [HttpPost("guardaruser")]
        public async Task<ActionResult> SaverUser([FromBody] GuardarUserDTO saveDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);


            var newUser = new Usuario
            {
                Username = saveDto.Username,
                Pswrd = saveDto.Pswrd, // Idealmente, debes hashear la contraseña
                EmpleadoId = saveDto.EmpleadoId
            };

            _context.Usuarios.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Usuario creado exitosamente" });
        }

        [HttpPost("guardarEmpleado")]
        public async Task<ActionResult> SaveEmpleado([FromBody] SaveEmpleado saveDto)
        {
            

      

            var newEmpleado = new Empleado
            {
                Nombres = saveDto.Nombres,
                Apellidos = saveDto.Apellidos,
                Identidad = saveDto.Identidad,
                FechaContratacion = saveDto.FechaContratacion,
                Telefono = saveDto.Telefono,
                Correo = saveDto.Correo,
                NivelEducativoId = saveDto.NivelEducativoId,
                CargoId = saveDto.CargoId,

              
            };

            _context.Empleados.Add(newEmpleado);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Empleado agregado exitosamente" });
        }



        [HttpPost("login")]
        public async Task<ActionResult<Usuario>> Login([FromBody] LoginDTO loginDto)
        {
            // Busca el usuario en la base de datos e incluye el rol
            var user = await _context.Usuarios

                .FirstOrDefaultAsync(u => u.Username == loginDto.Username);

            if (user == null)
            {
                return Unauthorized("Usuario o contraseña incorrectos");
            }

            // Comparar la contraseña (Si la contraseña está hasheada, usa un método como VerifyPasswordHash)
            if (user.Pswrd != loginDto.Pswrd)
            {
                return Unauthorized("Usuario o contraseña incorrectos");
            }

            // Devolver solo los datos necesarios
            var userDto = new UsuarioDTO
            {
                Id = user.Id,
                Username = user.Username,
                IdRol = user.IdRol,
                Rol = user.IdRolNavigation != null ? user.IdRolNavigation.Rol : "Sin Rol"

            };

            return Ok(userDto);
        }

        [HttpGet("Estado")]
        public async Task<ActionResult<IEnumerable<EstadoUserDTO>>> GetEstado()
        {
            var estados = await _context.EstadoUsers
                .Select(c => new EstadoUserDTO
                {
                    EstadoUserId = c.EstadoUserId,
                    Estado = c.Estado,
                })
                .ToListAsync();

            return Ok(estados);
        }

        [HttpGet("Rol")]
        public async Task<ActionResult<IEnumerable<RolUserDTO>>> GetRol()
        {
            var roles = await _context.Roles
                .Select(c => new RolUserDTO
                {
                    IdRol = c.IdRol,
                    Rol = c.Rol,
                })
                .ToListAsync();

            return Ok(roles);
        }


    }
}
