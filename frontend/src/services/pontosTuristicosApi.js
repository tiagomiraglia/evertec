const API_URL = 'http://localhost:5226/api/PontosTuristicos'

const MENSAGEM_SEM_CONEXAO = 'Não foi possível conectar à API. Verifique se o backend está em execução.'

async function tratarResposta(resposta) {
  if (!resposta.ok) {
    let mensagem = 'Não foi possível concluir a operação.'

    try {
      const erro = await resposta.json()
      mensagem = erro.title || mensagem
    } catch {
    }

    throw new Error(mensagem)
  }

  return resposta.json()
}

async function executarRequisicao(url, opcoes) {
  try {
    return await fetch(url, opcoes)
  } catch {
    throw new Error(MENSAGEM_SEM_CONEXAO)
  }
}

export async function listarPontosTuristicos({ busca = '', pagina = 1, tamanhoPagina = 4 }) {
  const params = new URLSearchParams({
    pagina: String(pagina),
    tamanhoPagina: String(tamanhoPagina),
  })

  if (busca.trim()) {
    params.set('busca', busca.trim())
  }

  const resposta = await executarRequisicao(`${API_URL}?${params.toString()}`)
  return tratarResposta(resposta)
}

export async function obterPontoTuristico(id) {
  const resposta = await executarRequisicao(`${API_URL}/${id}`)
  return tratarResposta(resposta)
}

export async function criarPontoTuristico(dados) {
  const resposta = await executarRequisicao(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  })

  return tratarResposta(resposta)
}