function Paginacao({ paginaAtual, totalPaginas, aoMudarPagina }) {
  if (totalPaginas <= 1) {
    return null
  }

  return (
    <div className="paginacao" aria-label="Paginação da listagem">
      <button
        type="button"
        onClick={() => aoMudarPagina(paginaAtual - 1)}
        disabled={paginaAtual === 1}
      >
        Voltar
      </button>
      <span>
        Página {paginaAtual} de {totalPaginas}
      </span>
      <button
        type="button"
        onClick={() => aoMudarPagina(paginaAtual + 1)}
        disabled={paginaAtual === totalPaginas}
      >
        Avançar
      </button>
    </div>
  )
}

export default Paginacao
