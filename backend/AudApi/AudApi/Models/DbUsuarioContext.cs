using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace AudApi.Models;

public partial class DbUsuarioContext : DbContext
{
    public DbUsuarioContext()
    {
    }

    public DbUsuarioContext(DbContextOptions<DbUsuarioContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cargo> Cargos { get; set; }

    public virtual DbSet<Empleado> Empleados { get; set; }

    public virtual DbSet<EstadoUser> EstadoUsers { get; set; }

    public virtual DbSet<NivelEducativo> NivelEducativos { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=ARELY\\SQLEXPRESS01;Database=db_usuario;Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cargo>(entity =>
        {
            entity.HasKey(e => e.CargoId).HasName("PK__cargos__982828C4B5C3980A");

            entity.ToTable("cargos");

            entity.Property(e => e.CargoId).HasColumnName("cargo_id");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("descripcion");
            entity.Property(e => e.NombreCargo)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombre_cargo");
        });

        modelBuilder.Entity<Empleado>(entity =>
        {
            entity.HasKey(e => e.EmpleadoId).HasName("PK__empleado__6FBB65FD4FE3C66A");

            entity.ToTable("empleados");

            entity.Property(e => e.EmpleadoId).HasColumnName("empleado_id");
            entity.Property(e => e.Apellidos)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("apellidos");
            entity.Property(e => e.CargoId).HasColumnName("cargo_id");
            entity.Property(e => e.Correo)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("correo");
            entity.Property(e => e.FechaContratacion).HasColumnName("fecha_contratacion");
            entity.Property(e => e.FotoEmpleado)
                .HasColumnType("image")
                .HasColumnName("foto_empleado");
            entity.Property(e => e.Identidad)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("identidad");
            entity.Property(e => e.NivelEducativoId).HasColumnName("nivel_educativo_id");
            entity.Property(e => e.Nombres)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombres");
            entity.Property(e => e.Telefono)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("telefono");

            entity.HasOne(d => d.Cargo).WithMany(p => p.Empleados)
                .HasForeignKey(d => d.CargoId)
                .HasConstraintName("FK_cargos");

            entity.HasOne(d => d.NivelEducativo).WithMany(p => p.Empleados)
                .HasForeignKey(d => d.NivelEducativoId)
                .HasConstraintName("FK_nivel_educativo");
        });

        modelBuilder.Entity<EstadoUser>(entity =>
        {
            entity.HasKey(e => e.EstadoUserId).HasName("PK__estado_u__AC07AB1A1A511388");

            entity.ToTable("estado_user");

            entity.Property(e => e.EstadoUserId).HasColumnName("estado_user_id");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("descripcion");
            entity.Property(e => e.Estado)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("estado");
        });

        modelBuilder.Entity<NivelEducativo>(entity =>
        {
            entity.HasKey(e => e.NivelEducativoId).HasName("PK__nivel_ed__37F40240A3520654");

            entity.ToTable("nivel_educativo");

            entity.Property(e => e.NivelEducativoId).HasColumnName("nivel_educativo_id");
            entity.Property(e => e.NivelEducativo1)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nivel_educativo");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.IdRol).HasName("PK__Roles__6ABCB5E0E21E2B15");

            entity.Property(e => e.IdRol).HasColumnName("id_rol");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("descripcion");
            entity.Property(e => e.Rol)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("rol");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Usuario__3213E83F32756FCE");

            entity.ToTable("Usuario");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.EmpleadoId).HasColumnName("empleado_id");
            entity.Property(e => e.EstadoUserId).HasColumnName("estado_user_id");
            entity.Property(e => e.IdRol).HasColumnName("id_rol");
            entity.Property(e => e.Pswrd)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("pswrd");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("username");

            entity.HasOne(d => d.Empleado).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.EmpleadoId)
                .HasConstraintName("FK_empleados");

            entity.HasOne(d => d.EstadoUser).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.EstadoUserId)
                .HasConstraintName("FK_estado_user");

            entity.HasOne(d => d.IdRolNavigation).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.IdRol)
                .HasConstraintName("fk_Rol");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
