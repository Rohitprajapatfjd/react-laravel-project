
import { Navigate, Outlet } from "react-router-dom"
import { usecontext } from "../contextApi/context"

function DefaultLayout() {
    const {user, token}= usecontext()
     
    if(!token){
    return <Navigate to='/login' />
    }
  return (
    <div>
     <Outlet/>
    </div>
  )
}

export default DefaultLayout