import { Navigate, Outlet,Link } from "react-router-dom";
import { usecontext } from "../contextApi/context";
import axiosClient from "../axiosClient";

function DefaultLayout() {
    const { user, token,setToken ,setUser,notification} = usecontext();

    if (!token) {
        return <Navigate to="/login" />;
    }
    const onLogout = (e)=>{
      e.preventDefault()
      axiosClient.post('/logout').then((data)=>{
        setUser(null)
        setToken(null)

      }).catch(err=>{
        let response = err.response
        console.log(response.status)
        
      })
    }
    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/user">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>Header</div>

                    <div>
                        {user.name} &nbsp; &nbsp;
                        <a onClick={onLogout} className="btn-logout">
                            Logout
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
            {notification && <div className="notification">
                {notification}
            </div>}
        </div>
    );
}

export default DefaultLayout;
