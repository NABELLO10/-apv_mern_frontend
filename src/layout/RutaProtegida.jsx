import { Outlet, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Spinner from '../components/Spinner'

const RutaProtegida = () => {

    const navigate = useNavigate()
    const {auth, cargando} = useAuth()
    
    if (cargando) return <Spinner/>
  
  return (
    <>
        <Header />        
        {auth?._id ? (
                  <main className="container mx-auto mt-10">
                      <Outlet /> 
                  </main>
                
                  ): navigate('/')} 
        <Footer />        
    </>

  )
}


export default RutaProtegida