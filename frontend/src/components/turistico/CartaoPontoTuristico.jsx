function CartaoPontoTuristico({ ponto, selecionado, aoSelecionar }) {
  const resumoDescricao = ponto.descricao.length > 120
    ? `${ponto.descricao.slice(0, 120)}...`
    : ponto.descricao

  return (
    <article className={selecionado ? 'cartao-ponto selecionado' : 'cartao-ponto'}>
      <h3>{ponto.nome}</h3>
      <p className="descricao-cartao">{resumoDescricao}</p>
      <p>{ponto.localizacao}</p>
      <span>
        {ponto.cidade} - {ponto.estado}
      </span>

      <button type="button" className="botao-detalhes-lista" onClick={() => aoSelecionar(ponto.id)}>
        ver detalhes
      </button>
    </article>
  )
}

export default CartaoPontoTuristico
