import React, { Component } from "react";
import { Tooltip, OverlayTrigger, Button } from "react-bootstrap";
import man from "./public/man.png";

function TooltipForMembers(props) {
  const tooltipMessage = props.tooltipMessage;
  const renderTooltip = (props) => {
    return (
      <Tooltip id="button-tooltip" {...props}>
        {tooltipMessage}
      </Tooltip>
    );
  };
  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      {/* <img src={man} style={{ width: "30px" }}></img> */}
      <div
        style={{
          width: "25px",
          height: "25px",
          backgroundColor: "orange",
          borderRadius: "50%",
          textAlign: "center",
          color: "white",
        }}
      >
        {tooltipMessage && tooltipMessage.substring(0, 1)}
      </div>
    </OverlayTrigger>
  );
}

export default TooltipForMembers;
