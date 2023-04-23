import React, { Component } from "react";
import { connect } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
class PrivateRoute extends Component {
  render() {
    console.log("privateRoute  is ", this.props);
    let { isLoggedin } = this.props.auth;
    // return isLoggedin ? <Outlet /> : <Navigate to="/" />;
    console.log("PrivateRoute isLoggedIn is");
    return isLoggedin ? <Outlet /> : <Navigate to="/" />;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.userAuth,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
