import React, { Component } from "react";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import {
  addCurrentProblemInDatabase,
  updateReqInfoReturnedFromServer,
} from "../../actions/actionCreators/question";

class AddNewIssue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      formError: "",
      issueName: "",
      issueDescription: "",
      label: "Bug",
      issuePriority: "Normal",
      issueDueDate: "",
      issueAssignee: "",
    };
  }
  // fn handles closing of modal on screen
  handleClose = () => {
    // console.log("handle close ", this.state);
    this.setState({ show: false, formError: false });
    this.props.dispatch(updateReqInfoReturnedFromServer("", ""));
  };
  // fn  displays modal on screen
  handleShow = () => {
    this.setState({ show: true });
  };
  // this fn updates field value from html dom to local component state
  updateFieldOnUserinput = (event) => {
    let fieldName = event.target.getAttribute("name");
    //  used es6 computed file name
    this.setState({ [fieldName]: event.target.value }, () =>
      console.log(this.state)
    );
  };
  // submits form to server
  OnClickSubmitIssueDetailsToServer = () => {
    // the fn prevents empty data from being submitted to the server
    let validateFormField = (formField) => {
      return formField.length > 0;
    };
    let {
      issueName,
      issueDescription,
      label,
      issuePriority,
      issueDueDate,
      issueAssignee,
    } = this.state;

    let areIssueDetailsValid =
      validateFormField(issueName) &&
      validateFormField(issuePriority) &&
      validateFormField(issueDueDate)
        ? (() => {
            this.props.dispatch(
              addCurrentProblemInDatabase(
                {
                  issueName,
                  issueDescription,
                  label,
                  issuePriority,
                  issueDueDate,
                  issueAssignee,
                },
                this.props.projectID
              )
            );
            this.setState({ formError: "" });
          })()
        : this.setState({ formError: "Please enter valid details" });
  };
  render() {
    // result of request send to the server ; to be displayed to user as updates
    let {
      reqStatusReturnedFromServer = "",
      reqMessageReturnedFromServer = "",
    } = this.props.projects || {};
    return (
      <React.Fragment>
        <div className="text-end me-2 my-4">
          <Button variant="outline-primary" size="sm" onClick={this.handleShow}>
            Add New Issue
          </Button>
        </div>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add a new Issue
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="mx-5">
            {/* validation error from local component state*/}
            {this.state.formError ? (
              <p className="alert alert-danger py-2 text-center">
                {this.state.formError}
              </p>
            ) : null}
            {/* status information from server displayed as updates for the req made informing status and message */}
            {reqStatusReturnedFromServer === true ? (
              <Alert variant="success" className="text-center mt-5">
                Problem Successfully Added To Database{" "}
              </Alert>
            ) : reqStatusReturnedFromServer === false ? (
              <Alert variant="warning" className="text-center mt-5">
                There was an error while adding Problem. Try again
              </Alert>
            ) : (
              ""
            )}

            <h4>Problem Details</h4>
            <Form.Group className="mb-3" controlId="issueName">
              <Form.Label>Issue Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Problem Name"
                name="issueName"
                onChange={this.updateFieldOnUserinput}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="issueDescription">
              <Form.Label>issue Description</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: "80px" }}
                placeholder="Enter Problem Description"
                name="issueDescription"
                onChange={this.updateFieldOnUserinput}
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="label">
                  <Form.Label>Issue Type</Form.Label>
                  <Form.Select
                    placeholder="Enter Issue Type"
                    name="label"
                    onChange={this.updateFieldOnUserinput}
                  >
                    <option value="Bug">Bug</option>
                    <option value="Task">Task</option>
                    <option value="Bug">Bug</option>
                    <option value="Security">Security</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="label">
                  <Form.Label>Status :</Form.Label>
                  <Form.Select name="status" disabled>
                    <option value="Open">Open</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="issuePriority">
                  <Form.Label>Priority :</Form.Label>
                  <Form.Select
                    name="issuePriority"
                    onChange={this.updateFieldOnUserinput}
                    defaultValue="Normal"
                  >
                    <option value="Low">Low</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="issueDueDate">
                  <Form.Label>Due Date :</Form.Label>
                  <Form.Control
                    type="Date"
                    name="issueDueDate"
                    onChange={this.updateFieldOnUserinput}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <div className="text-center">
              <Button
                variant="primary"
                type="submit"
                onClick={this.OnClickSubmitIssueDetailsToServer}
                // disabled={isAuthenticationInProgess}
              >
                Add Issue
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return { auth: state.userAuth, projects: state.projects };
};
export default connect(mapStateToProps)(AddNewIssue);
