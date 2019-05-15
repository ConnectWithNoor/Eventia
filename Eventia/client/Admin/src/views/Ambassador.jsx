import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import ReactTable from 'react-table';
import NotificationSystem from 'react-notification-system';

class Ambassador extends Component {

  constructor(props) {
    super(props)
    this.notificationSystem = React.createRef();

    this.state = {
      ambassador: [],
      university: [],
      createAmbassadorDisplay: false,
      editAmbassadorDisplay: false,
      editAmbassadorID: '',
      deleteAmbassadorID: '',
      ambassadorName: '',
      ambassadorNumber: '',
      ambassadorEmail: '',
      ambassadorUni: '',
    }
  }

  createAmbassadorForm = () => {
    return (
      <form className="grid" onSubmit={this.addAmbassador}>
        <div className="border container-fluid ">
          <i className="fa fa-window-close-o px"
            onClick={() => this.setState({ createAmbassadorDisplay: false })}
          />
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="m_name">Ambassador Name</label>
              <input
                required
                autoComplete="off"
                type="text"
                className="form-control"
                onChange={this.handleInput}
                name="ambassadorName"
                placeholder="Ambassador Name"
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="m_price">Ambassador Phone</label>
              <input
                required
                autoComplete="off"
                type="number"
                className="form-control"
                onChange={this.handleInput}
                name="ambassadorNumber"
                placeholder="Ambassador Number"
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="m_name">Ambassador Email</label>
              <input
                required
                autoComplete="off"
                type="email"
                className="form-control"
                onChange={this.handleInput}
                name="ambassadorEmail"
                placeholder="Ambassador Email"
              />
            </div>

          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="m_name">Ambassador University</label>
              <select
                name="ambassadorUni"
                onChange={this.handleInput}
                className="form-control"
              >
                <option
                  selected
                  disabled
                >
                  Choose University
              </option>
                {this.state.university.map(uni => {
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
            <div className="form-group col-md-6">
              <button
                type="submit"
                className="btn btn-default btn-fill mt"
              >
                Create Ambassador
              </button>
            </div>
          </div>
        </div>
      </form>
    )
  }

  editAmbassadorForm = () => {
    const index = this.state.ambassador.findIndex(amb => {
      return amb.a_id === this.state.editAmbassadorID
    })

    return (
      <form className="grid" onSubmit={this.modifyAmbassador}>
        <div className="border container-fluid ">
          <i className="fa fa-window-close-o px"
            onClick={() => this.setState({ editAmbassadorDisplay: false })}
          />
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="m_name">Ambassador Name</label>
              <input
                autoComplete="off"
                required
                type="text"
                className="form-control"
                onChange={this.handleInput}
                name="ambassadorName"
                defaultValue={this.state.ambassador[index].a_name}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="m_price">Ambassador Phone</label>
              <input
                required
                autoComplete="off"
                type="number"
                className="form-control"
                onChange={this.handleInput}
                name="ambassadorNumber"
                defaultValue={this.state.ambassador[index].a_contact}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="m_name">Ambassador Email</label>
              <input
                required
                autoComplete="off"
                type="email"
                className="form-control"
                onChange={this.handleInput}
                name="ambassadorEmail"
                defaultValue={this.state.ambassador[index].a_email}
              />
            </div>

          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="m_name">Ambassador University</label>
              <select
                name="ambassadorUni"
                onChange={this.handleInput}
                className="form-control"
              >
                <option
                  selected
                  disabled
                >
                  Choose University
              </option>
                {this.state.university.map(uni => {
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

  getAmbassador = async () => {
    const res = await fetch('http://localhost:5000/api/ambassador')

    if (res.status !== 200) {
      this.notification('Fetching Error', 'error');
    }

    const data = await res.json()
    return data
  }

  addAmbassador = (e) => {
    e.preventDefault()

    const Ambassador = {
      name: this.state.ambassadorName,
      num: this.state.ambassadorNumber,
      email: this.state.ambassadorEmail,
      uni: this.state.ambassadorUni,
    }

    fetch(`http://localhost:5000/api/ambassador/add?a_name=${Ambassador.name}&a_contact=${Ambassador.num}&a_email=${Ambassador.email}&uni_id=${Ambassador.uni}`, {
      method: 'POST',
    }
    )
      .then(res => {
        res.status === 200 ? this.notification('Added Successfully', 'success') : this.notification('Something Went Wrong', 'error')
      })
      .catch(err => console.log(err))
  }

  modifyAmbassador = (e) => {
    e.preventDefault()

    const Ambassador = {
      name: this.state.ambassadorName,
      num: this.state.ambassadorNumber,
      email: this.state.ambassadorEmail,
      uni: this.state.ambassadorUni,
      id: this.state.editAmbassadorID,
    }

    fetch(`http://localhost:5000/api/ambassador/modify?a_id=${Ambassador.id}&a_name=${Ambassador.name}&a_contact=${Ambassador.num}&a_email=${Ambassador.email}&uni_id=${Ambassador.uni}`,
      {
        method: 'PUT'
      }
    ).then(res => {
      res.status === 200 ? this.notification('Modified Successfully', 'success') : this.notification('Something Went Wrong', 'error')
    })
      .catch(err => console.log(err))
  }

  deleteAmbassador = async () => {

    const a_id = this.state.deleteAmbassadorID

    if (window.confirm('Are you sure you wish to delete this item?')) {
      fetch(`http://localhost:5000/api/ambassador/delete?a_id=${a_id}`, {
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
    this.getAmbassador()
      .then(res => {
        this.setState({
          ambassador: res[0],
          university: res[1]
        })
      })
  }

  render() {
    const AmbassadorColumns = [{
      Header: 'Ambassador ID',
      accessor: 'a_id',
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
      Header: 'Ambassador Name',
      accessor: 'a_name',
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
      Header: 'Ambassador Phone',
      accessor: 'a_contact',
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
      Header: 'Ambassador Email',
      accessor: 'a_email',
      sortable: true,
      filterable: false,
      maxWidth: 250,
    },
    {
      Header: 'Ambassador University',
      accessor: 'uni_name',
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
                  deleteAmbassadorID: props.original.a_id
                })
                await this.deleteAmbassador()
              }}
            />
            <i
              className="fa fa-pencil text-warning padding-left-lg iconStyles"
              onClick={() => {
                this.setState({
                  editAmbassadorID: props.original.a_id,
                  editAmbassadorDisplay: true,
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
                  createAmbassadorDisplay: true,
                })
              }}
            >
              <i className="fa fa-plus "></i>
              Create
            </button>
          </Row>

          {this.state.createAmbassadorDisplay && this.createAmbassadorForm()}
          {this.state.editAmbassadorDisplay && this.editAmbassadorForm()}

          <Row>
            <Col md={12}>
              <ReactTable
                data={this.state.ambassador}
                columns={AmbassadorColumns}
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

export default Ambassador;
