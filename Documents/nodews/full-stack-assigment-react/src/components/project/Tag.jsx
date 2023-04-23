import React, { Component } from "react";
import { Badge } from "react-bootstrap";
class Tag extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       isTagAHeading: false,
  //     };
  //   }
  render() {
    return (
      <Badge className={this.props.isTagAHeading ? TagHeadingStyle : TagStyle}>
        abc
      </Badge>
    );
  }
}
const TagHeadingStyle = "badge bg-primary rounded-pill fs-6 px-2 ";
const TagStyle = " badge bg-info rounded-pill fs-6 px-2 ms-1 ";
export default Tag;
