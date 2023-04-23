import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import more from "./public/more.png";
function DropdownOption(props) {
  // maintains whether if mouse is over dropdown menu div
  const [hover, setHover] = useState(false);
  // redux-store dispatch
  let dispatch = useDispatch();
  // custom toggle control for dropdown menu
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <img
        src={more}
        style={{ width: "20px" }}
        alt="more-options ellipsis"
      ></img>
      {children}
    </a>
  ));
  // deletes the item (project/issue)
  let deleteItemOnClickingDeleteDropdownOption = (id) => {
    dispatch(props.delete(props.id));
  };
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        backgroundColor: hover ? "#bebebe" : "",
        visibility: props.isDropdownVisible ? "visible" : "hidden",
      }}
      className="d-inline-block px-2 py-1 rounded"
    >
      <Dropdown align="center">
        <Dropdown.Toggle
          as={CustomToggle}
          id="dropdown-custom-components"
        ></Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.ItemText>Options</Dropdown.ItemText>
          <Dropdown.Item
            as="button"
            onClick={deleteItemOnClickingDeleteDropdownOption}
          >
            {" "}
            Delete
          </Dropdown.Item>
          <Dropdown.Item>More options</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default DropdownOption;
