import React from 'react'
import './Navbar.css'
import htmlLogo from '../../assets/html.png'
import jsLogo from '../../assets/js.svg'
import codeLogo from '../../assets/code.png'

const Navbar = () => {
  return ( 
    <div className='navbar'>
      <div className="app-title">
        <img src={codeLogo} width={32} style={{marginRight: 10}} alt="" />
        <h3>Coffee2Code</h3>
      </div>
        <a href="/" className='nav-items'>
          <img src={htmlLogo} width={32} style={{marginRight: 10}} alt="" />
          <p>HTML & CSS</p>
        </a>
        <a href="/js" className='nav-items'>
          <img src={jsLogo} width={32} style={{marginRight: 10}} alt="" />
          <p>Javascript</p>
        </a>
    </div>
  )
}

export default Navbar