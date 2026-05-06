function BarraBusca({ termo, aoAlterar, aoBuscar }) {
  const aoSubmeter = (evento) => {
    evento.preventDefault()
    aoBuscar()
  }

  return (
    <form className="barra-busca" onSubmit={aoSubmeter}>
      <label htmlFor="termo-busca">Buscar ponto turístico</label>
      <div className="barra-busca-controles">
        <input
          id="termo-busca"
          type="text"
          placeholder="Digite um termo para buscar um ponto turístico..."
          value={termo}
          onChange={(evento) => aoAlterar(evento.target.value)}
        />
        <button type="submit" className="botao-busca">
          Buscar
        </button>
      </div>
    </form>
  )
}

export default BarraBusca
