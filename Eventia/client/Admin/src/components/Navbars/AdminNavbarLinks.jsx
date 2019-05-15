import React, { Component } from "react";
import { NavItem, Nav } from "react-bootstrap";

class AdminNavbarLinks extends Component {
  render() {
    return (
      <div>
        <Nav pullRight>
          <NavItem eventKey={1} onSelect={() => console.log('Account Info')} href="#">
            Account
          </NavItem>
          <NavItem eventKey={3} onSelect={() => console.log('Logged Out')} href="#">
            Log out
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default AdminNavbarLinks;