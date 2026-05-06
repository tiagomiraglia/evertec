using System.ComponentModel.DataAnnotations;

namespace PontosTuristicos.Models;

public class PontoTuristico
{
    public int Id { get; set; }

    [Required]
    [MaxLength(120)]
    public string Nome { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Descricao { get; set; } = string.Empty;

    [Required]
    [MaxLength(180)]
    public string Localizacao { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Cidade { get; set; } = string.Empty;

    [Required]
    [StringLength(2, MinimumLength = 2)]
    public string Estado { get; set; } = string.Empty;

    public DateTime DataInclusao { get; set; } = DateTime.UtcNow;
}