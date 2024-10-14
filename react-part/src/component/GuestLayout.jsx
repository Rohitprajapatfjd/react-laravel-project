import { Navigate, Outlet } from "react-router-dom"
import { usecontext } from "../contextApi/context"
export default function GuestLayout() {
    const {token} = usecontext();

    console.log(token)
    if(token){
     return  <Navigate to='/'/>
    }
  return (
    <div>
        <Outlet/>
    </div>
  )
}
