import { ESTADOS_BRASIL } from '../../data/estados'

function SeletorEstado({ id, valor, aoAlterar, obrigatorio = false }) {
  return (
    <div className="campo-formulario">
      <label htmlFor={id}>Estado</label>
      <select
        id={id}
        value={valor}
        onChange={(evento) => aoAlterar(evento.target.value)}
        required={obrigatorio}
      >
        <option value="">Selecione o estado</option>
        {ESTADOS_BRASIL.map((estado) => (
          <option key={estado} value={estado}>
            {estado}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SeletorEstado
