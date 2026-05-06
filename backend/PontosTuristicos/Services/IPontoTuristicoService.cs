using PontosTuristicos.Contracts;
using PontosTuristicos.Models;

namespace PontosTuristicos.Services;

public interface IPontoTuristicoService
{
    Task<PaginacaoResponse<PontoTuristico>> ListarAsync(string? busca, int pagina, int tamanhoPagina);
    Task<PontoTuristico?> ObterPorIdAsync(int id);
    Task<PontoTuristico> CriarAsync(CriarPontoTuristicoRequest request);
    Task<PontoTuristico?> AtualizarAsync(int id, AtualizarPontoTuristicoRequest request);
}