import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import ReactTable from 'react-table';
import NotificationSystem from 'react-notification-system';

class Participants extends Component {

  constructor(props) {
    super(props)
    this.notificationSystem = React.createRef();

    this.state = {
      Participants: [],
      editParticipantsDisplay: '',
      editParticipantID: '',
      deleteParticipantID: '',
      participantName: '',
      participantNumber: '',
      participantEmail: '',
    }
  }

  editParticipantsForm = () => {
    const index = this.state.Participants.findIndex(participant => {
      return participant.p_id === this.state.editParticipantID
    })

    return (
      <form className="grid" onSubmit={this.modifyParticipants}>
        <div className="border container-fluid ">
          <i className="fa fa-window-close-o px"
            onClick={() => this.setState({ editParticipantsDisplay: false })}
          />
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="t_name">Participants Name</label>
              <input
                required
                type="text"
                autoComplete="off"
                defaultValue={this.state.Participants[index].p_name}
                onChange={this.handleInput}
                name="participantName"
                className="form-control"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="t_name">Participants Number</label>
              <input
                required
                type="text"
                autoComplete="off"
                defaultValue={this.state.Participants[index].p_num}
                onChange={this.handleInput}
                name="participantNumber"
                className="form-control"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="t_name">Participants Email</label>
              <input
                required
                type="text"
                autoComplete="off"
                defaultValue={this.state.Participants[index].p_email}
                onChange={this.handleInput}
                name="participantEmail"
                className="form-control"
              />
            </div>
            <div className="form-group col-md-6">
              <button
                type="submit"
                className="btn btn-default btn-fill mt"
              >
                Edit Participants
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

  getParticipants = async () => {
    const res = await fetch('http://localhost:5000/api/participant/')

    if (res.status !== 200) {
      this.notification('Fetching Error', 'error');
    }

    const data = await res.json()
    return data
  }

  modifyParticipants = (e) => {
    e.preventDefault()

    const participant = {
      id: this.state.editParticipantID,
      name: this.state.participantName,
      number: this.state.participantNumber,
      email: this.state.participantEmail,
    }

    fetch(`http://localhost:5000/api/participant/modify?p_id=${participant.id}&p_name=${participant.name}&p_num=${participant.number}&p_email=${participant.email}`, {
      method: 'PUT'
    }).then(res => {
      res.status === 200 ? this.notification('Modified Successfully', 'success') : this.notification('Something Went Wrong', 'error')
    })
      .catch(err => console.log(err))
  }

  deleteParticipants = () => {

    const p_id = this.state.deleteParticipantID

    if (window.confirm('Are you sure you wish to delete this item?')) {
      fetch(`http://localhost:5000/api/participant/delete?p_id=${p_id}`, {
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
    this.getParticipants()
      .then(res => {
        this.setState({
          Participants: res
        })
      })
  }

  render() {

    const ParticipantsColumns = [{
      Header: 'ID',
      accessor: 'p_id',
      sortable: true,
      filterable: true,
      maxWidth: 80,
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
      Header: 'Participant Name',
      accessor: 'p_name',
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
      Header: 'Participant Email',
      accessor: 'p_email',
      sortable: true,
      filterable: true,
      maxWidth: 350,
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
      Header: 'Contact Number',
      accessor: 'p_num',
      filterable: true,
      maxWidth: 160,
      Filter: ({ filter, onChange }) => (
        <input
          type='text'
          placeholder="Filter by Number"
          value={filter ? filter.value : ''}
          onChange={event => onChange(event.target.value)}
        />
      )
    },
    {
      Header: 'Team Name',
      accessor: 't_name',
      sortable: true,
      filterable: true,
      maxWidth: 220,
      Filter: ({ filter, onChange }) => (
        <input
          type='text'
          placeholder="Filter by Team"
          value={filter ? filter.value : ''}
          onChange={event => onChange(event.target.value)}
        />
      )
    },
    {
      Header: 'Module',
      accessor: 'm_name',
      maxWidth: 150,
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
      maxWidth: 160,
      filterable: true,
      sortable: true,
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
      Header: 'Leader',
      accessor: 'isLeader',
      filterable: true,
      maxWidth: 100,
      style: {
        textAlign: "center",
      },
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
      Header: 'Controls',
      sortable: true,
      filterable: false,
      maxWidth: 80,
      Cell: props => {
        return (
          <div className="text-center ">
            <i
              className="fa fa-minus-circle text-danger iconStyles"
              onClick={async () => {
                await this.setState({
                  deleteParticipantID: props.original.p_id
                })
                await this.deleteParticipants()
              }}
            />
            <i
              className="fa fa-pencil text-warning padding-left-lg iconStyles"
              onClick={() => {
                this.setState({
                  editParticipantID: props.original.p_id,
                  editParticipantsDisplay: true,
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

          {this.state.editParticipantsDisplay && this.editParticipantsForm()}

          <Row>
            <Col md={12}>
              <ReactTable
                data={this.state.Participants}
                columns={ParticipantsColumns}
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

export default Participants;
