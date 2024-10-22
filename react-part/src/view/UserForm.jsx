import React, { useEffect, useRef } from "react";
import { useState } from "react";
import axiosClient from "../axiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { usecontext } from "../contextApi/context";
function UserForm() {
    const imageref =  useRef();
    const navigate = useNavigate();
    const { id } = useParams();   
    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState(null);
    const {notification ,setNotification} = usecontext()
    const [user, setUser] = useState({
        id: null,
        title: "",
        desc: "",
        image_path: "",
    });   
    const [showimg, setImage] = useState('')
    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/user/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    console.log(data);
                    setUser(data);
                    setImage(`${import.meta.env.VITE_BASE_URL}/uploads/${data.image_path}`)
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                });
        }, []);
    }
   
    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("title", user.title);
        formData.append("desc", user.desc);
        if (user.image_path instanceof File) {
            formData.append("image_path", user.image_path);
        }
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        if (id) {
            formData.append("_method", "PUT");
            axiosClient
                .post(`/user/${id}`, formData, config)
                .then(({ data }) => {
                  setNotification('Post was successfully update')
                 navigate("/user")
               })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                      setLoading(false)
                        setError(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post("/user", formData, config)
                .then(({ data }) => {
                   setNotification('Post was successfully created')
                  navigate("/user")
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                      setLoading(false)
                        setError(response.data.errors);
                    }
                });
        }
    };
    return (
        <>
            {user.id && <h1>Update User: {user.title}</h1>}
            {!user.id && <h1>New User</h1>}
            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Loading...</div>}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((item) => (
                            <p>{errors[item][0]}</p>
                        ))}
                    </div>
                )}

                {!loading && (
                    <form onSubmit={onSubmit} encType="multipart/form-data">
                        <input
                            value={user.title}
                            onChange={(ev) =>
                                setUser({ ...user, title: ev.target.value })
                            }
                            placeholder="Title"
                        />
                        <textarea
                            rows={4}
                            value={user.desc}
                            onChange={(ev) =>
                                setUser({ ...user, desc: ev.target.value })
                            }
                            placeholder="Description"
                        />
                        {user.image_path && (
                            <img ref={imageref}
                                width={130}
                                src={showimg}
                            />
                        )}
                        <input
                            type="file"
                            onChange={(ev) =>
                                setUser({
                                    ...user,
                                    image_path: ev.target.files[0],
                                })
                            }
                        />

                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    );
}

export default UserForm;
