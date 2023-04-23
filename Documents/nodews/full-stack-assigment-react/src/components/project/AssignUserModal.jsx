import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { updateIssueInDatabase } from "../../actions/actionCreators/question";

class AssignUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      newIssueAssignee: "",
      isMouseOver: false,
    };
  }
  // fn handles closing of modal on screen
  handleClose = () => {
    console.log("handle close ", this.state);
    this.setState({
      show: false,
    });
  };
  // fn  displays modal on screen
  handleShow = () => {
    this.setState({ show: true });
  };

  //  changes the assigne for the issue
  updateNewIssueAssigneeOnChange = (event) => {
    this.setState({ newIssueAssignee: event.target.value });
  };

  onSubmitUpdateIssueOnServer = () => {
    this.props.dispatch(
      updateIssueInDatabase(this.state.newIssueAssignee, this.props.issueID)
    );
  };
  //  below two fns are used to implement hover effect to show visual change
  onMouseEnterSetIsMouseOverToTrue = () => {
    this.setState({ isMouseOver: true });
  };
  onMouseExitSetIsMouseOverToFalse = () => {
    this.setState({ isMouseOver: false });
  };
  render() {
    let { projectMembers } = this.props.currentProject;
    let { assignee } = this.props;
    return (
      <React.Fragment>
        <div
          variant="outline-primary"
          size="sm"
          className="text-capitalize"
          onClick={this.handleShow}
          onMouseEnter={this.onMouseEnterSetIsMouseOverToTrue}
          onMouseOut={this.onMouseExitSetIsMouseOverToFalse}
        >
          <div
            className={
              this.state.isMouseOver
                ? "bg-dark bg-gradient text-light rounded-pill "
                : "rounded-pill"
            }
          >
            {" "}
            {this.props.assignee
              ? this.props.assignee.userName
              : "Assign User"}{" "}
            <div
              className={
                this.state.isMouseOver ? "d-inline-block  " : " d-inline-block"
              }
              style={{
                visibility: `${this.state.isMouseOver ? "visible" : "hidden"}`,
              }}
            >
              ^
            </div>
          </div>
        </div>

        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Assign a User
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="mx-5">
            {/* validation error from local component state*/}
            {/* {this.state.formError ? (
              <p className="alert alert-danger py-2 text-center">
                {this.state.formError}
              </p>
            ) : null} */}
            <p className="text-capitalize">
              Currently assigned to : {assignee ? assignee.userName : " None"}
            </p>
            <Form.Select onChange={this.updateNewIssueAssigneeOnChange}>
              {projectMembers.map((user, index) => {
                return (
                  <option key={index} value={user._id}>
                    {" "}
                    {user.userName}{" "}
                  </option>
                );
              })}
            </Form.Select>
            <div className="text-center my-2">
              <Button onClick={this.onSubmitUpdateIssueOnServer}>Assign</Button>
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return { currentProject: state.projects.currentProject };
};

export default connect(mapStateToProps)(AssignUserModal);
