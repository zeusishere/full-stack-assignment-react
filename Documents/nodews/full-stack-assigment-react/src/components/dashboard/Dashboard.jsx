import React, { Component } from "react";
import CardComp from "./CardComp";
class DashBoard extends Component {
  render() {
    return (
      <div className="">
        <div className="tasks-container d-flex justify-content-around">
          <CardComp />
          <CardComp />
          <CardComp />
        </div>
      </div>
    );
  }
}

export default DashBoard;
