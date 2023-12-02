  import React, {useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Register from './Register'
import ax from 'axios'
import '../context/authContext.js'
import { AuthContext } from '../context/authContext'

// import '../styles.scss'

const Login = () => {

  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  })

  const [err, setErr] = useState(null);
  
  const navigate = useNavigate();

  const { login } = useContext( AuthContext )


  const handleChange = (e) => {

    setInputs(prev=>({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
       await login(inputs)
      //navigate to the home page after that
      navigate("/")

    }catch(err){
      setErr(err.response.data);
    }
  }

  return (
    <div className='auth'>
      <h1>
        Login
      </h1>
      <form>
        <input type='text' placeholder='username' name='username' onChange={handleChange} value={inputs.username}></input>
        <input type='password' placeholder='password' name='password' onChange={handleChange} value={inputs.password}/> 
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>Dont have an account? <Link to='/register'>Register</Link></span>
      </form>
    </div>
  )
}

export default Login
