import React from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

const Expenses = (props) => {
    return (
        <Card style={{ width: '70%' }} className="my-2 mx-auto p-3">
            <Row className="d-flex justify-content-center align-items-center">
                <Col xs={12} md={3} className="text-center text-md-start mb-2 mb-md-0">
                    <p className="text-success fw-bold">{props.option}</p>
                </Col>
                <Col xs={6} md={4} className="text-center text-md-start mb-2 mb-md-0">
                    <p className="fw-bold fst-italic text-truncate">{props.amount}</p>
                </Col>
                <Col xs={6} md={4} className="text-center text-md-start mb-2 mb-md-0">
                    <p className="fst-italic text-truncate">{props.description}</p>
                </Col>
                <Col xs={12} md={1} className="d-flex justify-content-center justify-content-md-end">
                    <Button
                        onClick={props.onEditUser}
                        className="m-1 p-1"
                        variant="outline-warning"
                    >
                        <GrEdit />
                    </Button>
                    <Button
                        onClick={props.onRemove}
                        className="m-1 p-1"
                        variant="outline-danger"
                    >
                        <MdDelete />
                    </Button>
                </Col>
            </Row>
        </Card>
    );
};

export default Expenses;
