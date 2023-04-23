import React from "react";
import { Badge } from "react-bootstrap";

function RadioSelector(props) {
  let { onClickSwitchStatus } = props;

  return (
    <React.Fragment>
      <label>
        <Badge
          bg="light"
          text="dark"
          className={
            props.status === "all" ? "bg-dark text-white mx-2" : "mx-2"
          }
        >
          all
        </Badge>
        <input
          type="radio"
          value="all"
          name="status"
          className="d-none"
          onChange={onClickSwitchStatus}
        />
      </label>
      <label>
        <Badge
          bg="light"
          text="dark"
          className={
            props.status === "open" ? "bg-dark text-white mx-2" : "mx-2"
          }
        >
          open
        </Badge>
        <input
          type="radio"
          value="open"
          name="status"
          className="d-none"
          onChange={onClickSwitchStatus}
        />
      </label>
      <label>
        <Badge
          bg="light"
          text="dark"
          className={
            props.status === "closed" ? "bg-dark text-white mx-2" : "mx-2"
          }
        >
          closed
        </Badge>
        <input
          type="radio"
          value="closed"
          name="status"
          onChange={onClickSwitchStatus}
          className="d-none"
        />
      </label>
    </React.Fragment>
  );
}

export default RadioSelector;
