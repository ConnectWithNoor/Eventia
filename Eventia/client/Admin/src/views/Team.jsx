import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import ReactTable from 'react-table';
import NotificationSystem from 'react-notification-system';

class Team extends Component {

  constructor(props) {
    super(props)
    this.notificationSystem = React.createRef();

    this.state = {
      Team: [],
      University: [],
      Modules: [],
      editTeamDisplay: false,
      editTeamID: '',
      deleteTeamID: '',
      teamName: '',
      teamModule: '',
      teamPayment: '',
      teamUni: '',
    }
  }

  editTeamForm = () => {
    const index = this.state.Team.findIndex(team => {
      return team.t_id === this.state.editTeamID
    })

    return (
      <form className="grid" onSubmit={this.modifyTeam}>
        <div className="border container-fluid ">
          <i className="fa fa-window-close-o px"
            onClick={() => this.setState({ editTeamDisplay: false })}
          />
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="t_name">Team Name</label>
              <input
                autoComplete="off"
                required
                type="text"
                defaultValue={this.state.Team[index].t_name}
                onChange={this.handleInput}
                name="teamName"
                className="form-control"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="isPaid">Team Payment</label>
              <select
                className="form-control"
                name="teamPayment"
                onChange={this.handleInput}
              >
                <option selected disabled >
                  Select Payment
                </option>
                <option value={1}>Paid</option>
                <option value={0}>Unpaid</option>

              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="uni_name">University Name</label>
              <select
                className="form-control"
                name="teamUni"
                onChange={this.handleInput}
              >
                <option
                  selected
                  disabled
                >
                  Choose University
                  </option>
                {this.state.University.map(uni => {
                  return (
                    <option
                      value={uni.uni_id}
                      key={uni.uni_id}
                    >
                      {uni.uni_name}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="uni_name">Module Name</label>
              <select
                className="form-control"
                name="teamModule"
                onChange={this.handleInput}
              >
                <option
                  selected
                  disabled
                >
                  Choose Module
                </option>
                {this.state.Modules.map(mod => {
                  return (
                    <option
                      value={mod.m_id}
                      key={mod.m_id}
                    >
                      {mod.m_name}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <button
                type="submit"
                className="btn btn-default btn-fill mt"
              >
                Edit Team
              </button>
            </div>
          </div>
        </div>
      </form>
    )
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  getTeam = async () => {
    const res = await fetch('http://localhost:5000/api/team/uni')

    if (res.status !== 200) {
      this.notification('Fetching Error', 'error');
    }

    const data = await res.json()
    return data
  }

  modifyTeam = (e) => {
    e.preventDefault()

    const team = {
      id: this.state.editTeamID,
      name: this.state.teamName,
      payment: this.state.teamPayment,
      uni: this.state.teamUni,
      mod: this.state.teamModule
    }

    // console.log(team.id, team.name, team.payment, team.uni, team.mod)
    fetch(`http://localhost:5000/api/Team/modify?t_id=${team.id}&t_name=${team.name}&isPaid=${team.payment}&uni_id=${team.uni}&m_id=${team.mod}`, {
      method: 'PUT'
    }).then(res => {
      res.status === 200 ? this.notification('Modified Successfully', 'success') : this.notification('Something Went Wrong', 'error')
    })
      .catch(err => console.log(err))
  }

  deleteTeam = () => {

    const t_id = this.state.deleteTeamID
    console.log(t_id)
    if (window.confirm('Are you sure you wish to delete this item?')) {
      fetch(`http://localhost:5000/api/team/delete?t_id=${t_id}`, {
        method: 'DELETE'
      })
        .then(res => {
          res.status === 200 ? this.notification('Deleted Successfully', 'success') : this.notification('Something Went Wrong', 'error')
        })
    }
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

  componentDidMount() {
    this.getTeam()
      .then(res => {
        this.setState({
          Team: res[0],
          University: res[1],
          Modules: res[2]
        })
      })
  }

  render() {

    const teamColumns = [{
      Header: 'Team ID',
      accessor: 't_id',
      sortable: true,
      filterable: true,
      maxWidth: 120,
      style: {
        textAlign: "center",
      },
      Filter: ({ filter, onChange }) => (
        <input
          type='text'
          placeholder="Filter by ID"
          value={filter ? filter.value : ''}
          onChange={event => onChange(event.target.value)}
        />
      ),
    },
    {
      Header: 'Team Name',
      accessor: 't_name',
      sortable: true,
      filterable: true,
      maxWidth: 250,
      Filter: ({ filter, onChange }) => (
        <input
          type='text'
          placeholder="Filter by Name"
          value={filter ? filter.value : ''}
          onChange={event => onChange(event.target.value)}
        />
      )
    },
    {
      Header: 'Team Leader',
      accessor: 'p_name',
      filterable: true,
      maxWidth: 150,
      Filter: ({ filter, onChange }) => (
        <input
          type='text'
          placeholder="Filter by Leader"
          value={filter ? filter.value : ''}
          onChange={event => onChange(event.target.value)}
        />
      )
    },
    {
      Header: 'Team Lead Number',
      accessor: 'p_num',
      filterable: true,
      maxWidth: 220,
      Filter: ({ filter, onChange }) => (
        <input
          type='text'
          placeholder="Filter by Lead Number"
          value={filter ? filter.value : ''}
          onChange={event => onChange(event.target.value)}
        />
      )
    },
    {
      Header: 'Module',
      accessor: 'm_name',
      maxWidth: 200,
      filterable: true,
      Filter: ({ filter, onChange }) => (
        <input
          type='text'
          placeholder="Filter by Module"
          value={filter ? filter.value : ''}
          onChange={event => onChange(event.target.value)}
        />
      )
    },
    {
      Header: 'University',
      accessor: 'uni_name',
      maxWidth: 200,
      filterable: true,
      Filter: ({ filter, onChange }) => (
        <input
          type='text'
          placeholder="Filter by University"
          value={filter ? filter.value : ''}
          onChange={event => onChange(event.target.value)}
        />
      )
    },
    {
      Header: 'Team Payment',
      accessor: 'isPaid',
      filterable: true,
      maxWidth: 150,
      style: {
        textAlign: "center",
      },
      Filter: ({ filter, onChange }) => (
        <input
          type='text'
          placeholder="Filter by Payment"
          value={filter ? filter.value : ''}
          onChange={event => onChange(event.target.value)}
        />
      )
    },
    {
      Header: 'Controls',
      sortable: true,
      filterable: false,
      maxWidth: 150,
      Cell: props => {
        return (
          <div className="text-center ">
            <i
              className="fa fa-minus-circle text-danger iconStyles"
              onClick={async () => {
                await this.setState({
                  deleteTeamID: props.original.t_id
                })
                await this.deleteTeam()
              }}
            />
            <i
              className="fa fa-pencil text-warning padding-left-lg iconStyles"
              onClick={() => {
                this.setState({
                  editTeamID: props.original.t_id,
                  editTeamDisplay: true,
                })
              }}
            />
          </div>
        )
      }
    }]

    return (
      <div className="content" >
        <Grid fluid>

          {this.state.editTeamDisplay && this.editTeamForm()}

          <Row>
            <Col md={12}>
              <ReactTable
                data={this.state.Team}
                columns={teamColumns}
                defaultPageSize={10}
              >
              </ReactTable>
            </Col>
          </Row>
        </Grid>
        <NotificationSystem ref={this.notificationSystem} />
      </div>
    );
  }
}

export default Team;
