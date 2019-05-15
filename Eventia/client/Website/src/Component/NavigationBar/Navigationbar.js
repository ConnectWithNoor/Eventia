import React, { Component } from 'react';
import { Link } from 'react-scroll';
import Styled from 'styled-components'

import {
  Container,
  Navbar,
  Nav,
} from 'react-bootstrap';

import logo from '../../assets/img/logo/logo.svg'

const Styles = Styled.div`

  .bar  {
    color: #efefef !important;
    padding: 0 10px;

    &:hover {
      color: #000 !important;
      background-color: #efefef;
      border: 1px solid #efefef;
      border-radius: 15px;
      transition: 0.5s;
      cursor: pointer;
      padding-top: 5px;
    }
  }
  .btn-register {
    color: #efefef !important;
    padding: 5px 15px;
    margin-left: 5px;
    border-radius: 15px;
    border: 1px solid #efefef;
    text-transform: uppercase;
    &:hover { 
      color: #000 !important;
      background-color: #efefef;
      transition: 0.5s;
      cursor: pointer;
     
    }
  }

  @media(max-width: 768px){
    .bar {
      padding-bottom: 5px;
      margin-bottom: 10px;
      border-bottom: 0.5px solid rgba(255,255,255,0.7)
      text-align: center;
      
      &:hover{
        border-radius: 0px;
      }
    }
    .btn-register {
      border-radius: 0;
    }
  }
`

class Navigationbar extends Component {
  render() {
    return (
      <React.Fragment>
        <Styles>
          <Navbar
            expand="md"
            fixed="top"
            sticky="top"
            className="p-4"
            style={{
              backgroundColor: this.props.bgColor ? this.props.bgColor : 'transparent',
            }}
          >
            <Container>
              <Navbar.Brand href="/">
                <img
                  src={logo}
                  width="150"
                  height="100"
                  className="d-inline-block align-top m-0"
                  alt="Eventia Logo"
                />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                  <Link
                    className="bar"
                    to="homeSection"
                    spy={true}
                    smooth={true}
                    duration={500}>
                    Home
                  </Link>
                  <Link
                    className="bar"
                    to="aboutSection"
                    spy={true}
                    smooth={true}
                    duration={500}
                  >
                    About
                  </Link>
                  <Link
                    className="bar"
                    to="competitionSection"
                    spy={true}
                    smooth={true}
                    duration={500}
                  >
                    Competitions
                  </Link>
                  <Link
                    className="bar"
                    to="featuresSection"
                    spy={true}
                    smooth={true}
                    duration={500}
                  >
                    Features
                  </Link>
                  <Link
                    className="bar"
                    to="teamSection"
                    spy={true}
                    smooth={true}
                    duration={500}
                  >
                    Team
                    </Link>
                  <a
                    className="btn-register"
                    href="/register"
                  >
                    Register
                  </a>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

        </Styles>

      </React.Fragment>
    );
  }
}

export default Navigationbar;
