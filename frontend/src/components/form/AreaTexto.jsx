function AreaTexto({ id, rotulo, valor, aoAlterar, obrigatorio = false, maxLength, placeholder }) {
  return (
    <div className="campo-formulario">
      <label htmlFor={id}>{rotulo}</label>
      <textarea
        id={id}
        value={valor}
        onChange={(evento) => aoAlterar(evento.target.value)}
        required={obrigatorio}
        maxLength={maxLength}
        placeholder={placeholder}
        rows={3}
      />
      <small>{valor.length}/{maxLength}</small>
    </div>
  )
}

export default AreaTexto
