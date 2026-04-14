import React, { useState } from 'react'
import '../Pages/CSS/Login.css'
import axios from 'axios'
import { useNavigate , NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

   const navigate = useNavigate(); 

  const handleLogin = async() =>{
    try {
      const res =  await axios.post('http://localhost:3000/api/login', {
      email, password
    })

    if(res.data.success == true) {
      localStorage.setItem("token",res?.data?.admin)
    }

    console.log(res);

    if(res.data.success==true) {      
      setTimeout(()=> {
        setLoading(false)
        toast("login successfully")

        navigate('/dashboardLayout')
      }, 1000)

    }
    else {
      alert('Invalid Email or Password');
    }
    } catch (error) {
      console.log(error);
      
    }
    finally {
      setLoading(false)
    }
    
    
  }
  return (
    <>
    
    <div className="outer">
      <h1 className="margin">Log In</h1>
      <div>
        <button className="btn-icon">
            <img src="../Images/google-icon.png" alt="google-icon" />
        </button>
      </div>
      <div className="divider">
        <span>OR</span>
      </div>
      <div className="form
      ">
        <label htmlFor="email" id="email" className="margin">Email address</label><br />
        <input type="email" className="margin" value={email} onChange={(e)=>setEmail(e.target.value)} /><br />
        <label htmlFor="password" id="password" className="margin">Password</label><br />
        <input type="password" className="margin" value={password} onChange={(e)=>setPassword(e.target.value)} /> <br />
        <span className="margin">Forgot password?</span>
      </div>
      <button className="btn-icon margin" id="btn" onClick={handleLogin} disabled={loading}>{loading ? "Loading.." : "Login"}</button>
      <p className="margin"><a href="">Can't Access Yout Account?</a></p>
      <p>
        Don't have an account?
        <a href="">Sign Up</a>
      </p>
    </div>
    
    </>
  )
}

export default Login
