import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap'

class Timer extends Component {

    state = {
        seconds: '',
        hours: '',
        minutes: '',
        days: '',
        weeks: ''
    }

    getTime = async () => {
        const countDownTime = await new Date("May 19, 2019 16:00:00").getTime();
        const currentTime = await new Date().getTime();
        const differenceTime = countDownTime - currentTime;

        const seconds = await Math.floor((differenceTime % (1000 * 60)) / 1000);
        const hours = await Math.floor((differenceTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = await Math.floor((differenceTime % (1000 * 60 * 60)) / (1000 * 60));
        const days = await Math.floor(differenceTime / (1000 * 60 * 60 * 24) % 30);
        const weeks = await Math.floor((differenceTime / (1000 * 60 * 60 * 24)) / 7)
        return ({
            seconds,
            minutes,
            hours,
            days,
            weeks
        })
    }

    componentDidMount() {
        setInterval(() => {
            this.getTime()
                .then(data => {
                    this.setState({
                        seconds: data.seconds,
                        minutes: data.minutes,
                        hours: data.hours,
                        days: data.days,
                        weeks: data.weeks
                    })
                })
                .catch(err => console.error(err))
        }, 1000);
    }

    render() {
        return (
            <Row>
                <Col className="timer-box" sm={5} md={3} lg={2}>
                    <div>
                        <p className="time-text-p">{this.state.weeks}</p>
                        <p className="time-text-p-title">Weeks</p>
                    </div>
                </Col>
                <Col className="timer-box" sm={5} md={3} lg={2}>
                    <div >
                        <p className="time-text-p">{this.state.days}</p>
                        <p className="time-text-p-title">Days</p>
                    </div>
                </Col >
                <Col className="timer-box" sm={5} md={3} lg={2}>
                    <div>
                        <p className="time-text-p">{this.state.hours}</p>
                        <p className="time-text-p-title">Hours</p>
                    </div>
                </Col>
                <Col className="timer-box" sm={5} md={3} lg={2}>
                    <div>
                        <p className="time-text-p">{this.state.minutes}</p>
                        <p className="time-text-p-title">Mins</p>
                    </div>
                </Col>
                <Col className="timer-box" sm={10} md={3} lg={2}>
                    <div>
                        <p className="time-text-p">{this.state.seconds}</p>
                        <p className="time-text-p-title">Secs</p>
                    </div>
                </Col>
            </Row>
        );
    }
}
export default Timer;