import React from 'react';
import { Row, Col, Container } from 'react-bootstrap'
// import c1 from '../../assets/img/1.jpg';
import c2 from '../../assets/img/2.jpg';
import c3 from '../../assets/img/3.jpg';
import c4 from '../../assets/img/4.jpg';
import foodPic from '../../assets/img/1.jpg'
import styled from 'styled-components';


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
  vertical-align: middle;
  max-width: 100%;
  margin: 0px;


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




`;

const EventFeatures = () => {
    return (
        <React.Fragment>
        <Styles>
            <Container fluid={true} className="cont">
            <Row className="align-items-center justify-content-center mt-5">
                <Col sm={12} className="text-center">
                    <h1 className="text-h1" style={{marginBottom:25,textTransform:'uppercase'}}>Event Features</h1>
                </Col>
            </Row>

                <Row className="Row1">

                    <Col className="try" md={4} sm={6} zoom>
                        <img src={c2} className="imge" alt="img11" />
                        <center>
                            <h4  style={{color: 'black',marginTop:0,marginBottom:20}}> Live Game Updates </h4>
                        </center>
                    </Col>

                    <Col className="try" md={4} sm={6} >
                        <img src={foodPic} className="imge" alt="img11" />
                        <center>
                            <h4 style={{color: 'black',marginTop:0}}> Free Food for Participants </h4>
                        </center>
                    </Col>

                    <Col className="try" md={4} sm={6} >
                        <img src={c3} className="imge" alt="img11" />
                        <center>
                            <h4 style={{color: 'black',marginTop:0}}> Food Festival for All </h4>
                        </center>
                    </Col>

                    <Col className="try" md={4} sm={6} >
                        <img src={c4} className="imge" alt="img11" />
                        <center>
                            <h4 style={{color: 'black',marginTop:0}}> Free Arcade Games </h4>
                        </center>
                    </Col>



               </Row>



            </Container>
            </Styles>
        </React.Fragment >
    );
};

export default EventFeatures;
