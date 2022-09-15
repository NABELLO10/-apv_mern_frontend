import { useState } from "react"
import Formulario from "../components/Formulario"
import ListadoPacientes from "../components/ListadoPacientes"

const AdministrarPacientes = () => {

  const [mostrarformulario, setMostrarFormulario] = useState(false)

  return (
    <div className="flex flex-col md:flex-row">
      <button 
          type="button"
          className="bg-indigo-600 text-white font-bold uppercase mx-10 p-1 rounded-md
                    hover:bg-indigo-700 mb-8 md:hidden" 
          onClick={() => setMostrarFormulario(!mostrarformulario)}       
          >{mostrarformulario ? 'Ocultar Formulario' : 'Mostrar Formulario'}
        </button>
        
        <div className={`${mostrarformulario ? 'block': 'hidden'} md:block md:w-1/2 lg:w-2/5`}>
          <Formulario />
        </div>
        <div className="md:w-1/2 lg:w-3/5">
          <ListadoPacientes />
        </div>
    </div>
   

  )
}

export default AdministrarPacientes