import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";

class Dashboard extends Component {

  state = {
    Modules: [],
    teamsCount: '',
    participantsCount: '',
    universityCount: '',
    ambassadorsCount: '',
    paidTeams: '',
  }


  getInfo = async () => {
    const res = await fetch('http://localhost:5000/api/dashboard')

    if (res.status !== 200) {
      console.log("error")
    }

    const data = await res.json()
    return data;
  }

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  componentDidMount() {
    this.getInfo()
      .then(res => {
        this.setState({
          Modules: res[0],
          teamsCount: res[1],
          participantsCount: res[2],
          universityCount: res[3],
          ambassadorsCount: res[4],
          paidTeams: res[5][0]['Paid Teams %'],
        })
      })
  }


  render() {

    // Data For Pie Chart
    const dataPie = {
      labels: [`${this.state.paidTeams}%`, `${100 - this.state.paidTeams}%`],
      series: [this.state.paidTeams, 100 - this.state.paidTeams]
    }

    var legendPie = {
      names: ["Paid", "Unpaid"],
      types: ["info", "danger",]
    };

    // Data for Bar Chart
    var dataBar = {
      labels: this.state.Modules.map(mod => mod.m_name),
      series: [
        this.state.Modules.map(mod => mod.Participants),
        this.state.Modules.map(mod => mod.Teams),
        this.state.Modules.map(mod => mod.University),
      ]
    };

    var optionsBar = {
      seriesBarDistance: 10,
      axisX: {
        showGrid: false,
      },
      height: "245px"
    };
    var responsiveBar = [
      [
        "screen and (max-width: 640px)",
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }
      ]
    ];
    var legendBar = {
      names: ["Participants", "Teams", "University"],
      types: ["info", "danger", "warning"]
    };

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-users text-light" />}
                statsText="Teams"
                statsValue={this.state.teamsCount[0] && this.state.teamsCount[0].Teams}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Teams Registered"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-add-user text-success" />}
                statsText="Participants"
                statsValue={this.state.participantsCount[0] && this.state.participantsCount[0].Participants}
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Participants Registered"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-culture text-danger" />}
                statsText="Universities"
                statsValue={this.state.universityCount[0] && this.state.universityCount[0].University}
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="Universities Participating"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-user text-info" />}
                statsText="Ambassidors"
                statsValue={this.state.ambassadorsCount[0] && this.state.ambassadorsCount[0].Ambassadors}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Ambassadors Registered"
              />
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <Card
                id="chartActivity"
                title="Modules Statistics"
                category="Includes Teams, Participants, Univerties"
                stats="Real Time Statistics"
                statsIcon="fa fa-clock-o"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataBar}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendBar)}</div>
                }
              />
            </Col>
            <Col md={4}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Payment Info"
                category="No of Paid and Unpaid Teams"
                stats="Real Time Payment"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={dataPie} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendPie)}</div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
