import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import ReactTable from 'react-table';
import NotificationSystem from 'react-notification-system';

class Module extends Component {

  constructor(props) {
    super(props)
    this.notificationSystem = React.createRef();

    this.state = {
      modules: [],
      createModuleDisplay: false,
      editModuleDisplay: false,
      editModuleID: '',
      deleteModuleID: '',
      moduleName: '',
      modulePrice: '',
      moduleDate: '',
    }
  }

  createModuleForm = () => {
    return (
      <form className="grid" onSubmit={this.addModule}>
        <div className="border container-fluid ">
          <i className="fa fa-window-close-o px"
            onClick={() => this.setState({ createModuleDisplay: false })}
          />
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="m_name">Module Name</label>
              <input
                autoComplete="off"
                required
                type="text"
                className="form-control"
                onChange={this.handleInput}
                name="moduleName"
                placeholder="Module Name"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="m_price">Module Price</label>
              <input
                required
                autoComplete="off"
                type="number"
                className="form-control"
                onChange={this.handleInput}
                name="modulePrice"
                placeholder="Module Price"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="m_name">Module Date</label>
              <input
                required
                autoComplete="off"
                type="text"
                className="form-control"
                onChange={this.handleInput}
                name="moduleDate"
                placeholder="YYYY-MM-DD"
              />
            </div>
            <div className="form-group col-md-6">
              <button
                type="submit"
                className="btn btn-default btn-fill mt"
              >
                Create Module
              </button>
            </div>
          </div>
        </div>
      </form>
    )
  }

  editModuleForm = () => {
    const index = this.state.modules.findIndex(mod => {
      return mod.m_id === this.state.editModuleID
    })

    return (
      <form className="grid" onSubmit={this.modifyModule}>
        <div className="border container-fluid ">
          <i className="fa fa-window-close-o px"
            onClick={() => this.setState({ editModuleDisplay: false })}
          />
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="m_name">Module Name</label>
              <input
                required
                autoComplete="off"
                type="text"
                defaultValue={this.state.modules[index].m_name}
                onChange={this.handleInput}
                name="moduleName"
                className="form-control"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="m_price">Module Price</label>
              <input
                required
                autoComplete="off"
                type="number"
                defaultValue={this.state.modules[index].m_price}
                onChange={this.handleInput}
                name="modulePrice"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="m_name">Module Date</label>
              <input
                required
                autoComplete="off"
                type="text"
                defaultValue={this.state.modules[index].m_date}
                onChange={this.handleInput}
                name="moduleDate"
                className="form-control"
              />
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

  getModule = async () => {
    const res = await fetch('http://localhost:5000/api/modules')

    if (res.status !== 200) {
      this.notification('Fetching Error', 'error');
    }

    const data = await res.json()

    return data
  }

  addModule = (e) => {
    e.preventDefault()

    const Module = {
      name: this.state.moduleName,
      price: this.state.modulePrice,
      date: this.state.moduleDate
    }

    fetch(`http://localhost:5000/api/modules/add?m_name=${Module.name}&m_price=${Module.price}&m_date=${Module.date}`, {
      method: 'POST',
    }
    )
      .then(res => {
        res.status === 200 ? this.notification('Modified Successfully', 'success') : this.notification('Something Went Wrong', 'error')
      })
      .catch(err => console.log(err))
  }

  modifyModule = (e) => {
    e.preventDefault()

    const Module = {
      id: this.state.editModuleID,
      name: this.state.moduleName,
      price: this.state.modulePrice,
      date: this.state.moduleDate
    }

    fetch(`http://localhost:5000/api/modules/modify?m_id=${Module.id}&m_name=${Module.name}&m_price=${Module.price}&m_date=${Module.date}`, {
      method: 'PUT'
    }).then(res => {
      res.status === 200 ? this.notification('Modified Successfully', 'success') : this.notification('Something Went Wrong', 'error')
    })
      .catch(err => console.log(err))
  }

  deleteModule = async () => {

    const m_id = this.state.deleteModuleID

    if (window.confirm('Are you sure you wish to delete this item?')) {
      fetch(`http://localhost:5000/api/modules/delete?m_id=${m_id}`, {
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
    this.getModule()
      .then(res => {
        this.setState({
          modules: res
        })
      })
  }

  render() {
    const moduleColumns = [{
      Header: 'Module ID',
      accessor: 'm_id',
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
      Header: 'Module Name',
      accessor: 'm_name',
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
      Header: 'Module Price',
      accessor: 'm_price',
      sortable: true,
      filterable: true,
      maxWidth: 150,
      style: {
        textAlign: "center",
      },
      Filter: ({ filter, onChange }) => (
        <input
          type='text'
          placeholder="Filter by Price"
          value={filter ? filter.value : ''}
          onChange={event => onChange(event.target.value)}
        />
      )
    },
    {
      Header: 'Modules Date',
      accessor: 'm_date',
      sortable: true,
      filterable: false,
      maxWidth: 150,
      style: {
        textAlign: "center",
      },
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
                  deleteModuleID: props.original.m_id
                })
                await this.deleteModule()
              }}
            />
            <i
              className="fa fa-pencil text-warning padding-left-lg iconStyles"
              onClick={() => {
                this.setState({
                  editModuleID: props.original.m_id,
                  editModuleDisplay: true,
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
                  createModuleDisplay: true,
                })
              }}
            >
              <i className="fa fa-plus "></i>
              Create
            </button>
          </Row>

          {this.state.createModuleDisplay && this.createModuleForm()}
          {this.state.editModuleDisplay && this.editModuleForm()}

          <Row>
            <Col md={12}>
              <ReactTable
                data={this.state.modules}
                columns={moduleColumns}
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

export default Module;
