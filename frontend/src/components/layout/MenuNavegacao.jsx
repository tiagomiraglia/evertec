import { useRef } from 'react'

function MenuNavegacao({ paginaAtual, aoAbrirCadastro, logoSrc, erroLogo, aoSelecionarLogo }) {
  const inputLogoRef = useRef(null)

  const processarArquivo = (evento) => {
    const arquivo = evento.target.files?.[0]

    aoSelecionarLogo(arquivo)
    evento.target.value = ''
  }

  const abrirSeletorLogo = () => {
    inputLogoRef.current?.click()
  }

  return (
    <nav className="menu-navegacao" aria-label="Navegação principal">
      <button
        type="button"
        className="area-logotipo"
        aria-label="Escolher logotipo"
        onClick={abrirSeletorLogo}
        title="Clique para escolher o logo"
      >
        {logoSrc ? (
          <img src={logoSrc} alt="Logo selecionado" className="imagem-logo" />
        ) : (
          <span>Logotipo</span>
        )}
      </button>

      <div className="menu-lateral">
        {paginaAtual === 'listagem' ? (
          <button type="button" className="menu-item" onClick={aoAbrirCadastro}>
            Cadastrar um ponto turístico
          </button>
        ) : null}

        <input
          id="seletor-logo"
          ref={inputLogoRef}
          type="file"
          accept="image/*"
          onChange={processarArquivo}
          className="input-logo"
        />

        {erroLogo ? <p className="mensagem-erro erro-logo">{erroLogo}</p> : null}
      </div>
    </nav>
  )
}

export default MenuNavegacao
