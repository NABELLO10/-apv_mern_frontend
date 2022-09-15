import usePacientes from "../hooks/usePacientes"

const Paciente = ({paciente}) => {

    const {email, fecha, nombre, propietario, sintomas, _id} = paciente

    const {setEdicion, eliminarPaciente} = usePacientes()

    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat('es-ES', {dateStyle : 'short'}).format(nuevaFecha)
    }

  return (
    <>
        <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
                <p className="font-bold uppercase text-indigo-600 my-1">Nombre: {''}
                <span className="font-normal normal-case text-black">{nombre}</span></p>

                <p className="font-bold uppercase text-indigo-600 my-1">Propietario: {''}
                <span className="font-normal normal-case text-black">{propietario}</span></p>

                <p className="font-bold uppercase text-indigo-600 my-1">Email: {''}
                <span className="font-normal normal-case text-black">{email}</span></p>

                <p className="font-bold uppercase text-indigo-600 my-1">Fecha Alta: {''}
                <span className="font-normal normal-case text-black">{formatearFecha(fecha)}</span></p>

                <p className="font-bold uppercase text-indigo-600 my-1">Sintomas: {''}
                <span className="font-normal normal-case text-black">{sintomas}</span></p>

                <div className="flex justify-between my-5">
                    <button type="button" onClick={() => setEdicion(paciente)} className="py-1 px-10 bg-indigo-500 hover:bg-indigo-800 text-white rounded-md font-bold">Editar</button>
                    <button type="button" onClick={() => eliminarPaciente(_id)} className="py-1 px-10 bg-red-500 hover:bg-red-800 text-white rounded-md font-bold">Eliminar</button>
                </div>
               
        </div>
    </>
  )
}

export default Paciente