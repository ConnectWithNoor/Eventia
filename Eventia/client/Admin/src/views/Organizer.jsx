import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import ReactTable from 'react-table';
import NotificationSystem from 'react-notification-system';

class Organizer extends Component {

  constructor(props) {
    super(props)
    this.notificationSystem = React.createRef();

    this.state = {
      organizers: [],
      modules: [],
      createOrganizerDisplay: false,
      editOrganizerDisplay: false,
      editOrganizerID: '',
      deleteOrganizerID: '',
      organizerName: '',
      organizerNumber: '',
      organizerEmail: '',
      organizerModule: '',
    }
  }

  createOrganizerForm = () => {
    return (
      <form className="grid" onSubmit={this.addOrganizer}>
        <div className="border container-fluid ">
          <i className="fa fa-window-close-o px"
            onClick={() => this.setState({ createOrganizerDisplay: false })}
          />
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="m_name">Organizer Name</label>
              <input
                required
                autoComplete="off"
                type="text"
                className="form-control"
                onChange={this.handleInput}
                name="organizerName"
                placeholder="Organizer Name"
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="m_price">Organizer Phone</label>
              <input
                required
                autoComplete="off"
                type="number"
                className="form-control"
                onChange={this.handleInput}
                name="organizerNumber"
                placeholder="Organizer Number"
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="m_name">Organizer Email</label>
              <input
                required
                autoComplete="off"
                type="email"
                className="form-control"
                onChange={this.handleInput}
                name="organizerEmail"
                placeholder="Organizer Email"
              />
            </div>

          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="m_name">Module</label>
              <select
                name="organizerModule"
                onChange={this.handleInput}
                className="form-control"
              >
                <option
                  selected
                  disabled
                >
                  Choose Module
              </option>
                {this.state.modules.map(module => {
                  return (
                    <option
                      key={module.m_id}
                      value={module.m_id}
                    >
                      {module.m_name}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="form-group col-md-6">
              <button
                type="submit"
                className="btn btn-default btn-fill mt"
              >
                Create Organizer
              </button>
            </div>
          </div>
        </div>
      </form>
    )
  }

  editOrganizerForm = () => {
    const index = this.state.organizers.findIndex(organizer => {
      return organizer.o_id === this.state.editOrganizerID
    })

    return (
      <form className="grid" onSubmit={this.modifyOrganizer}>
        <div className="border container-fluid ">
          <i className="fa fa-window-close-o px"
            onClick={() => this.setState({ editOrganizerDisplay: false })}
          />
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="m_name">Organizer Name</label>
              <input
                required
                type="text"
                className="form-control"
                onChange={this.handleInput}
                name="organizerName"
                defaultValue={this.state.organizers[index].o_name}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="m_price">Organizer Phone</label>
              <input
                required
                autoComplete="off"
                type="number"
                className="form-control"
                onChange={this.handleInput}
                name="organizerNumber"
                defaultValue={this.state.organizers[index].o_contact}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="m_name">Organizer Email</label>
              <input
                required
                autoComplete="off"
                type="email"
                className="form-control"
                onChange={this.handleInput}
                name="organizerEmail"
                defaultValue={this.state.organizers[index].o_email}
              />
            </div>

          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="m_name">Module</label>
              <select
                name="organizerModule"
                onChange={this.handleInput}
                className="form-control"
              >
                <option
                  selected
                  disabled
                >
                  Choose Module
              </option>
                {this.state.modules.map(module => {
                  return (
                    <option
                      key={module.m_id}
                      value={module.m_id}
                    >
                      {module.m_name}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="form-group col-md-6">
              <button
                type="submit"
                className="btn btn-default btn-fill mt"
              >
                Edit 
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

  getOrganizer = async () => {
    const res = await fetch('http://localhost:5000/api/organizer')

    if (res.status !== 200) {
      this.notification('Fetching Error', 'error');
    }

    const data = await res.json()
    return data
  }

  addOrganizer = (e) => {
    e.preventDefault()

    const Organizer = {
      name: this.state.organizerName,
      num: this.state.organizerNumber,
      email: this.state.organizerEmail,
      module: this.state.organizerModule,
    }

    fetch(`http://localhost:5000/api/organizer/add?o_name=${Organizer.name}&o_contact=${Organizer.num}&o_email=${Organizer.email}&m_id=${Organizer.module}`, {
      method: 'POST',
    }
    )
      .then(res => {
        res.status === 200 ? this.notification('Added Successfully', 'success') : this.notification('Something Went Wrong', 'error')
      })
      .catch(err => console.log(err))
  }

  modifyOrganizer = (e) => {
    e.preventDefault()

    const Organizer = {
      name: this.state.organizerName,
      num: this.state.organizerNumber,
      email: this.state.organizerEmail,
      module: this.state.organizerModule,
      id: this.state.editOrganizerID,
    }

    fetch(`http://localhost:5000/api/organizer/modify?o_id=${Organizer.id}&o_name=${Organizer.name}&o_contact=${Organizer.num}&o_email=${Organizer.email}&m_id=${Organizer.module}`, 
    {
      method: 'PUT'
    }
    ).then(res => {
      res.status === 200 ? this.notification('Modified Successfully', 'success') : this.notification('Something Went Wrong', 'error')
    })
      .catch(err => console.log(err))
  }

  deleteOrganizer = async () => {

    const o_id = this.state.deleteOrganizerID

    if (window.confirm('Are you sure you wish to delete this item?')) {
      fetch(`http://localhost:5000/api/organizer/delete?o_id=${o_id}`, {
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
    this.getOrganizer()
      .then(res => {
        this.setState({
          organizers: res[0],
          modules: res[1]
        })
      })
  }

  render() {
    const OrganizerColumns = [{
      Header: 'Organizer ID',
      accessor: 'o_id',
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
      Header: 'Organizer Name',
      accessor: 'o_name',
      sortable: true,
      filterable: true,
      maxWidth: 200,
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
      Header: 'Organizer Phone',
      accessor: 'o_contact',
      sortable: true,
      filterable: true,
      maxWidth: 200,
      Filter: ({ filter, onChange }) => (
        <input
          type='text'
          placeholder="Filter by Phone"
          value={filter ? filter.value : ''}
          onChange={event => onChange(event.target.value)}
        />
      )
    },
    {
      Header: 'Organizer Email',
      accessor: 'o_email',
      sortable: true,
      filterable: false,
      maxWidth: 250,
    },
    {
      Header: 'Module',
      accessor: 'm_name',
      sortable: true,
      filterable: false,
      maxWidth: 250,
    },
    {
      Header: 'Controls',
      sortable: true,
      filterable: false,
      maxWidth: 200,
      Cell: props => {
        return (
          <div className="text-center ">
            <i
              className="fa fa-minus-circle text-danger iconStyles"
              onClick={async () => {
                await this.setState({
                  deleteOrganizerID: props.original.o_id
                })
                await this.deleteOrganizer()
              }}
            />
            <i
              className="fa fa-pencil text-warning padding-left-lg iconStyles"
              onClick={() => {
                this.setState({
                  editOrganizerID: props.original.o_id,
                  editOrganizerDisplay: true,
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
          <Row>
            <button
              className="btn btn-success btn-fill display-box buttonStyles"
              onClick={() => {
                this.setState({
                  createOrganizerDisplay: true,
                })
              }}
            >
              <i className="fa fa-plus "></i>
              Create
            </button>
          </Row>

          {this.state.createOrganizerDisplay && this.createOrganizerForm()}
          {this.state.editOrganizerDisplay && this.editOrganizerForm()}

          <Row>
            <Col md={12}>
              <ReactTable
                data={this.state.organizers}
                columns={OrganizerColumns}
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

export default Organizer;
