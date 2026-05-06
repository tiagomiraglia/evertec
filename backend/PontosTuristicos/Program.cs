using Microsoft.EntityFrameworkCore;
using PontosTuristicos.Data;
using PontosTuristicos.Models;
using PontosTuristicos.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IPontoTuristicoService, PontoTuristicoService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    context.Database.EnsureCreated();

    if (!context.PontosTuristicos.Any())
    {
        context.PontosTuristicos.AddRange(
            new PontoTuristico
            {
                Nome = "Cristo Redentor",
                Descricao = "Monumento no alto do Corcovado com vista panoramica da cidade.",
                Localizacao = "Parque Nacional da Tijuca, Rio de Janeiro",
                Cidade = "Rio de Janeiro",
                Estado = "RJ",
                DataInclusao = DateTime.UtcNow.AddDays(-4)
            },
            new PontoTuristico
            {
                Nome = "Elevador Lacerda",
                Descricao = "Cartao-postal de Salvador com ligacao entre cidade alta e baixa.",
                Localizacao = "Praca Tome de Souza, Salvador",
                Cidade = "Salvador",
                Estado = "BA",
                DataInclusao = DateTime.UtcNow.AddDays(-2)
            },
            new PontoTuristico
            {
                Nome = "Cataratas do Iguacu",
                Descricao = "Conjunto de quedas d agua em area de preservacao ambiental.",
                Localizacao = "Parque Nacional do Iguacu, Foz do Iguacu",
                Cidade = "Foz do Iguacu",
                Estado = "PR",
                DataInclusao = DateTime.UtcNow.AddDays(-1)
            });

        context.SaveChanges();
    }
}

app.UseCors("Frontend");
app.MapControllers();

app.Run();
