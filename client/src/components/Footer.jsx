import React from 'react'
import Logo from '../images/logo_png.png'
const Footer = () => {
  return (
    <footer className='footer'>
      <img src={Logo} className='logo'></img>
      <span>Made with Love and <b>React.Js</b></span>
    </footer>
  )
}

export default Footer
