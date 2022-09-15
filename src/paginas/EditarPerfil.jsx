import { useState } from "react"
import { useEffect } from "react"
import AdminNav from "../components/AdminNav"
import useAuth from '../hooks/useAuth'
import Alerta from '../components/Alerta'


const EditarPerfil = () => {

    const {auth, actualizarPerfil} = useAuth()

    const [perfil, setPerfil] = useState({})
    const [alerta, setAlerta] = useState({})

    useEffect(() =>{
        setPerfil(auth)
        
    }, [auth])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const {nombre, email} = perfil

        if([nombre, email].includes('')){
            setAlerta({
                msg: "Nombre y Email son obligatorios",
                error: true
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000);

            return
        }

       const resultado = await actualizarPerfil(perfil)

       setAlerta(resultado)

    }

    const {msg} = alerta


  return (
   <>
        <AdminNav/>
        <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} <span className="text-indigo-600 font-bold">Información aqui</span> </p>

        <div className="flex justify-center">
            <div className="w-full lg:w-1/2 bg-white shadow-xl border  rounded-lg p-5 ">

          
                <form onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Nombre <span className="text-red-600">*</span></label>
                        <input
                            type="text"
                            className="border bg-gray-50 w-full mt-2 rounded-lg p-2"
                            name="nombre"
                            value={perfil.nombre || ''}
                            onChange={e => setPerfil({
                                ...perfil, [e.target.name] : e.target.value
                            })}>                          
                        </input>
                    </div>

                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Sitio Web</label>
                        <input
                            type="text"
                            className="border bg-gray-50 w-full mt-2 rounded-lg p-2"
                            name="web"
                            value={perfil.web || ''}
                            onChange={e => setPerfil({
                                ...perfil, [e.target.name] : e.target.value
                            })}
                            >                          
                        </input>
                    </div>

                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Telefono</label>
                        <input
                            type="text"
                            className="border bg-gray-50 w-full mt-2 rounded-lg p-2"
                            name="telefono"
                            value={perfil.telefono || ''}
                            onChange={e => setPerfil({
                                ...perfil, [e.target.name] : e.target.value
                            })}>                          
                        </input>
                    </div>

                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Email <span className="text-red-600">*</span></label>
                        <input
                            type="text"
                            className="border bg-gray-50 w-full mt-2 rounded-lg p-2"
                            name="email"
                            value={perfil.email || ''}
                            onChange={e => setPerfil({
                                ...perfil, [e.target.name] : e.target.value
                            })}>                          
                        </input>
                    </div>

                    <input 
                        type="submit"
                            value="Guardar Cambios"
                            className="bg-indigo-600 mb-5 hover:bg-indigo-800 transition py-3 rounded-lg w-full text-white font-bold mt-5 ">
                    </input>

                    {msg && <Alerta alerta={alerta} />}

                </form>
            </div>
        </div>


   </>
  )
}

export default EditarPerfil