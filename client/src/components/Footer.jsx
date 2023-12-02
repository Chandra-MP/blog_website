import React from 'react'
import Logo from '../images/8002368.jpg'
const Footer = () => {
  return (
    <footer className='footer'>
      <img src={Logo} className='logo'></img>
      <span>Made with Love and <b>React.Js</b></span>
    </footer>
  )
}

export default Footer
