import React, { useEffect } from 'react'
import logo from '../../assets/images/logo.png'
import styled from 'styled-components'

  const Nav = styled.nav`
      height: 80px;
      background: #134834;
      padding: 10px;
      @media (min-widht: 768px){
        padding: 10px 50px;
      }`
  
    const NavWrapper = styled.div`
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    `
    const Logo = styled.img`
        width: 100%;
        max-width: 80px;
        margin-right: 20px;
    `
    const ContentLogo = styled.div`
      display: flex;
      align-items: center;
    `
    
    const H1= styled.h1`
      color: white;
      display: none;
      font-weight: 700;
      text-transform: uppercase;
      @media (min-width: 992px) {
        display: block;
      }
    `

const Header = (props) => {
 
  return (
      <header>
        <Nav>
          <NavWrapper>
            <ContentLogo><a href="/"><Logo src={logo} alt="KTBO"/></a><H1>Juego Memorama para Justo</H1></ContentLogo>
          </NavWrapper>
        </Nav>
      </header>
  )
}

export default Header
