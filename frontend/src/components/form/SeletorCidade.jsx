import { Component } from 'react'

class SeletorCidade extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cidades: [],
      carregando: false,
      erro: null,
    }

    this.controlador = null
  }

  componentDidMount() {
    if (this.props.estado) {
      this.buscarCidades(this.props.estado)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.estado !== this.props.estado) {
      this.props.aoAlterar('')
      this.buscarCidades(this.props.estado)
    }
  }

  componentWillUnmount() {
    if (this.controlador) {
      this.controlador.abort()
    }
  }

  buscarCidades(estado) {
    if (!estado) {
      this.setState({ cidades: [], carregando: false, erro: null })
      return
    }

    if (this.controlador) {
      this.controlador.abort()
    }

    this.controlador = new AbortController()
    this.setState({ carregando: true, erro: null, cidades: [] })

    fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios?orderBy=nome`,
      { signal: this.controlador.signal },
    )
      .then((resposta) => {
        if (!resposta.ok) throw new Error('Falha ao consultar o IBGE')
        return resposta.json()
      })
      .then((dados) => {
        this.setState({ cidades: dados, carregando: false })
        this.controlador = null
      })
      .catch((erro) => {
        if (erro.name !== 'AbortError') {
          this.setState({ erro: 'Não foi possível carregar as cidades.', carregando: false })
        }
      })
  }

  render() {
    const { id, valor, aoAlterar, obrigatorio, estado } = this.props
    const { cidades, carregando, erro } = this.state

    return (
      <div className="campo-formulario">
        <label htmlFor={id}>Cidade</label>

        {carregando ? (
          <p className="campo-carregando">Carregando cidades...</p>
        ) : (
          <select
            id={id}
            value={valor}
            onChange={(evento) => aoAlterar(evento.target.value)}
            required={obrigatorio}
            disabled={!estado}
          >
            <option value="">
              {!estado ? 'Selecione o estado primeiro' : 'Selecione a cidade'}
            </option>
            {cidades.map((cidade) => (
              <option key={cidade.id} value={cidade.nome}>
                {cidade.nome}
              </option>
            ))}
          </select>
        )}

        {erro && <small className="campo-erro">{erro}</small>}
      </div>
    )
  }
}

export default SeletorCidade
