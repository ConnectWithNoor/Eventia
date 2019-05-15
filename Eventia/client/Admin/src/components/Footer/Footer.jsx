import React, { Component } from "react";
import { Grid } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Grid fluid>
          <p className="copyright pull-right">
            &copy; {new Date().getFullYear()}{" "}
            <a href="https://fb.com/connectwithnoor">
              Noor Muhammad
            </a>
            , Semester Project Database Systems
          </p>
        </Grid>
      </footer>
    );
  }
}

export default Footer;
