import React, { useRef, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import classes from './Signup.module.css';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";



const Signup = () => {
    const [pswdState,setpswdState]=useState(true)
    const history = useHistory();
    const emailidRef = useRef();
    const passwordRef = useRef();
    const confirmpasswordRef =useRef();

    async function signupHandler (event){
        event.preventDefault();
        const emailid = emailidRef.current.value;
        const password = passwordRef.current.value;
        const confirmpassword = confirmpasswordRef.current.value;

        if(password!==confirmpassword){
            setpswdState(false);
            setTimeout(()=>setpswdState(true),1000)
            return;
        }

        try {
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCadqOoJjHC-xCAKq19vBPdxjuzR1XcGFk',{
                method:'POST',
                body:JSON.stringify({
                    email:emailid,
                    password:password,
                    returnSecureToken:true
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
            alert('Successfuly created');
            history.replace('/login')
        } catch (error) {
            alert(`Authentication failed ${error}`)
            console.log(error)
        }


    }


    return(
        <div className={classes.background}>
        <Card className={classes.card}>
            <Form style={{width:'20rem'}} className={classes.form} onSubmit={signupHandler}>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label className="fw-bold fst-italic ">Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email" ref={emailidRef} required/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label className="fw-bold fst-italic ">Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter your password" ref={passwordRef} minLength={6} required/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label className="fw-bold fst-italic ">ConfirmPassword</Form.Label>
                        <Form.Control type="password" placeholder="Enter your password" ref={confirmpasswordRef} minLength={6} required/>
                    </Form.Group>
                </Row>

                {!pswdState && <p className="text-center text-danger fw-bold">Password not matched..Try again</p>}

                 <div className={`${classes.button} d-flex text-center justify-content-center`}>
                    <Button type="submit" >Login</Button>
                 </div>  


            </Form>
            <div className={classes.toogle}>
            <Link to="/login">Have an Account? Login?</Link>
            </div>
        </Card>


       
        </div>
    )
};

export default Signup;