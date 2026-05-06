using Microsoft.AspNetCore.Mvc;
using PontosTuristicos.Contracts;
using PontosTuristicos.Models;
using PontosTuristicos.Services;

namespace PontosTuristicos.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PontosTuristicosController(IPontoTuristicoService service) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<PaginacaoResponse<PontoTuristico>>> Listar([FromQuery] string? busca, [FromQuery] int pagina = 1, [FromQuery] int tamanhoPagina = 10)
    {
        var resultado = await service.ListarAsync(busca, pagina, tamanhoPagina);
        return Ok(resultado);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<PontoTuristico>> ObterPorId(int id)
    {
        var ponto = await service.ObterPorIdAsync(id);

        if (ponto is null)
        {
            return NotFound();
        }

        return Ok(ponto);
    }

    [HttpPost]
    public async Task<ActionResult<PontoTuristico>> Criar([FromBody] CriarPontoTuristicoRequest request)
    {
        var ponto = await service.CriarAsync(request);

        return CreatedAtAction(nameof(ObterPorId), new { id = ponto.Id }, ponto);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<PontoTuristico>> Atualizar(int id, [FromBody] AtualizarPontoTuristicoRequest request)
    {
        var ponto = await service.AtualizarAsync(id, request);

        if (ponto is null)
        {
            return NotFound();
        }

        return Ok(ponto);
    }
}