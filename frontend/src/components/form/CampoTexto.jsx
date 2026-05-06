function CampoTexto({ id, rotulo, valor, aoAlterar, obrigatorio = false, maxLength, placeholder }) {
  return (
    <div className="campo-formulario">
      <label htmlFor={id}>{rotulo}</label>
      <input
        id={id}
        type="text"
        value={valor}
        onChange={(evento) => aoAlterar(evento.target.value)}
        required={obrigatorio}
        maxLength={maxLength}
        placeholder={placeholder}
      />
    </div>
  )
}

export default CampoTexto
