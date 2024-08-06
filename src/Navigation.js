import React from "react";
import { Container, Navbar ,Nav} from "react-bootstrap";
// import { Link } from "react-router-dom";



const Navigation = () => {
    return(
        <>
            <Navbar bg='dark' expand='lg' variant='dark'>
                <Container>
                    <Navbar.Brand className="fst-italic fw-bolder">ExpenseTracker</Navbar.Brand>
                    <Nav>
                        <Nav.Link className="text-warning me-5 cursor-pointer">Home</Nav.Link>
                        <Nav.Link className="text-warning me-5 cursor-pointer">Products</Nav.Link>
                        <Nav.Link className="text-warning me-5 cursor-pointer">Contact</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
};


export default Navigation;

