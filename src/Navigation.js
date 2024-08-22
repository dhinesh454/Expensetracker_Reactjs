import React from "react";
import { Container, Navbar ,Nav} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import {useSelector,useDispatch} from 'react-redux';
import { authActions } from "./store/auth";



const Navigation = () => {
    const history = useHistory(); 
    const dispatch = useDispatch();
    const isLogin = useSelector((state)=>state.auth.isLoggedin)
    const state = useSelector((state)=>state.expenses);
    console.log('state----------------------->',state)
    const logoutHandler = () => {
        localStorage.clear();
        dispatch(authActions.logoutHandler())
        history.push('/')
    }

    return(
        <>
            <Navbar bg='dark' expand='lg' variant='dark'>
                <Container>
                    <Navbar.Brand className="fst-italic fw-bolder">ExpenseTracker</Navbar.Brand>
                   {isLogin && <Nav>
                        <Nav.Link className="text-warning me-5 cursor-pointer">Home</Nav.Link>
                        <Nav.Link className="text-warning me-5 cursor-pointer">Products</Nav.Link>
                        <Nav.Link className="text-warning me-5 cursor-pointer">Contact</Nav.Link>
                        <Nav.Link onClick={logoutHandler} className="text-warning me-5 cursor-pointer"><span><TbLogout /></span>Logout</Nav.Link>

                    </Nav>}
                </Container>
            </Navbar>
        </>
    )
};


export default Navigation;

