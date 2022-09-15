import { Link } from "react-router-dom"
import { useState } from "react"
import clienteAxios from '../config/axios'
import Alerta from "../components/Alerta"

const Registrar = () => {

    const [nombre , setNombre] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [repetirPassword , setRepetirPassword] = useState('')
    const [alerta , setAlerta] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()

        if([nombre, email, password, repetirPassword].includes('')){
            setAlerta({ msg : 'Hay campos vacios', error : true})
            return
        }

        if(password !== repetirPassword){
            setAlerta({ msg : 'Password diferentes', error : true})         
            return
        }

        if(password.length < 6){          
            setAlerta({ msg : 'El password es muy corto, minimo 6 caracteres', error : true})
            return
        }

        setAlerta({})   
        
        //Crear usuario en la API

        try {
            
            const respuesta = await clienteAxios.post('/veterinarios', {nombre, email, password})

            setAlerta({ msg : "Registro exisotoso, revisa tu email para validar", 
                        error : false})
            
        } catch (error) {
            setAlerta({
                msg : error.response.data.msg,
                error : true
            })
        }
    }

    const {msg} = alerta  

    return (
      <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl text-center">Crear <span className="text-black">Cuenta</span></h1>
        </div>
        
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

            {msg && <Alerta alerta={alerta}/>}

            <form onSubmit={handleSubmit}>
            <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold">
                        Nombre
                    </label>
                    <input type="text" placeholder="Tu Nombre..." value={nombre} onChange={e => setNombre(e.target.value)} className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" ></input>
                </div>

                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold">
                        Email
                    </label>
                    <input type="email" placeholder="Tu Email..." value={email} onChange={e => setEmail(e.target.value)} className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" ></input>
                </div>

                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold">
                        Contraseña
                    </label>
                    <input type="password" placeholder="Tu Contraseña..." value={password} onChange={e => setPassword(e.target.value)} className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" ></input>
                </div>

                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold">
                        Confirmar Contraseña
                    </label>
                    <input type="password" placeholder="Confirma contraseña......" value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)} className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" ></input>
                </div>
                

                <input type="submit" value="Crear Cuenta" className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer md:w-auto px-10"></input>
            </form>  

             <nav className="mt-10 lg:flex lg:justify-between">
                <Link className="block text-center my-5 text-gray-500" to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>
                <Link className="block text-center my-5 text-gray-500" to="/olvide-password">Olvide mi contraseña</Link>
            </nav>        
        </div>

      </>
    )
  }
  
  export default Registrar