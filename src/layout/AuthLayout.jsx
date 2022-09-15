import { Outlet } from "react-router-dom"

const authLayout = () => {
  return (
    <>     
        <main className="container mx-auto md:grid md:grid-cols-2 mt-30 gap-12 mt-32 px-5 items-center">
            <Outlet />
        </main>       
    </>         
  )
}

export default authLayout