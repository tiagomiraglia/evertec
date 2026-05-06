using Microsoft.EntityFrameworkCore;
using PontosTuristicos.Models;

namespace PontosTuristicos.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<PontoTuristico> PontosTuristicos => Set<PontoTuristico>();
}