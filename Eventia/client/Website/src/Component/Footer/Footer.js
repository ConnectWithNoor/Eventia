import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { SocialIcon } from 'react-social-icons';
import logo1 from '../../assets/img/logo/logo.svg';
import logo2 from '../../assets/img/logo/dsu.png';

const Styles = styled.div`

footer{
  padding: 50px 0 100px;
  background-color: #0b031b;
  display: block;
}

img{
  vertical-align:middle;
  max-width:100%;
}

.row{
    display: flex;
    flex-wrap: wrap;
    margin-right: 15px;
    margin-left: 15px;
}

@media (min-width: 992px)
.footerin {
    max-width: 960px;
}

.footerin {
    margin-right: auto;
    margin-left: auto;
    padding-right: 15px;
    padding-left: 15px;
    width: 100%;
}

@media (min-width: 768px)
.col-md-3 {
    flex: 0 0 25%;
    max-width: 25%;
}

.Headbox{
position: relative;
width: 100%;
min-height: 1px;
padding-right: 15px;
padding-left: 15px;
}

.head{
  position: relative;
 margin-top: 50px;
}

div{
  display: block;
}

.bottom{
  margin-bottom:30px;
}

center {
    display: block;
    text-align: center;
}

.Social{
  list-style-type: none;
    list-style-position: initial;
    list-style-image: initial;
    padding: 0;
    margin: 0;
}

.lists{
  display: inline-block;
margin: 5px;
}

.headtitle{
  text-transform: uppercase;
    padding: 10px 0;
    font-size: 18px;
    color: #ffffff;
    font-family: "Montserrat", sans-serif;
font-weight: 700;
line-height: 1.3;

}

.headtitle::before{
  width: 30px;
    content: " ";
    position: absolute;
    border-top: solid 3px #a42a18;
    left: 0;
    top: 0;

}

.Form{
  background-color: #1f1039;
    border: solid 1px #1f1039;
    font-weight: 500;
    color: #ffffff;
}

.Form{
  display: block;
width: 100%;
padding: .5rem .75rem;
font-size: 1rem;
line-height: 1.25;
color: #495057;
background-image: none;
background-clip: padding-box;
}

.btn-primary {
    background-color: #a42a18;
    border: solid 1px #a42a18;
    color: #ffffff;
}

.btn-rounded {
     border-radius: 50px;
}

.btn {
    font-size: 12px;
    line-height: 1.7;
    text-transform: uppercase;
    font-weight: 500;
    padding: 12px 40px;
    border-radius: 0;
    outline: 0 !important;
    cursor: pointer;
}

.btn-block {
    display: block;
    width: 100%;
}

.btn {
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;

}

.Copyright{
    background-color: #080113;
    padding: 15px;

}

@media (min-width: 992px)
.container {
    max-width: 960px;
}

.container {
    margin-right: auto;
    margin-left: auto;
    padding-right: 15px;
    padding-left: 15px;
    width: 100%;
}

.cp{
  font-size: 18px;
    padding: 10px;
    text-transform: capitalize;
    font-family: "Montserrat", sans-serif;
margin: 0 0 15px;
line-height: 24px;
font-weight: 400;
    color: #ffffff;
}

`;

class Footer extends Component {
  render() {
    return (
      <Styles>
        <footer>
          <Container className="footerin">
            <Row className="row">
              <Col md={3} className="Headbox">
                <div className="head">
                  <div className="bottom">
                    <div className="logobox">
                      <img src={logo1} alt="temp" />
                    </div>
                  </div>
                  <center>
                    <ul className="Social">
                      <li className="lists"> <SocialIcon url="http://twitter.com" /></li>
                      <li className="lists"> <SocialIcon url="http://facebook.com" /></li>
                      <li className="lists"> <SocialIcon url="https://github.com" /></li>
                      <li className="lists"> <SocialIcon url="https://instagram.com" /></li>
                    </ul>

                  </center>
                </div>
              </Col>
              <Col md={6} style={{ marginTop: 'auto', marginBottom: 'auto', paddingBottom: 47 }}>
                <div className="head">
                  <div className="bottom">
                    <div className="logobox">
                      <img src={logo2} alt="temp" />
                    </div>
                  </div>
                </div>
              </Col>

              <Col md={3} style={{ marginTop: 'auto', marginBottom: 'auto', paddingBottom: 47 }}>
                <div className="head">
                  <h4 className="headtitle"> Subscribe to our Newsletter</h4>
                  <div className="bottom">
                  </div>
                  <div className="Emailbox">
                    <input type="email" className="Form" placeholder="Email here" style={{ marginBottom: 20 }} />
                    <Button className="btn btn-rounded btn-block btn-primary" > Subscribe </Button>
                  </div>
                </div>
              </Col>

            </Row>
          </Container>

        </footer>

        <Container fluid={true} className="Copyright">
          <div className="container">
            <Row className="row justify-content-center">
              <Col md={6} col={12}>
                <center>
                  <p className="cp"> Copyright &copy; Eventia 2019 </p>
                </center>
              </Col>
            </Row>
          </div>
        </Container>
      </Styles>
    );
  }
}


export default Footer;
