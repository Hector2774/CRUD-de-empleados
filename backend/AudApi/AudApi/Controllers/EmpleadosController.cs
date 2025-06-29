using AudApi.Models;
using AudApi.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AudApi.Controllers;

[Route("api/[controller]")]
[ApiController]

public class EmpleadosController : ControllerBase
{
    private readonly DbUsuarioContext _context;
    public EmpleadosController(DbUsuarioContext context)
    {
       _context = context;
    }


    [HttpGet("VerEmpleados")]
    public async Task<ActionResult<IEnumerable<VerEmpleadoDTO>>> GetVerEmpleado()
    {
        var empleados = await _context.Empleados

  .Include(e => e.Usuarios)// Asegurar que se carga la relación con Role
  .Select(e => new VerEmpleadoDTO
  {

      EmpleadoId = e.EmpleadoId,
      Nombres = e.Nombres,
      Apellidos = e.Apellidos,
      Identidad = e.Identidad,
      FechaContratacion = e.FechaContratacion,
      Telefono = e.Telefono,
      Correo = e.Correo,
      NivelEducativoId = e.NivelEducativoId ?? 0,
      NivelEducativoNombre = e.NivelEducativo != null ? e.NivelEducativo.NivelEducativo1 : "sin nivel Educativo",
      CargoId = e.CargoId ?? 0,
      CargoNombre = e.Cargo != null ? e.Cargo.NombreCargo : "sin cargo",
      Usuarios = e.Usuarios.Select(u => new EmpleadoUsuarioDTO
      {
          Id = u.Id,
          Username = u.Username,

      }).ToList(),

  })
  .ToListAsync();

        return Ok(empleados);
    }

    [HttpGet("Cargos")]
    public async Task<ActionResult<IEnumerable<CargoDTO>>> GetCargos()
    {
        var cargos = await _context.Cargos
            .Select(c => new CargoDTO
            {
                CargoId = c.CargoId,
                NombreCargo = c.NombreCargo
            })
            .ToListAsync();

        return Ok(cargos);
    }

    [HttpGet("niveles")]
    public async Task<ActionResult<IEnumerable<CargoDTO>>> getNivelEducativo()
    {
        var niveles = await _context.NivelEducativos
            .Select(n => new NivelEducativoDTO
            {
                NivelEducativoId = n.NivelEducativoId,
                NivelEducativoNombre = n.NivelEducativo1
            })
            .ToListAsync();

        return Ok(niveles);
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

        return Ok(new { empleadoId = newEmpleado.EmpleadoId });
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<VerEmpleadoDTO>> GetEmpleadoPorId(int id)
    {
        var empleado = await _context.Empleados

  .Include(e => e.Usuarios)
  .Include(e => e.NivelEducativo)
   .Include(e => e.Cargo)
  .FirstOrDefaultAsync(e => e.EmpleadoId == id);
        if (empleado == null)
        {
            return NotFound();
        }

        var dto = new VerEmpleadoDTO
        {

            EmpleadoId = empleado.EmpleadoId,
            Nombres = empleado.Nombres,
            Apellidos = empleado.Apellidos,
            Identidad = empleado.Identidad,
            FechaContratacion = empleado.FechaContratacion,
            Telefono = empleado.Telefono,
            Correo = empleado.Correo,
            NivelEducativoId = empleado.NivelEducativoId ?? 0,
            NivelEducativoNombre = empleado.NivelEducativo != null ? empleado.NivelEducativo.NivelEducativo1 : "no NIVEL",
            CargoId = empleado.CargoId ?? 0,
            CargoNombre = empleado.Cargo != null ? empleado.Cargo.NombreCargo : "sin cargo",
            Usuarios = empleado.Usuarios.Select(u => new EmpleadoUsuarioDTO
            {
                Id = u.Id,
                Username = u.Username,

            }).ToList(),

        };


        return Ok(dto);
    }

    [HttpPut("editEmpleado{id}")]
    public async Task<IActionResult> ActualizarEmpleado(int id, [FromBody] EditEmpleadoDTO dto)
    {
        var empleado = await _context.Empleados.FindAsync(id);

        if (empleado == null)
            return NotFound("Empleado no encontrado");

        // Actualizar campos
        empleado.Nombres = dto.Nombres;
        empleado.Apellidos = dto.Apellidos;
        empleado.Identidad = dto.Identidad;
        empleado.FechaContratacion = dto.FechaContratacion;
        empleado.Telefono = dto.Telefono;
        empleado.Correo = dto.Correo;
        empleado.CargoId = dto.CargoId;
        empleado.NivelEducativoId = dto.NivelEducativoId;

        try
        {
            await _context.SaveChangesAsync();
            return Ok(new { message = "Empleado actualizado correctamente" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Error al actualizar el empleado: " + ex.Message);
        }
    }

    [HttpDelete("EliminarEmpleado{id}")]
    public async Task<IActionResult> EliminarEmpleado(int id)
    {
        var empleado = await _context.Empleados
            .Include(e => e.Usuarios) 
            .FirstOrDefaultAsync(e => e.EmpleadoId == id);

        if (empleado == null)
            return NotFound("Empleado no encontrado");

       
        if (empleado.Usuarios.Any())
            _context.Usuarios.RemoveRange(empleado.Usuarios);

        _context.Empleados.Remove(empleado);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Empleado y usuario(s) eliminados correctamente" });
    }



}
