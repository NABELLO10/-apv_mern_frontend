import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

const OlvidePassword = () => {

    const [email, setEmail] = useState('')
    const [alerta , setAlerta] = useState({})

    const handleSubmit = async (e) =>{
        e.preventDefault()

        if (email === '' ){
            setAlerta({msg : "Email obligatorio", error : true })
            return
        }

        try {
            const { data } = await clienteAxios.post('/veterinarios/olvide-password', { email })
          
            setAlerta({msg: data.msg })
            
        } catch (error) {            
             setAlerta({
                msg: error.response.data.msg,
                error: true
            }) 
        }
              

    }

    const {msg} = alerta

  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl text-center ">Olvide mi <span className="text-black">Contraseña</span></h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            {msg && <Alerta alerta={alerta}/>}

            <form onSubmit={handleSubmit}>
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold">
                        Email
                    </label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email de registro..." className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" ></input>
                </div>
               
                <input type="submit" value="Recuperar" className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer md:w-auto px-10"></input>
            </form>
            <nav className="mt-10 lg:flex lg:justify-between">
                <Link className="block text-center my-5 text-gray-500" to="/registrar">¿No tienes una cuenta? Regístrate</Link>
                <Link className="block text-center my-5 text-gray-500" to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>
            </nav>
        </div>
    </>
  )
}

export default OlvidePassword