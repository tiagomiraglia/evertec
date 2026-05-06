import { useState } from 'react'
import CampoTexto from '../components/form/CampoTexto'
import AreaTexto from '../components/form/AreaTexto'
import SeletorEstado from '../components/form/SeletorEstado'
import SeletorCidade from '../components/form/SeletorCidade'
import { criarPontoTuristico } from '../services/pontosTuristicosApi'

const FORMULARIO_INICIAL = {
  nome: '',
  descricao: '',
  localizacao: '',
  cidade: '',
  estado: '',
}

function PagCad({ aoCadastrar, aoVoltar }) {
  const [formulario, setFormulario] = useState(FORMULARIO_INICIAL)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')

  const atualizarCampo = (campo, valor) => {
    setFormulario((atual) => ({ ...atual, [campo]: valor }))
  }

  const enviarFormulario = async (evento) => {
    evento.preventDefault()

    try {
      setCarregando(true)
      setErro('')

      await criarPontoTuristico(formulario)

      setFormulario(FORMULARIO_INICIAL)
      aoCadastrar()
    } catch (error) {
      setErro(error.message)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <section className="card pagina-cadastro">
      <h2>Cadastro de ponto turístico</h2>
      <form onSubmit={enviarFormulario} className="formulario-cadastro">
        <CampoTexto
          id="nome"
          rotulo="Nome"
          valor={formulario.nome}
          aoAlterar={(valor) => atualizarCampo('nome', valor)}
          obrigatorio
          maxLength={120}
          placeholder="Ex.: Museu do Amanhã"
        />

        <AreaTexto
          id="descricao"
          rotulo="Descrição"
          valor={formulario.descricao}
          aoAlterar={(valor) => atualizarCampo('descricao', valor)}
          obrigatorio
          maxLength={100}
          placeholder="Descreva o ponto turístico em até 100 caracteres"
        />

        <CampoTexto
          id="localizacao"
          rotulo="Localização"
          valor={formulario.localizacao}
          aoAlterar={(valor) => atualizarCampo('localizacao', valor)}
          obrigatorio
          maxLength={180}
          placeholder="Endereço ou referência"
        />

        <div className="linha-dupla">
          <SeletorEstado
            id="estado"
            valor={formulario.estado}
            aoAlterar={(valor) => atualizarCampo('estado', valor)}
            obrigatorio
          />

          <SeletorCidade
            id="cidade"
            valor={formulario.cidade}
            estado={formulario.estado}
            aoAlterar={(valor) => atualizarCampo('cidade', valor)}
            obrigatorio
          />
        </div>

        <div className="acoes-cadastro">
          <button type="button" className="botao-secundario" onClick={aoVoltar}>
            Voltar
          </button>

          <button type="submit" className="botao-primario" disabled={carregando}>
            {carregando ? 'Salvando...' : 'Cadastrar'}
          </button>
        </div>

        {erro ? <p className="mensagem-erro">{erro}</p> : null}
      </form>
    </section>
  )
}

export default PagCad
