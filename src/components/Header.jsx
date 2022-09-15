import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Header = () => {

  const {cerrarSesion} = useAuth()

  return (
   <header className="py-5 bg-indigo-800 ">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
            <h1 className="text-white font-bold text-center">Administrador <span className="font-black text-indigo-300">Veterinaria</span> </h1>
        
            <nav className="flex flex-col items-center lg:flex-row gap-4 mt-4 lg:mt-0 ">
              <Link className="text-white uppercase text-sm font-bold" to="/admin">Pacientes</Link>
              <Link className="text-white uppercase text-sm font-bold" to="/admin/perfil">Perfil</Link>
              <button type="button" className="text-white uppercase text-sm font-bold" onClick={cerrarSesion} >Cerrar Sesion</button>          
          </nav>
        </div>
   </header>
  )
}

export default Header