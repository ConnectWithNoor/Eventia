import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import ReactTable from 'react-table';
import NotificationSystem from 'react-notification-system';

class University extends Component {

  constructor(props) {
    super(props)
    this.notificationSystem = React.createRef();

    this.state = {
      univeristy: [],
      addUniDisplay: false,
      editUniDisplay: false,
      editUniID: '',
      deleteUniID: '',
      uniName: '',
    }
  }

  addUniversityForm = () => {
    return (
      <form className="grid" onSubmit={this.addUniversity}>
        <div className="border container-fluid ">
          <i className="fa fa-window-close-o px"
            onClick={() => this.setState({ addUniDisplay: false })}
          />
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="m_name">University Name</label>
              <input
                required
                autoComplete="off"
                type="text"
                className="form-control"
                onChange={this.handleInput}
                name="uniName"
                placeholder="University Name"
              />
            </div>
            <div className="form-group col-md-6">
              <button
                type="submit"
                className="btn btn-default btn-fill mt"
              >
                Add Now
              </button>
            </div>
          </div>
        </div>
      </form>
    )
  }

  editUniForm = () => {
    const index = this.state.univeristy.findIndex(uni => {
      return uni.ID === this.state.editUniID
    })
    console.log(index)

    return (
      <form className="grid" onSubmit={this.modifyUniversity}>
        <div className="border container-fluid ">
          <i className="fa fa-window-close-o px"
            onClick={() => this.setState({ editUniDisplay: false })}
          />
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="uni_name">University</label>
              <input
                required
                autoComplete="off"
                type="text"
                defaultValue={this.state.univeristy[index].University}
                onChange={this.handleInput}
                name="uniName"
                className="form-control"
              />
            </div>
            <div className="form-group col-md-6">
              <button
                type="submit"
                className="btn btn-default btn-fill mt"
              >
                Edit University
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

  getUniversity = async () => {
    const res = await fetch('http://localhost:5000/api/university')

    if (res.status !== 200) {
      this.notification('Fetching Error', 'error');
    }

    const data = await res.json()
    return data
  }

  addUniversity = (e) => {
    e.preventDefault()

    const uni = {
      name: this.state.uniName,
    }

    fetch(`http://localhost:5000/api/University/add?uni_name=${uni.name}`, {
      method: 'POST',
    }
    )
      .then(res => {
        res.status === 200 ? this.notification('University Added', 'success') : this.notification('Something Went Wrong', 'error')
      })
      .catch(err => console.log(err))
  }

  modifyUniversity = (e) => {
    e.preventDefault()

    const uni = {
      id: this.state.editUniID,
      name: this.state.uniName,
    }
    
    fetch(`http://localhost:5000/api/University/edit?uni_id=${uni.id}&uni_name=${uni.name}`, {
      method: 'PUT'
    }).then(res => {
      res.status === 200 ? this.notification('Modified Successfully', 'success') : this.notification('Something Went Wrong', 'error')
    })
      .catch(err => console.log(err))
  }

  deleteuni = () => {

    const uni_id = this.state.deleteUniID

    if (window.confirm('Are you sure you wish to delete this item?')) {
      fetch(`http://localhost:5000/api/University/delete?uni_id=${uni_id}`, {
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
    this.getUniversity()
      .then(res => {
        this.setState({
          univeristy: res
        })
      })
  }

  render() {
    const uniColumns = [{
      Header: 'ID',
      accessor: 'ID',
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
      Header: 'University',
      accessor: 'University',
      sortable: true,
      filterable: true,
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
      Header: 'Teams',
      accessor: 'Teams',
      sortable: true,
      filterable: true,
      maxWidth: 150,
      style: {
        textAlign: "center",
      },
      Filter: ({ filter, onChange }) => (
        <input
          type='text'
          placeholder="Filter by Teams"
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
                  deleteUniID: props.original.ID
                })
                await this.deleteuni()
              }}
            />
            <i
              className="fa fa-pencil text-warning padding-left-lg iconStyles"
              onClick={() => {
                this.setState({
                  editUniID: props.original.ID,
                  editUniDisplay: true,
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
                  addUniDisplay: true,
                })
              }}
            >
              <i className="fa fa-plus "></i>
              Add University
            </button>
          </Row>

          {this.state.addUniDisplay && this.addUniversityForm()}
          {this.state.editUniDisplay && this.editUniForm()}

          <Row>
            <Col md={12}>
              <ReactTable
                data={this.state.univeristy}
                columns={uniColumns}
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

export default University;
