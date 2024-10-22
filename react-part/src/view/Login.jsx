
import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import axiosClient from "../axiosClient";
import { usecontext } from "../contextApi/context";
export default function Login() {
  const [errors,setError] = useState(null);
  const emailRef = useRef();
  const passwordRef = useRef();
   const {setToken,setUser} =usecontext();
  const handleSubmit = (e)=>{
      e.preventDefault();
      let data = {
        email: emailRef.current.value,
        password: passwordRef.current.value
      }
      axiosClient.post('/login', data).then(({data})=>{
         setToken(data.token)
         setUser(data.user)
      }).catch(err=>{
        const response = err.response
        if(response && response.status === 422){
            setError(response.data.errors)
           
        } else if(response && response.status === 403){
            setError({message:[response.data.message]})
        }
      })

      //console.log(errors)
  }
  return (
    <>
      <div className="login-signup-form animated fadeInDown">
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <h1 className="title">Signup for Free</h1>
                          {errors && <div className="alert"> {
                            Object.keys(errors).map((item)=>(
                              <p key={item}>{errors[item][0]}</p>
                            ))
                            }</div>}
                        <input ref={emailRef} type="email" placeholder="Email Address" />
                        <input ref={passwordRef} type="password" placeholder="Password" />
                       
                        <button className="btn btn-block">SignIn</button>
                        <p className="message">
                            not registered? <Link to="/signin">Sign Up</Link>
                        </p>
                    </form>
                </div>
            </div>
    </>
  )
}
