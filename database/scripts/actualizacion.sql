USE [master]
GO
/****** Object:  Database [db_usuario]    Script Date: 20/3/2025 15:38:35 ******/
CREATE DATABASE [db_usuario]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'db_usuario', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS01\MSSQL\DATA\db_usuario.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'db_usuario_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS01\MSSQL\DATA\db_usuario_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [db_usuario] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [db_usuario].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [db_usuario] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [db_usuario] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [db_usuario] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [db_usuario] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [db_usuario] SET ARITHABORT OFF 
GO
ALTER DATABASE [db_usuario] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [db_usuario] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [db_usuario] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [db_usuario] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [db_usuario] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [db_usuario] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [db_usuario] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [db_usuario] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [db_usuario] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [db_usuario] SET  DISABLE_BROKER 
GO
ALTER DATABASE [db_usuario] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [db_usuario] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [db_usuario] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [db_usuario] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [db_usuario] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [db_usuario] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [db_usuario] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [db_usuario] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [db_usuario] SET  MULTI_USER 
GO
ALTER DATABASE [db_usuario] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [db_usuario] SET DB_CHAINING OFF 
GO
ALTER DATABASE [db_usuario] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [db_usuario] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [db_usuario] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [db_usuario] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [db_usuario] SET QUERY_STORE = ON
GO
ALTER DATABASE [db_usuario] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [db_usuario]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 20/3/2025 15:38:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cargos]    Script Date: 20/3/2025 15:38:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cargos](
	[cargo_id] [int] IDENTITY(1,1) NOT NULL,
	[nombre_cargo] [varchar](50) NULL,
	[descripcion] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[cargo_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[empleados]    Script Date: 20/3/2025 15:38:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[empleados](
	[empleado_id] [int] IDENTITY(1,1) NOT NULL,
	[nombres] [varchar](50) NULL,
	[apellidos] [varchar](50) NULL,
	[identidad] [varchar](50) NULL,
	[fecha_contratacion] [date] NULL,
	[telefono] [varchar](50) NULL,
	[correo] [varchar](50) NULL,
	[nivel_educativo_id] [int] NULL,
	[cargo_id] [int] NULL,
	[foto_empleado] [image] NULL,
PRIMARY KEY CLUSTERED 
(
	[empleado_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[estado_user]    Script Date: 20/3/2025 15:38:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[estado_user](
	[estado_user_id] [int] IDENTITY(1,1) NOT NULL,
	[estado] [varchar](25) NULL,
	[descripcion] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[estado_user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[nivel_educativo]    Script Date: 20/3/2025 15:38:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[nivel_educativo](
	[nivel_educativo_id] [int] IDENTITY(1,1) NOT NULL,
	[nivel_educativo] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[nivel_educativo_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 20/3/2025 15:38:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[id_rol] [int] IDENTITY(1,1) NOT NULL,
	[rol] [varchar](25) NULL,
	[descripcion] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_rol] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 20/3/2025 15:38:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](50) NOT NULL,
	[pswrd] [varchar](50) NOT NULL,
	[id_rol] [int] NULL,
	[estado_user_id] [int] NULL,
	[empleado_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[empleados]  WITH CHECK ADD  CONSTRAINT [FK_cargos] FOREIGN KEY([cargo_id])
REFERENCES [dbo].[cargos] ([cargo_id])
GO
ALTER TABLE [dbo].[empleados] CHECK CONSTRAINT [FK_cargos]
GO
ALTER TABLE [dbo].[empleados]  WITH CHECK ADD  CONSTRAINT [FK_nivel_educativo] FOREIGN KEY([nivel_educativo_id])
REFERENCES [dbo].[nivel_educativo] ([nivel_educativo_id])
GO
ALTER TABLE [dbo].[empleados] CHECK CONSTRAINT [FK_nivel_educativo]
GO
ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [FK_empleados] FOREIGN KEY([empleado_id])
REFERENCES [dbo].[empleados] ([empleado_id])
GO
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [FK_empleados]
GO
ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [FK_estado_user] FOREIGN KEY([estado_user_id])
REFERENCES [dbo].[estado_user] ([estado_user_id])
GO
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [FK_estado_user]
GO
ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [fk_Rol] FOREIGN KEY([id_rol])
REFERENCES [dbo].[Roles] ([id_rol])
GO
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [fk_Rol]
GO
USE [master]
GO
ALTER DATABASE [db_usuario] SET  READ_WRITE 
GO
