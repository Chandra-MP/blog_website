import React, {useState, useEffect} from 'react'
import ax from 'axios'
import { Link, useNavigate } from 'react-router-dom'
// import '../styles.scss'

const Register = () => {
  const [inputs, setInputs] = useState({
    username:"",
    email:"",
    password:"",
    confirm_pass:""
  })

  const [err, setError] = useState(null)

  const navigate = useNavigate()

// Handle when the user inputs form data
const handleChange = (e) =>{  
  // e.preventDefault();
  setInputs(prev=>({
    ...prev,
    [e.target.name]: e.target.value
  }))
}

//Send the user inputted data when they click on Register button to the backend api, if the user exists navigate it to the login page
const handleSubmit = async (e) =>{
  e.preventDefault();
  try{
    await ax.post("api/auth/register", inputs)
    navigate("/login");

  }catch(err){
    setError(err.response.data)
    setTimeout(()=>{
      navigate("/login")
    }, 2000);
  }
 

}
console.log(inputs)
  return (
    <div className='auth'>
      <h1>
        Register
      </h1>
      <form>
        <input type='text' placeholder='username' name='username' value={inputs.username} onChange={handleChange} required></input>
        <input type='email' placeholder='email' name='email' value={inputs.email} onChange={handleChange} required/>
        <input type='password' placeholder='password' name='password' value={inputs.password} onChange={handleChange} required/> 
        <input type='password' placeholder='confirm-password' name='confirm_pass' value={inputs.confirm_pass} onChange={handleChange} required/>
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>Already have an account? <Link to='/login'>Login</Link></span>
      </form>
    </div>
  )
}

export default Register
