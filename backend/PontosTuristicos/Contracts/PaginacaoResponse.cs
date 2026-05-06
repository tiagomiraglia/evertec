namespace PontosTuristicos.Contracts;

public class PaginacaoResponse<T>
{
    public int Pagina { get; set; }
    public int TamanhoPagina { get; set; }
    public int TotalItens { get; set; }
    public int TotalPaginas { get; set; }
    public IReadOnlyCollection<T> Itens { get; set; } = [];
}