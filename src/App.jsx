import React from 'react';
import { nanoid } from 'nanoid'
function App() {

  const [tarea, setTarea] = React.useState('')
  const [tareas, setTareas] = React.useState([])
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [id, setId] = React.useState('')
  const [error, setError] = React.useState(null)

  const agregarTarea = e => {
    e.preventDefault()
    if(!tarea.trim()){
      console.log('Campo vacio')
      setError('El campo no puede estar Vacío')
      return
    }
    setTareas([
      ...tareas,
      {tarea, id: nanoid(),nombreTarea:tarea}
    ])
    setTarea('')
    setError(null)
  }

  const eliminarTarea = id => {
    const arrayFiltrado = tareas.filter(item => item.id !== id)
    setTareas(arrayFiltrado)
  }

  const editar = item => {
    setModoEdicion(true)
    setTarea(item.tarea)
    setId(item.id)
  }

  const editarTarea = e => {
    e.preventDefault()
    if(!tarea.trim()){
      console.log('Campo vacio')
      setError('El campo no puede estar vacío')
      return
    }

    const arrayEditado = tareas.map(item => item.id === id ? {id, tarea} : item)
    setTareas(arrayEditado)
    setModoEdicion(false)
    setTarea('')
    setId('')
    setError(null)
  }

  return (
    
    <div className="container mt-5">
    <h1 className="text-center">CRUD APP</h1>
    <hr/>
    <div className="row">
      <div className="col-8">
        <h4 className="text-center">Lista de Tareas</h4>
        <ul className="list-group">
          {
            tareas.length === 0 ? (
              <li className="list-group-item">Sin Tareas</li>
            ) : (
              tareas.map(item => (
                <li className="list-group-item" key={item.id}>
                  <span className="lead">{item.tarea}</span>
                  <button 
                    className="btn btn-sm btn-danger float-right mx-2"
                    onClick={() => eliminarTarea(item.id)}
                  >Eliminar</button>
                  <button 
                    className="btn btn-sm btn-warning float-right"
                    onClick={() => editar(item)}
                  >Editar</button>
                </li>
              ))
            )
          }
        </ul>
      </div>
      <div className="col-4">
        <h4 className="text-center">
          {
            modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
          }
        </h4>
        <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
          {
            error ? <span className="text-danger">{error}</span> : null
          }
          <input 
            type="text" 
            className="form-control mb-2"
            placeholder="Ingrese Tarea"
            onChange={e => setTarea(e.target.value)}
            value={tarea}
          />
          {
            modoEdicion ? (
              <button className="btn btn-warning btn-block" type="submit">Editar</button>
            ) : (
              <button className="btn btn-dark btn-block" type="submit">Agregar</button>
            )
          }
        </form>
      </div>
    </div>
  </div>

  );
}

export default App;
