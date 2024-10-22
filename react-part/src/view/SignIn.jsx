import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from '../axiosClient'
import { usecontext } from "../contextApi/context";
export default function SignIn() {

    const navigate = useNavigate();
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()
    const {setUser} = usecontext()
    const [errors, setError] = useState(null);
    const [loader, setLoader] = useState(false);
    const handleSubmit = (e)=>{
     e.preventDefault();
     setLoader(true)
       let data = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        password_confirmation: passwordConfirmationRef.current.value
       }
       axiosClient.post('/signup', data).then(({data})=>{
        setLoader(false)
        setUser(data.user)
         navigate('/login')
       }).catch(err=>{
        setLoader(false)
        const response = err.response
        if(response && response.status === 422){
           setError(response.data.errors)
        }
       })

    }
    return (
        <>
            {loader && <div className="loader-container">
                    <div className="loader"></div>
                </div>}
                {!loader && <div className="login-signup-form animated fadeInDown">
                <div className="form">
                     <form onSubmit={handleSubmit}>
                        <h1 className="title">
                            Login into Your Account
                        </h1>
                        {errors && <div className="alert">
                            {Object.keys(errors).map((key)=>(
                                <p key={key}> {errors[key][0]} </p>
                            ))}
                            </div>}

                        <input ref={nameRef} type="text" placeholder="Full Name" />
                        <input ref={emailRef} type="email" placeholder="Email Address" />
                        <input ref={passwordRef} type="password" placeholder="Password" />
                        <input ref={passwordConfirmationRef} type="password" placeholder="Repeat Password" />
                        <button className="btn btn-block">Signup</button>
                        <p className="message">
                            Already registered? <Link to="/login">Sign In</Link>
                        </p>
                    </form>
                    
                </div>
            </div>}
        </>
    );
}
