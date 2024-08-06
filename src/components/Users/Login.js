import React, { useRef } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import classes from './Signup.module.css';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";



const Login = () => {
    const emailidRef = useRef();
    const passwordRef = useRef();
    const history = useHistory();


    async function onSigninHandler(event){
        event.preventDefault();

        const email = emailidRef.current.value;
        const password = passwordRef.current.value;

        try {
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCadqOoJjHC-xCAKq19vBPdxjuzR1XcGFk',{
                method:'POST',
                body:JSON.stringify({
                    email,
                    password
                   
            }),
            headers:{
                'Content-Type':'application/json'
            }
            });
            if(!res.ok){
                console.log(res)
                throw new Error('Error!..Please Check Again')
            }

            const data = await res.json();
            console.log(data)
            localStorage.setItem('token',data.idToken);
            localStorage.setItem('localId',data.localId)
            history.replace('/expense')
        } catch (error) {
            alert(`Authentication failed ${error}`)
            console.log(error)
        }


    }
    return(
        <div className={classes.background}>
        <Card className={classes.card}>
            <Form style={{width:'20rem'}} className={classes.form} onSubmit={onSigninHandler}>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label className="fw-bold fst-italic ">Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email" ref={emailidRef}/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label className="fw-bold fst-italic ">Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter your password" ref={passwordRef}/>
                    </Form.Group>
                </Row>
                

                 <div className={`${classes.button} d-flex text-center justify-content-center`}>
                    <Button type="submit">Login</Button>
                 </div>  


            </Form>
            <div className={classes.toogle}>
            <Link to="/">New User?.Create an Account</Link>
            </div>
        </Card>


       
        </div>
    )
};

export default Login;