import { useEffect } from "react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

const NuevoPassword = () => {

  const [password, setPassword] = useState('')
  const [passwordConfirmada, setPasswordConfirmada] = useState('')
  const [alerta, setAlerta] = useState({})
  const [tokenValido, setTokenValido] = useState(false)
  const [passwordModificado, setPasswordModificado] = useState(false)
  
  const params = useParams()
  const { token } = params

    useEffect(() => {
      const comprobarToken = async () => {
        try {

          await clienteAxios.get(`/veterinarios/olvide-password/${token}`)
          setAlerta({
            msg: 'Coloca tu nueva contraseña'
          })
          setTokenValido(true)         
          
        } catch (error) {
          setAlerta({msg : 'Hubo un error con el enlace', error: true})
        }
      }

      comprobarToken()
    }, [])


    const crearPassword = async (e) => {
        e.preventDefault()

        if(password !== passwordConfirmada){
          setAlerta({msg: 'Contraseñas no coinciden', error : true})
          return
        }    
        
        if(password.length < 6){          
          setAlerta({ msg : 'El password es muy corto, minimo 6 caracteres', error : true})
          return
        }

        try {

          const {data} = await clienteAxios.post(`/veterinarios/olvide-password/${token}`, { password })
          setAlerta({
            msg: data.msg,
            error: false
          })         
          setPasswordModificado(true)      
          
        } catch (error) {
          setAlerta({
            msg: error.response.data.msg, 
            error:true
          })
        }          
    } 

    const {msg} = alerta 

  return (
    <>           
        <div>
            <h1 className="text-indigo-600 font-black text-6xl text-center ">Nueva <span className="text-black">Contraseña</span></h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}

        {tokenValido && (
          <>
              <form onSubmit={crearPassword}>
                <div className="my-5">
                      <label className="uppercase text-gray-600 block text-xl font-bold">
                          Contraseña
                      </label>
                      <input type="password" placeholder="Contraseña..." value={password} onChange={e => setPassword(e.target.value)} className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" ></input>
                  </div>

                  <div className="my-5">
                      <label className="uppercase text-gray-600 block text-xl font-bold">
                          Confirmar Contraseña
                      </label>
                      <input type="password" placeholder="Confirmar Contraseña..." value={passwordConfirmada} onChange={e => setPasswordConfirmada(e.target.value)} className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" ></input>
                
                  </div>

                  <input type="submit" value="Restablecer Contraseña" className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer md:w-auto px-10"></input>
              </form>         
            </>
                    
          )}

            {passwordModificado && <Link className="block text-center my-5 text-gray-500" to="/">Inicia Sesión</Link>}
            
        </div>  
   </>
  )
}

export default NuevoPassword