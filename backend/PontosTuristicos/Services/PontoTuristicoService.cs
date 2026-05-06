using Microsoft.EntityFrameworkCore;
using PontosTuristicos.Contracts;
using PontosTuristicos.Data;
using PontosTuristicos.Models;

namespace PontosTuristicos.Services;

public class PontoTuristicoService(AppDbContext context) : IPontoTuristicoService
{
    public async Task<PaginacaoResponse<PontoTuristico>> ListarAsync(string? busca, int pagina, int tamanhoPagina)
    {
        pagina = pagina < 1 ? 1 : pagina;
        tamanhoPagina = tamanhoPagina is < 1 or > 50 ? 10 : tamanhoPagina;

        var query = context.PontosTuristicos.AsQueryable();

        if (!string.IsNullOrWhiteSpace(busca))
        {
            var termo = busca.Trim().ToLower();
            query = query.Where(ponto =>
                ponto.Nome.ToLower().Contains(termo) ||
                ponto.Descricao.ToLower().Contains(termo) ||
                ponto.Localizacao.ToLower().Contains(termo));
        }

        var totalItens = await query.CountAsync();
        var itens = await query
            .OrderByDescending(ponto => ponto.DataInclusao)
            .Skip((pagina - 1) * tamanhoPagina)
            .Take(tamanhoPagina)
            .ToListAsync();

        return new PaginacaoResponse<PontoTuristico>
        {
            Pagina = pagina,
            TamanhoPagina = tamanhoPagina,
            TotalItens = totalItens,
            TotalPaginas = (int)Math.Ceiling(totalItens / (double)tamanhoPagina),
            Itens = itens
        };
    }

    public Task<PontoTuristico?> ObterPorIdAsync(int id)
    {
        return context.PontosTuristicos.FirstOrDefaultAsync(ponto => ponto.Id == id);
    }

    public async Task<PontoTuristico> CriarAsync(CriarPontoTuristicoRequest request)
    {
        var ponto = new PontoTuristico
        {
            Nome = request.Nome.Trim(),
            Descricao = request.Descricao.Trim(),
            Localizacao = request.Localizacao.Trim(),
            Cidade = request.Cidade.Trim(),
            Estado = request.Estado.Trim().ToUpperInvariant(),
            DataInclusao = DateTime.UtcNow
        };

        context.PontosTuristicos.Add(ponto);
        await context.SaveChangesAsync();

        return ponto;
    }

    public async Task<PontoTuristico?> AtualizarAsync(int id, AtualizarPontoTuristicoRequest request)
    {
        var ponto = await context.PontosTuristicos.FirstOrDefaultAsync(item => item.Id == id);

        if (ponto is null)
        {
            return null;
        }

        ponto.Nome = request.Nome.Trim();
        ponto.Descricao = request.Descricao.Trim();
        ponto.Localizacao = request.Localizacao.Trim();
        ponto.Cidade = request.Cidade.Trim();
        ponto.Estado = request.Estado.Trim().ToUpperInvariant();

        await context.SaveChangesAsync();

        return ponto;
    }
}