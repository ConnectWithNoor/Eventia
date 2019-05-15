import React from 'react';

import NavigationBar from '../Component/NavigationBar/Navigationbar';
import Hero from '../Component/Hero/Hero';
import EventInfo from '../Component/EventInfo/EventInfo';
import Team from '../Component/Team/Team';
import EventFeatures from '../Component/EventFeatures/EventFeatures';
import Competitions from '../Component/Competitions/Competitions';
import Footer from '../Component/Footer/Footer';
import { Element } from 'react-scroll'


const Main = () => {
    return (
        <React.Fragment>
            <div id="home">
                <div className="layer">
                    <div className="container">
                        <NavigationBar />
                        <Element name="homeSection" className="element">
                            <Hero />
                        </Element>
                    </div>
                </div>
            </div>
            <div className="container">

                <Element name="aboutSection">
                    <EventInfo />
                </Element>
                <Element name="competitionSection" className="element">
                    <Competitions />
                </Element>
                <Element name="featuresSection" className="element">
                    <EventFeatures />
                </Element>
                <Element name="teamSection" className="element">
                    <Team />
                </Element>
            </div>
            <Footer />

        </React.Fragment>
    );
};

export default Main;