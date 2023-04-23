import React, { Component } from "react";
import { ListGroup, Card } from "react-bootstrap";
class CardComp extends Component {
  render() {
    return (
      <Card style={{ width: "18rem" }} className="bg-primary">
        <Card.Title>Dummy Title</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>Cras justo odio</ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
      </Card>
    );
  }
}

export default CardComp;
