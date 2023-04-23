import React, { Component, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import Tag from "./Tag";
import { useParams } from "react-router-dom";
import {
  getCurrentProblemFromDatabase,
  updateCurrentProblemInStore,
} from "../../actions/actionCreators/question";
import {
  Container,
  Row,
  Col,
  // Table,
  // thead,
  // tr,
  // th,
  // tbody,
  Dropdown,
  Button,
  Form,
  Alert,
  FormControl,
  Badge,
} from "react-bootstrap";
import Table from "react-bootstrap/Table";

import AddNewIssue from "./AddNewIssue";
import AddUserToProblem from "./AddUserToProblem";
import RadioSelector from "./RadioSelector";
import AssignUserModal from "./AssignUserModal";
import { Tooltip } from "react-bootstrap";
import TooltipForMembers from "./TooltipForMembers";
import StatusChangeComponent from "./StatusChangeComponent";
import IssueTypeSelector from "./public/IssueTypeSelector";
import PaginationComponent from "./PaginationComponent";

function Problem(props) {
  // get id of project from url params
  let { id } = useParams();
  //  get current project from redux store
  let currentProblem = useSelector((state) => {
    return state.projects.currentProblem;
  });
  //  acessing redux-store data and dispatch
  let dispatch = useDispatch();
  let auth = useSelector((state) => {
    return state.userAuth;
  });
  // get logged in user and id
  let currentUser = auth.user;
  let currentUserId = currentUser ? currentUser._id : null;

  // if current project is empty ,  fetch current project from the server
  if (Object.keys(currentProblem).length === 0 || currentProblem._id !== id) {
    // dispatching an action to get project and update it in the store
    dispatch(getCurrentProblemFromDatabase(id));
  }
  // projectAuthorId and project  author id
  const projectAuthorId = currentProblem.projectAuthor
    ? currentProblem.projectAuthor._id
    : null;
  // gets all issues from redux store for the project which is currently open
  let issues = currentProblem.issues;
  let areIssuesPresent;
  // set up state for issueStatus . this is used to filter out issues to display
  const [status, setStatus] = useState("all");
  const [issueType, setIssueType] = useState("all");
  // changes issueStatus to display desirable issues on screen
  let onClickSwitchStatus = (event) => {
    setStatus(event.target.value);
  };
  let onClickSwitchIssueType = (event) => {
    setIssueType(event.target.value);
  };

  // pagination logic  starts
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let totalPages = issues && Math.ceil(issues.length / itemsPerPage);
  // stores the issues to be displayed on current page
  let issuesOnCurrentPage =
    issues && issues.slice(indexOfFirstItem, indexOfLastItem);
  // pagination logic ends

  // issue filtering logic
  if (issuesOnCurrentPage) {
    areIssuesPresent = issues.length > 0 ? true : false;
    switch (status) {
      case "open":
        issuesOnCurrentPage = issuesOnCurrentPage.filter(
          (issue) => issue.issueStatus === "Open"
        );
        break;
      case "closed":
        issuesOnCurrentPage = issuesOnCurrentPage.filter(
          (issue) => issue.issueStatus === "Closed"
        );
        break;
    }
    switch (issueType) {
      case "Security":
        issuesOnCurrentPage = issuesOnCurrentPage.filter(
          (issue) => issue.label === "Security"
        );
        break;
      case "Bug":
        issuesOnCurrentPage = issuesOnCurrentPage.filter(
          (issue) => issue.label === "Bug"
        );
        break;
      case "Task":
        issuesOnCurrentPage = issuesOnCurrentPage.filter(
          (issue) => issue.label === "Task"
        );
        break;
    }
  }
  // redirects to sign in page if user is not logged in
  if (auth && !auth.isLoggedin) {
    return <Navigate to="/user/sign-in" />;
  }
  return (
    <Container style={{ marginTop: "16%" }}>
      <Row className="mb-2">
        <h1 className="display-3"> {currentProblem.projectName}</h1>
      </Row>
      <Row className="mb-2 ms-2">
        <hr></hr>
        Description :<br />
        {currentProblem.projectDescription}
      </Row>
      <Row className="mb-2 mt-3 ms-1">
        <Col>
          <Badge bg="dark" className="py-2 fs-6 text-capitalize">
            Problem Author :{" "}
            {currentProblem.projectAuthor &&
              currentProblem.projectAuthor.userName}
          </Badge>
        </Col>
        <Col className="text-end">
          <h5 className="text-muted d-inline-block">members :</h5>
          {currentProblem.projectMembers &&
            currentProblem.projectMembers.slice(0, 5).map((user, index) => {
              return (
                <div
                  key={index}
                  style={{ display: "inline-block" }}
                  className="mx-1"
                >
                  <TooltipForMembers
                    tooltipMessage={user.userName}
                    key={index}
                  />
                </div>
              );
            })}
          <h5 className="text-muted d-inline-block">+</h5>
        </Col>
      </Row>
      <Row>
        <h3 className="display-6">issues</h3>
      </Row>
      {!areIssuesPresent && (
        <Col xs={12}>
          <Alert variant="warning" className="text-center mt-5">
            There are no Issues to view ! <br />
            Create new issues .
          </Alert>
        </Col>
      )}
      <Row>
        <Col className="d-flex justify-content-end">
          {areIssuesPresent && (
            <div className="text-end me-auto my-4">
              Status :
              <RadioSelector
                status={status}
                onClickSwitchStatus={onClickSwitchStatus}
              />
            </div>
          )}
          {areIssuesPresent && (
            <div className="text-end me-auto my-4">
              Issue Type :
              <IssueTypeSelector
                issueType={issueType}
                onClickSwitchIssueType={onClickSwitchIssueType}
              />
            </div>
          )}
          {projectAuthorId == currentUserId && (
            <AddUserToProblem projectID={id} />
          )}
          <AddNewIssue projectID={id} />
        </Col>
      </Row>
      {areIssuesPresent && (
        <Row
          id="yoyo"
          className="border border-dark mb-3"
          style={{ minHeight: "480px" }}
        >
          <Col style={{ overflowX: "auto" }}>
            <Table hover size="sm">
              <thead>
                <tr>
                  <th className="text-center">#</th>
                  <th className="text-center">Issue Type</th>
                  <th className="text-center">Issue</th>
                  <th className="text-center">Assignee</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Priority</th>
                  <th className="text-center">Created</th>
                  <th className="text-center">Due Date</th>
                  <th className="text-center">Author</th>
                  <th className="text-center"></th>
                </tr>
              </thead>
              <tbody>
                {issues &&
                  issuesOnCurrentPage.map((issue, index) => {
                    return (
                      <tr key={issue._id}>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center ">
                          <Badge
                            pill
                            bg={
                              issue.label === "Security"
                                ? "danger"
                                : issue.label === "Bug"
                                ? "warning"
                                : "success"
                            }
                          >
                            {issue.label}
                          </Badge>
                        </td>
                        <td className="text-center">{issue.issueName}</td>
                        <td className="text-center">
                          {/* {issue.issueAssignee.userName} */}
                          <AssignUserModal
                            assignee={issue.issueAssignee}
                            issueID={issue._id}
                          />
                        </td>
                        <td className="text-center  ">
                          <StatusChangeComponent issue={issue} />
                        </td>
                        <td className="text-center">{issue.issuePriority}</td>
                        <td className="text-center">
                          {new Date(issue.createdAt).toDateString()}
                        </td>
                        <td className="text-center">
                          {new Date(issue.issueDueDate).toDateString()}
                        </td>
                        <td className="text-center text-capitalize">
                          {issue.issueAuthor && issue.issueAuthor.userName}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
      {areIssuesPresent && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          className="mb-5"
        ></PaginationComponent>
      )}
    </Container>
  );
}
export default Problem;
