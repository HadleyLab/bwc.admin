import React from 'react'
import NavBar from './NavBar'
import styled from 'styled-components'
import HeaderLink from './HeaderLink'
import logoImg from 'images/logo.svg'
import { Container, ContainerFluid, media } from 'style/containers'
import colors from 'style/colors'
import logOut from 'utils/logOut'
import isGuest from 'utils/isGuest'

const Cover = styled.div`
    width:100%;
    text-align: center;
    background: #fff;
    // border-bottom: 1px solid ${colors.borderGrey};
`;
const Logo = styled.img`
    width:160px;
    display: block;
    padding: 1.5em 0;
    margin: 5px 0 0 38px;
    ${media.tablet`
        margin: 5px 0 0 25px;
        padding-left: 0;
    `}
        ${media.mobile`
        margin: 5px 0 0 15px;
        padding-left: 0;
    `}
`;

const MenuFlex = styled.div `
  display:flex;
  flex-flow:row wrap;
  justify-content:space-between;
  align-items:center;
`;




class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render () {
    return (
      <div>
        <Cover>
          <ContainerFluid>
            <Container>
              <MenuFlex>
              <a href="/"><Logo src={logoImg}/></a>
              <NavBar>
                {isGuest() && (
                  <HeaderLink to="/login">
                    Login
                  </HeaderLink>
                )}
                {isGuest() && (
                  <HeaderLink to="/register">
                    Register
                  </HeaderLink>
                )}

                {!isGuest() && (
                  <HeaderLink to="/sign">
                    Sign
                  </HeaderLink>
                )}
                {!isGuest() && (
                  <HeaderLink to="/files">
                    Files
                  </HeaderLink>
                )}
                {!isGuest() && (
                  <HeaderLink to="/" onClick={logOut}>
                    Logout
                  </HeaderLink>
                )}
              </NavBar>
              </MenuFlex>
            </Container>
          </ContainerFluid>
        </Cover>

      </div>
    )
  }
}

export default Header
