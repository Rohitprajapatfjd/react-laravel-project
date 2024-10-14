
import { Link } from "react-router-dom"
export default function Login() {
  return (
    <>
      <div className="login-signup-form animated fadeInDown">
                <div className="form">
                    <form>
                        <h1 className="title">Signup for Free</h1>

                       
                        <input type="email" placeholder="Email Address" />
                        <input type="password" placeholder="Password" />
                       
                        <button className="btn btn-block">SignIn</button>
                        <p className="message">
                            Already registered? <Link to="/signin">Sign Up</Link>
                        </p>
                    </form>
                </div>
            </div>
    </>
  )
}
