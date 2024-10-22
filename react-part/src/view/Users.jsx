import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { Link } from "react-router-dom";
import { usecontext } from "../contextApi/context";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
     const { setNotification} = usecontext()
    useEffect(() => {
        getUsers();
    }, []);
   
 const onDeleteClick = (id)=>{
    if(!window.confirm('are you sure want to delete this user?')){
      return
    }
    axiosClient.delete(`/user/${id}`).then((data)=>{
        setNotification('Post Delete Successfully')
        getUsers()
       // console.log(data)
    }).catch(err=>{
        const response = err.response;
        console.log(response)
    })
 }

    const getUsers = () => {
        setLoading(true);
        axiosClient
            .get("/user")
            .then(({ data }) => {
                setLoading(false);
               setUsers(data.data)
            })
            .catch((err) => {
                setLoading(false);
                const response = err.response;
                console.log(response);
            });
    };
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Users</h1>
                <Link className="btn-add" to="/users/new">
                    Add new
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="5" class="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {users ? (
                                users.map((u) => (
                                    <tr key={u.id}>
                                        <td>{u.id}</td>
                                        <td>{u.title}</td>
                                        <td className="desc">{u.desc.substr(0,35)+"...."}</td>
                                        <td><img src={`${import.meta.env.VITE_BASE_URL}/uploads/${u.image_path}`} width={100} alt="" srcset="" /></td>
                                        <td>{u.created_at}</td>
                                        <td>
                                            <Link
                                                className="btn-edit"
                                                to={"/users/" + u.id}
                                            >
                                                Edit
                                            </Link>
                                            &nbsp;
                                            <button
                                                className="btn-delete"
                                                onClick={(ev) =>
                                                    onDeleteClick(u.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" class="text-center">
                                        No Data Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}
