import React from 'react';
import NavigationBar from '../NavigationBar/Navigationbar';
import NotificationSystem from 'react-notification-system';

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.notificationSystem = React.createRef();

    this.state = {
      universityList: [],
      modulesList: [],
      teamName: '',
      teamModule: '',
      teamUniversity: '',
      leaderName: '',
      leaderContact: '',
      leaderEmail: '',
      member1_Name: '',
      member1_Contact: '',
      member1_Email: '',
      member2_Name: '',
      member2_Contact: '',
      member2_Email: '',
    }
  }

  getInfo = async () => {
    const res = await fetch('http://localhost:5000/api/team/uni')
    if (res.status !== 200) {
      console.log("error fetching data")
    }

    const data = await res.json()
    return data;
  }

  inputHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  submitForm = (e) => {
    e.preventDefault()

    fetch(`http://localhost:5000/api/register?t_name=${this.state.teamName}&m_id=${this.state.teamModule}&uni_id=${this.state.teamUniversity}&leader_name=${this.state.leaderName}&leader_contact=${this.state.leaderContact}&leader_email=${this.state.leaderEmail}&member1_name=${this.state.member1_Name}&member1_contact=${this.state.member1_Contact}&member1_email=${this.state.member1_Email}&member2_name=${this.state.member2_Name}&member2_contact=${this.state.member2_Contact}&member2_email=${this.state.member2_Email}
    `)
      .then(res => {
        res.status === 200 ? this.notification('Registered Successfull', 'success') : this.notification('Registered Failed', 'error')
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getInfo()
      .then(res => {
        this.setState({
          universityList: res[1],
          modulesList: res[2],
        })
      })
  }

  notification = (msg, lev) => {
    const notification = this.notificationSystem.current;
    notification.addNotification({
      Title: 'Eventia Admin Panel',
      message: msg,
      level: lev,
      position: 'tr', //top-right
      autoDismiss: 3,

    });
  };

  render() {
    return (
      <React.Fragment>
        <NavigationBar bgColor={'#000'} />
        <div className="bg-light text-dark">
          <div className="container">
            <div className="d-flex justify-content-center">
              <p className="mt-4 text-uppercase font-weight-bold h2">Register Now</p>
            </div>
            <div className="border border-info rounded mt-2 p-4">
              <form onSubmit={this.submitForm}>
                <div
                  className="row">
                  <div className="form-group col-md-4 ">
                    <label htmlFor="teamName">Team Name
                    <span className="font-weight-bold"> (Required)</span>
                    </label>
                    <input
                      name="teamName"
                      autoComplete = "off"
                      type="text"
                      required
                      onChange={this.inputHandler}
                      placeholder="Team Name"
                      className="form-control"
                    >
                    </input>
                  </div>
                  <div className="form-group col-md-4 ">
                    <label htmlFor="module">Select Module
                    <span className="font-weight-bold"> (Required)</span>
                    </label>
                    <select
                      name="teamModule"
                      required
                      onChange={this.inputHandler}
                      className="form-control"
                    >
                      <option
                        selected
                        disabled
                      >
                        Select Module
                    </option>
                      {this.state.modulesList.map(mod => {
                        return (
                          <option
                            key={mod.m_id}
                            value={mod.m_id}
                          >
                            {mod.m_name}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                  <div className="form-group col-md-4 ">
                    <label htmlFor="teamUniversity">Select University
                    <span className="font-weight-bold"> (Required)</span>
                    </label>
                    <select
                      name="teamUniversity"
                      required
                      autoComplete = "off"
                      onChange={this.inputHandler}
                      className="form-control"
                    >
                      <option
                        selected

                        disabled
                      >
                        Select University
                    </option>
                      {this.state.universityList.map(uni => {
                        return (
                          <option
                            key={uni.uni_id}
                            value={uni.uni_id}
                          >
                            {uni.uni_name}
                          </option>
                        )
                      })}
                    </select>
                  </div>

                </div>
                <hr />
                <div
                  className="row">
                  <div className="form-group col-md-4 ">
                    <label htmlFor="leaderName">Leader Name
                    <span className="font-weight-bold"> (Required)</span>
                    </label>
                    <input
                      name="leaderName"
                      type="text"
                      required
                      autoComplete = "off"
                      onChange={this.inputHandler}
                      placeholder="Leader Name"
                      className="form-control"
                    >
                    </input>
                  </div>
                  <div className="form-group col-md-4 ">
                    <label htmlFor="leaderContact">Leader Contact
                    <span className="font-weight-bold"> (Required)</span>
                    </label>
                    <input
                      name="leaderContact"
                      required
                      autoComplete = "off"
                      type="number"
                      onChange={this.inputHandler}
                      placeholder="Contact Number"
                      className="form-control"
                    >
                    </input>
                  </div>
                  <div className="form-group col-md-4 ">
                    <label htmlFor="leaderEmail">Leader Email
                    <span className="font-weight-bold"> (Required)</span>
                    </label>
                    <input
                      name="leaderEmail"
                      type="email"
                      required
                      autoComplete = "off"
                      onChange={this.inputHandler}
                      className="form-control"
                      placeholder="Leader Email"
                    >
                    </input>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="participants">1. Member Name</label>
                      <input
                        name="member1_Name"
                        type="text"
                        autoComplete = "off"
                        onChange={this.inputHandler}
                        placeholder="Member Name"
                        className="form-control"
                      >
                      </input>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="participants">1. Member Contact</label>
                      <input
                        name="member1_Contact"
                        type="number"
                        autoComplete = "off"
                        onChange={this.inputHandler}
                        placeholder="Member Contact"
                        className="form-control"
                      >
                      </input>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="participants">1. Member Email</label>
                      <input
                        name="member1_Email"
                        type="text"
                        autoComplete = "off"
                        onChange={this.inputHandler}
                        placeholder="Member Email"
                        className="form-control"
                      >
                      </input>
                    </div>
                  </div>

                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="participants">2. Member Name</label>
                      <input
                        name="member2_Name"
                        type="text"
                        autoComplete = "off"
                        onChange={this.inputHandler}
                        placeholder="Member Name"
                        className="form-control"
                      >
                      </input>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="participants">2. Member Contact</label>
                      <input
                        name="member2_Contact"
                        type="number"
                        autoComplete = "off"
                        onChange={this.inputHandler}
                        placeholder="Member Contact"
                        className="form-control"
                      >
                      </input>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="participants">2. Member Email</label>
                      <input
                        name="member2_Email"
                        type="text"
                        autoComplete = "off"
                        onChange={this.inputHandler}
                        placeholder="Member Email"
                        className="form-control"
                      >
                      </input>
                    </div>
                  </div>

                </div>
                <div className="d-flex justify-content-end pr-5">
                  <input
                    type="submit"
                    className="btn btn-primary btn-lg mt-2"
                    value="Register Now"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <NotificationSystem ref={this.notificationSystem} />
      </React.Fragment>

    );
  }
}

export default Register;
