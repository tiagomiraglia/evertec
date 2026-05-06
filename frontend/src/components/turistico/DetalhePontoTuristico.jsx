import { Component } from 'react'

class DetalhePontoTuristico extends Component {
  constructor(props) {
    super(props)

    this.state = {
      destacado: false,
    }

    this.temporizador = null
  }

  componentDidMount() {
    if (this.props.ponto) {
      this.setState({ destacado: true })
      this.iniciarTemporizador()
    }
  }

  componentDidUpdate(prevProps) {
    const mudou = prevProps.ponto?.id !== this.props.ponto?.id

    if (mudou && this.props.ponto) {
      clearTimeout(this.temporizador)
      this.setState({ destacado: true })
      this.iniciarTemporizador()
    }

    if (mudou && !this.props.ponto) {
      clearTimeout(this.temporizador)
      this.setState({ destacado: false })
    }
  }

  componentWillUnmount() {
    clearTimeout(this.temporizador)
  }

  iniciarTemporizador() {
    this.temporizador = setTimeout(() => {
      this.setState({ destacado: false })
    }, 700)
  }

  render() {
    const { ponto } = this.props
    const { destacado } = this.state

    if (!ponto) {
      return (
        <aside className="detalhe-ponto vazio card">
          <h3>Detalhes do ponto turístico</h3>
          <p>Selecione um item da lista para visualizar as informações completas.</p>
        </aside>
      )
    }

    return (
      <aside className={`detalhe-ponto card${destacado ? ' destacado' : ''}`}>
        <h3>{ponto.nome}</h3>
        <p><strong>Descrição:</strong> {ponto.descricao}</p>
        <p><strong>Localização:</strong> {ponto.localizacao}</p>
        <p><strong>Cidade/Estado:</strong> {ponto.cidade} - {ponto.estado}</p>
      </aside>
    )
  }
}

export default DetalhePontoTuristico
