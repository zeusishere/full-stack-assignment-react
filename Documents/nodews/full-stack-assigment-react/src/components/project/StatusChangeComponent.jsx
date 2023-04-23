import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateStatusOfIssueOnserver } from "../../actions/actionCreators/question";
function StatusChangeComponent(props) {
  let issue = props.issue;
  let dispatch = useDispatch();
  const [isMouseOnStatus, setMouseStatus] = useState(false);
  let onMouseEnterSetIsMouseOverToTrue = () => {
    setMouseStatus(true);
  };
  let onMouseExitSetIsMouseOverToFalse = () => {
    setMouseStatus(false);
  };
  let OnChangeSetIssueStatus = (event) => {
    dispatch(updateStatusOfIssueOnserver(event.target.value, issue._id));
  };
  return (
    <div
      className=""
      onMouseEnter={onMouseEnterSetIsMouseOverToTrue}
      onMouseOut={onMouseExitSetIsMouseOverToFalse}
    >
      <Form.Select
        size="sm"
        style={{ backgroundColor: isMouseOnStatus ? "" : "#E5E4E2" }}
        onChange={OnChangeSetIssueStatus}
      >
        <option value="Open" selected={issue.issueStatus == "Open"}>
          Open
        </option>
        <option value="Closed" selected={issue.issueStatus == "Closed"}>
          Closed
        </option>
      </Form.Select>
    </div>
  );
}

export default StatusChangeComponent;
