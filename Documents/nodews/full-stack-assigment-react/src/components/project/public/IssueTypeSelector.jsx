import React from "react";
import { Badge } from "react-bootstrap";

function IssueTypeSelector(props) {
  let { onClickSwitchIssueType } = props;
  return (
    <React.Fragment>
      <label>
        <Badge
          bg="light"
          text="dark"
          className={
            props.issueType === "all" ? "bg-dark text-white mx-2" : "mx-2"
          }
        >
          all
        </Badge>
        <input
          type="radio"
          value="all"
          className="d-none"
          name="issueType"
          onChange={onClickSwitchIssueType}
        />
      </label>
      <label>
        <Badge
          text="dark"
          className={
            props.issueType === "Security" ? " text-white mx-2" : "mx-2"
          }
          bg={props.issueType === "Security" ? "danger " : ""}
        >
          Security
        </Badge>
        <input
          type="radio"
          value="Security"
          name="issueType"
          className="d-none"
          onChange={onClickSwitchIssueType}
        />
      </label>
      <label>
        <Badge
          bg="light"
          text="dark"
          className={props.issueType === "Bug" ? " text-white mx-2" : "mx-2"}
          bg={props.issueType === "Bug" ? "warning" : ""}
        >
          Bug
        </Badge>
        <input
          type="radio"
          value="Bug"
          name="issueType"
          onChange={onClickSwitchIssueType}
          className="d-none"
        />
      </label>
      <label>
        <Badge
          bg="light"
          text="dark"
          className={props.issueType === "Task" ? "k text-white mx-2" : "mx-2"}
          bg={props.issueType === "Task" ? "success " : ""}
        >
          Task
        </Badge>
        <input
          type="radio"
          value="Task"
          name="issueType"
          onChange={onClickSwitchIssueType}
          className="d-none"
        />
      </label>
    </React.Fragment>
  );
}

export default IssueTypeSelector;
