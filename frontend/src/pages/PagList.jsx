import { useEffect, useState } from 'react'
import BarraBusca from '../components/turistico/BarraBusca'
import CartaoPontoTuristico from '../components/turistico/CartaoPontoTuristico'
import DetalhePontoTuristico from '../components/turistico/DetalhePontoTuristico'
import Paginacao from '../components/turistico/Paginacao'
import { listarPontosTuristicos, obterPontoTuristico } from '../services/pontosTuristicosApi'

const ITENS_POR_PAGINA = 4

function PagList({ versaoListagem }) {
  const [termoDigitado, setTermoDigitado] = useState('')
  const [termoBusca, setTermoBusca] = useState('')
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [idSelecionado, setIdSelecionado] = useState(null)
  const [pontos, setPontos] = useState([])
  const [totalPaginas, setTotalPaginas] = useState(1)
  const [pontoSelecionado, setPontoSelecionado] = useState(null)
  const [carregandoLista, setCarregandoLista] = useState(true)
  const [carregandoDetalhe, setCarregandoDetalhe] = useState(false)
  const [erro, setErro] = useState('')
  const buscaAtiva = termoBusca.trim().length > 0

  useEffect(() => {
    let ignorar = false

    async function carregarLista() {
      try {
        setCarregandoLista(true)
        setErro('')

        const resposta = await listarPontosTuristicos({
          busca: termoBusca,
          pagina: paginaAtual,
          tamanhoPagina: ITENS_POR_PAGINA,
        })

        if (ignorar) {
          return
        }

        setPontos(resposta.itens)
        setTotalPaginas(Math.max(1, resposta.totalPaginas))

        if (!resposta.itens.some((ponto) => ponto.id === idSelecionado)) {
          setIdSelecionado(null)
          setPontoSelecionado(null)
        }
      } catch (error) {
        if (!ignorar) {
          setErro(error.message)
          setPontos([])
          setTotalPaginas(1)
        }
      } finally {
        if (!ignorar) {
          setCarregandoLista(false)
        }
      }
    }

    carregarLista()

    return () => {
      ignorar = true
    }
  }, [buscaAtiva, termoBusca, paginaAtual, versaoListagem, idSelecionado])

  useEffect(() => {
    if (!idSelecionado) {
      return
    }

    let ignorar = false

    async function carregarDetalhe() {
      try {
        setCarregandoDetalhe(true)
        const detalhe = await obterPontoTuristico(idSelecionado)

        if (!ignorar) {
          setPontoSelecionado(detalhe)
        }
      } catch {
        if (!ignorar) {
          setPontoSelecionado(null)
        }
      } finally {
        if (!ignorar) {
          setCarregandoDetalhe(false)
        }
      }
    }

    carregarDetalhe()

    return () => {
      ignorar = true
    }
  }, [idSelecionado])

  const atualizarBusca = (novoTermo) => {
    setTermoDigitado(novoTermo)
  }

  const buscar = () => {
    setTermoBusca(termoDigitado.trim())
    setPaginaAtual(1)
    setIdSelecionado(null)
    setPontoSelecionado(null)
  }

  const mudarPagina = (novaPagina) => {
    if (novaPagina < 1 || novaPagina > totalPaginas) {
      return
    }

    setPaginaAtual(novaPagina)
  }

  const mostrarDetalhe = carregandoDetalhe || Boolean(pontoSelecionado)

  return (
    <section className={mostrarDetalhe ? 'grid-listagem' : 'grid-listagem expandida'}>
      <div className="card coluna-listagem">
        <h2>{buscaAtiva ? 'Resultados' : 'Início'}</h2>
        <BarraBusca termo={termoDigitado} aoAlterar={atualizarBusca} aoBuscar={buscar} />

        <div className="lista-pontos">
          {carregandoLista ? <p className="mensagem-info">Carregando pontos turísticos...</p> : null}

          {!carregandoLista && erro ? <p className="mensagem-erro">{erro}</p> : null}

          {!carregandoLista && !erro && pontos.length > 0 ? (
            pontos.map((ponto) => (
              <CartaoPontoTuristico
                key={ponto.id}
                ponto={ponto}
                selecionado={idSelecionado === ponto.id}
                aoSelecionar={setIdSelecionado}
              />
            ))
          ) : null}

          {!carregandoLista && !erro && buscaAtiva && pontos.length === 0 ? (
            <p className="estado-vazio">Não encontrei resultados para a sua busca.</p>
          ) : null}

          {!carregandoLista && !erro && !buscaAtiva && pontos.length === 0 ? (
            <p className="estado-vazio">Nenhum ponto turístico cadastrado até o momento.</p>
          ) : null}
        </div>

        <Paginacao
          paginaAtual={paginaAtual}
          totalPaginas={totalPaginas}
          aoMudarPagina={mudarPagina}
        />
      </div>

      {carregandoDetalhe ? (
        <aside className="detalhe-ponto card">
          <h3>Detalhes do ponto turístico</h3>
          <p>Carregando detalhes...</p>
        </aside>
      ) : pontoSelecionado ? (
        <DetalhePontoTuristico ponto={pontoSelecionado} />
      ) : null}
    </section>
  )
}

export default PagList
