import React from 'react';
import { Row, Col, Container } from 'react-bootstrap'
import styled from 'styled-components';

import cs from '../../assets/img/cs.svg'
import fifa from '../../assets/img/fifa.svg'
import pubg from '../../assets/img/pubg.svg'
import nfs from '../../assets/img/nfs.svg'
import dota2 from '../../assets/img/dota2.svg'

const Styles=styled.div`

.row{
display: flex;
flex-wrap: wrap;
margin-right: -15px;
margin-left: -15px;
}

.Row1{
  padding:60px;
}

.imge{

}

.zoom {
    padding: 50px;
    transition: transform .1s;
    width: auto;
    height: auto;
    margin: 0px;
    box-sizing: border-box;
}



@media (min-width: 768px)
.col-md-4 {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
}

.try{
  margin-bottom:20px;
  &:hover{

    transition: 0.5s;
    transform: scale(1.1);

  }
}

.competition-img-align {
    width: 500px;
    height: 300px;
    vertical-align: middle;
    max-width: 100%;
    margin: 0px;
}

`;

const Competitions = () => {
    return (
        <React.Fragment>
            <Container>
            <Row className="align-items-center justify-content-center mt-5">
                <Col sm={12} className="text-center">
                    <h1 className="text-h1" style={{marginBottom:10,textTransform:'uppercase', marginTop:20,}}>Competitions</h1>
                </Col>
            </Row>
            <Styles>
                <Row className="Row1">

                    <Col className="try" md={4} sm={6} zoom>
                        <img src={cs} className="competition-img-align" alt="img11" />
                        <center>
                            <h4  style={{color: 'black',marginBottom:20,}}> Counter Strike 1.6 </h4>
                        </center>
                    </Col>

                    <Col className="try" md={4} sm={6} >
                        <img src={fifa} className="competition-img-align" alt="img11" />
                        <center>
                            <h4 style={{color: 'black', textAlign: 'center',}}> Fifa 19 </h4>
                        </center>
                    </Col>

                    <Col className="try" md={4} sm={6} >
                        <img src={pubg} className="competition-img-align" alt="img11" />
                        <center>
                            <h4 style={{color: 'black', textAlign: 'center'}}> PubG </h4>
                        </center>
                    </Col>

                    <Col className="try" md={4} sm={6} >
                        <img src={dota2} className="competition-img-align" alt="img11" />
                        <center>
                            <h4 style={{color: 'black',textAlign: 'center',}}> DOTA 2 </h4>
                        </center>
                    </Col>

                    <Col className="try" md={4} sm={6} >
                        <img src={nfs} className="competition-img-align" alt="img11" />
                        <center>
                            <h4 style={{color: 'black', textAlign: 'center',}}> NFS World </h4>
                        </center>
                    </Col>
               </Row>
              </Styles>
            </Container>
        </React.Fragment >
    );
};

export default Competitions;
