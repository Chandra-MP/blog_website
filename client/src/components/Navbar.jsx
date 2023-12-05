import React, { useContext } from 'react'
import Logo from '../images/logo_png.png'
import { Link, useNavigate } from 'react-router-dom'
import { TbBrandBlogger, TbTextSize } from "react-icons/tb";
import { AuthContext } from '../context/authContext'
import login from '../pages/Login'

const Navbar = () => {

  const { currentUser, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleClick = () => {
    logout();
    navigate("/");

  }

  return (
    <div className='navbar'>
      <div className='container'>
        <div className='logo'>
          <Link to='/'>
          <img src={Logo} alt="" />
          </Link>
        </div>
        <div className='links'>
          <Link className='link' to="/?cat=art"><h6>ART</h6></Link>
          <Link className='link' to="/?cat=science"><h6>SCIENCE</h6></Link>
          <Link className='link' to="/?cat=food"><h6>FOOD</h6></Link>
          <Link className='link' to="/?cat=design"><h6>DESIGN</h6></Link>
          <Link className='link' to="/?cat=technology"><h6>TECHNOLOGY</h6></Link>
          <span className='write'>
            <Link to="/write" className='link'>Write</Link>
          </span>
          <span>{currentUser?.username}</span>
          {currentUser ? (
          <span onClick={handleClick}>Logout</span>
          ) : (
          <Link className='link' to='/login'>Login</Link>  
          )}

        </div>
      </div>
    </div>
  )
}

export default Navbar
