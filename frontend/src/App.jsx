import { useState } from 'react'
import MenuNavegacao from './components/layout/MenuNavegacao'
import PagCad from './pages/PagCad'
import PagList from './pages/PagList'
import './App.css'

function App() {
  const [paginaAtual, setPaginaAtual] = useState('listagem')
  const [versaoListagem, setVersaoListagem] = useState(0)
  const [logoSrc, setLogoSrc] = useState('')
  const [erroLogo, setErroLogo] = useState('')

  const concluirCadastro = () => {
    setVersaoListagem((versaoAtual) => versaoAtual + 1)
    setPaginaAtual('listagem')
  }

  const selecionarLogo = (arquivo) => {
    if (!arquivo) {
      return
    }

    if (!arquivo.type.startsWith('image/')) {
      setErroLogo('Selecione um arquivo de imagem válido.')
      return
    }

    const leitor = new FileReader()

    leitor.onload = () => {
      setLogoSrc(String(leitor.result || ''))
      setErroLogo('')
    }

    leitor.onerror = () => {
      setErroLogo('Não foi possível carregar o logotipo selecionado.')
    }

    leitor.readAsDataURL(arquivo)
  }

  return (
    <div className="app-shell">
      <MenuNavegacao
        paginaAtual={paginaAtual}
        aoAbrirCadastro={() => setPaginaAtual('cadastro')}
        logoSrc={logoSrc}
        erroLogo={erroLogo}
        aoSelecionarLogo={selecionarLogo}
      />

      <main>
        {paginaAtual === 'listagem' ? (
          <PagList versaoListagem={versaoListagem} />
        ) : (
          <PagCad aoCadastrar={concluirCadastro} aoVoltar={() => setPaginaAtual('listagem')} />
        )}
      </main>
    </div>
  )
}

export default App
