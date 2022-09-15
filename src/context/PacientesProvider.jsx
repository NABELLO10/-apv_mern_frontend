import clienteAxios from '../config/axios'
import {createContext, useState, useEffect} from 'react'
import useAuth from '../hooks/useAuth'

const PacientesContext = createContext()

export const PacientesProvider = ({children}) =>{
    const { auth } = useAuth()
    
    const [pacientes, setPacientes] = useState([])
    const [paciente , setPaciente] = useState({})
 

    useEffect(() => {
        const obtenerPacientes = async () => { 
            try {
                const token = localStorage.getItem('token_apv')
 
                if(!token) return;

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
 
                const { data } = await clienteAxios('/pacientes', config);                
                setPacientes(data)           
                 
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes()       
    }, [])


    const setEdicion = (paciente) => {
        setPaciente(paciente)
    }
    
    const eliminarPaciente = async (id) => {
        const confirmar = confirm('¿Seguro que deseas eliminar el registro?')

        if(confirmar){
            try {
                const token = localStorage.getItem('token_apv')
                const config = {
                    headers : {
                        'Content-Type' : 'application/json',
                        Authorization : `Bearer ${token}`
                    }              
                }    

                const {data} = await clienteAxios.delete(`/pacientes/${id}`, config)
                
                const pacientesActualizados = pacientes.filter(pacientesState => pacientesState._id !== id )

                setPacientes(pacientesActualizados)

            } catch (error) {
                console.log(error)
            }
        }
    }
     


    const guardarPaciente = async (paciente) => {
        const token = localStorage.getItem('token_apv')
        const config = {
            headers : {
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${token}`
            }
        }    

        if(paciente.id){           
            try {
          
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config) 
                
                const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)

                setPacientes(pacientesActualizado)

            } catch (error) {
                console.log(error)
            }
        }else{
            try {                            
                const { data } = await clienteAxios.post('/pacientes', paciente, config)    
                const {createdAt, __v, updatedAt, ...pacienteAlmacenado } = data    
                setPacientes([pacienteAlmacenado, ...pacientes])    
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }       
    }
    
    
    return(
        <PacientesContext.Provider 
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}>
            {children}
        </PacientesContext.Provider>
    )
}

export default PacientesContext

