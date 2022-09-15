import { useState } from "react"
import useAuth from "../hooks/useAuth"
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta"


const CambiarPassword = () => {

  const [alerta, setAlerta] = useState({})
  const [password, setPassword] = useState({
    passwordActual : '',
    passwordNuevo1 : ''
  })

  const { guardarPassword } = useAuth()


  const handleSubmit = async e => {
    e.preventDefault()

    if(Object.values(password).some(campo => campo === '')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    setAlerta({})

    const respuesta = await guardarPassword(password)
    setAlerta(respuesta)
    setTimeout(() => {
      setAlerta({})
    }, 2000);
    


  }

  const {msg} = alerta


  return (
    <>
        <AdminNav />

        <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} <span className="text-indigo-600 font-bold">Password</span> </p>
    
        <div className="flex justify-center">
            <div className="w-full lg:w-1/2 bg-white shadow-xl border  rounded-lg p-5 ">

          
                <form onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Password Actual <span className="text-red-600">*</span></label>
                        <input
                            type="password"
                            className="border bg-gray-50 w-full mt-2 rounded-lg p-2"
                            name="passwordActual"
                            placeholder="Escribe tu password actual"
                            onChange={e => setPassword({
                              ...password,
                              [e.target.name] : e.target.value
                            })}
                           >                          
                        </input>
                    </div>

                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Password Actual <span className="text-red-600">*</span></label>
                        <input
                            type="password"
                            className="border bg-gray-50 w-full mt-2 rounded-lg p-2"
                            name="passwordNuevo1"
                            placeholder="Escribe tu nuevo password"
                            onChange={e => setPassword({
                              ...password,
                              [e.target.name] : e.target.value
                            })}
                           >                          
                        </input>
                    </div>
                                       

                    <input 
                        type="submit"
                            value="Actualizar Password"
                            className="bg-indigo-600 mb-5 hover:bg-indigo-800 transition py-3 rounded-lg w-full text-white font-bold mt-5 ">
                    </input>

                    {msg && <Alerta alerta={alerta} />}

                </form>
            </div>
        </div>

    </>
  )
}

export default CambiarPassword