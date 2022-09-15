import usePacientes from "../hooks/usePacientes"
import Paciente from "./Paciente"

const ListadoPacientes = () => {

   const { pacientes } = usePacientes()

  return (
    <>
       
      { pacientes.length ? (
        <>
         <h2 className="font-black text-2xl text-center">Listado Pacientes</h2>
          <p className="font-bold text-indigo-700 mb-10 text-center">Pacientes Agregados</p>

          {pacientes.map(paciente => (
              <Paciente 
                  key={paciente._id}
                  paciente={paciente}
              />
          ))}

        </>
        )  : 
        (
        <>
          <h2 className="font-black text-3xl text-center">No hay Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">Agrega Pacientes</p>
        </>
      )} 

    </>
  )
}

export default ListadoPacientes