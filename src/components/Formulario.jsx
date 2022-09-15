import { useState, useEffect } from "react"
import Alerta from '../components/Alerta'
import usePacientes from '../hooks/usePacientes'

const Formulario = () => {

  const [nombre, setNombre] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintomas, setSintomas] = useState('')

  const [id, setID] = useState(null)

  const [alerta, setAlerta] = useState({})

  const { guardarPaciente, paciente } = usePacientes()

  
  useEffect(() => {
      if(paciente?.nombre){
        setNombre(paciente.nombre)
        setPropietario(paciente.propietario)
        setEmail(paciente.email)
        setFecha(paciente.fecha)
        setSintomas(paciente.sintomas)
        setID(paciente._id)
      }
  }, [paciente])



  const handleSubmit = (e) => {
    e.preventDefault()
    if([nombre, email, propietario, fecha, sintomas].includes('')){
      setAlerta({
        msg: "Existen campos vacios",
        error: true
      })
      return
    }
    
    guardarPaciente({nombre, email, propietario, fecha, sintomas, id})
    setAlerta({
      msg: "Guardado Correctamente"
    })

    setTimeout(() => {
        setAlerta({})
    }, 2000);


    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
    setID('')

  }

  const {msg} = alerta

  return (
    <>
     
       <h2 className="font-black text-2xl text-center">Añade pacientes y</h2>
          <p className="font-bold text-indigo-600 mb-10 text-center">Administralos</p>


        <form onSubmit={handleSubmit}
          className="bg-white py-10 px-5 shadow-2xl rounded-md mb-1 lg:mb-0 ">
          <div className="mb-5">
              <label htmlFor="nombre"
                      className="text-gray-700 uppercase font-bold">Nombre Mascota</label>
              <input 
                id="nombre" 
                type="text" 
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                placeholder="Nombre Mascota..."
                className="border-2 w-full p-2 mt-2 placeholderbg-gray-400 rounded"/>
          </div>

          <div className="mb-5">
              <label htmlFor="propietario"
                      className="text-gray-700 uppercase font-bold">Nombre Propietario</label>
              <input 
                id="propietario" 
                type="text" 
                value={propietario}
                onChange={e => setPropietario(e.target.value)}
                placeholder="Nombre Propietario..."
                className="border-2 w-full p-2 mt-2 placeholderbg-gray-400 rounded"/>
          </div>
          
          <div className="mb-5">
              <label htmlFor="email"
                      className="text-gray-700 uppercase font-bold">Email</label>
              <input 
                id="email" 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email..."
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded"/>
          </div>
              
          <div className="mb-5">
              <label htmlFor="fecha"
                      className="text-gray-700 uppercase font-bold">Fecha Alta</label>
              <input 
                id="fecha" 
                type="date"  
                value={fecha}
                onChange={e => setFecha(e.target.value)}               
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded"/>
          </div>

          <div className="mb-5">
              <label htmlFor="sintomas"
                      className="text-gray-700 uppercase font-bold">Sintomas</label>
              <textarea 
                id="sintomas"   
                value={sintomas}
                onChange={e => setSintomas(e.target.value)}             
                placeholder="Sintomas..."
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded"/>
          </div>

          <input
            type="submit"
            value={id ? 'Guardar Cambios' : 'Agregar Paciente'}
            className="bg-indigo-500 p-3 text-white font-bold w-full hover:bg-indigo-600 rounded-md cursor-pointer transition-colors mb-3"
          />        
            {msg && <Alerta alerta = {alerta}/>}
        </form>
    </>
  )
}

export default Formulario