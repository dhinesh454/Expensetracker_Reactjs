import { useRef } from "react";
import { Button,Card, Row,Form ,Col } from "react-bootstrap";
import classes from './Emailverify.module.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Emailverify = () => {
    const history = useHistory();
    const otpRef = useRef();

    const emailsubmitHandler = async () => {
        const otp = otpRef.current.value;

        const payload ={
            oobCode:otp
        }

        try {
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCadqOoJjHC-xCAKq19vBPdxjuzR1XcGFk',{
                method:'POST',
                body:JSON.stringify(payload),
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            
          if(!res.ok){
            console.log(res)
            throw new Error(`Error:${res.statusText}`)
        }
        const data = await res.json();
        console.log('Verified successfully:', data);
        history.goBack();
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
    }
    return(
        <div className={classes.background}>
            <Card style={{width:'20rem',border: '1px solid blue'}} className="border 1 dark">
                <Card.Title className="fst-italic fw-lighter fs-5 text-center ">EmailVerification</Card.Title>
                <Card.Text>
                    <Form className="align-items-center m-3 p-2 ">
                        <Row>
                
                                <Form.Label className="">OTP</Form.Label>
                        
                        <Col>        
                                <Form.Control className="text-danger fst-italic fw-bold" type='text' placeholder='Enter the OTP' ref={otpRef}/>
                        </Col>

                          
                        </Row>
                        <div className="d-flex justify-content-center m-3 p-1">
                        <Button onClick={emailsubmitHandler}>Verify</Button> 
                        </div>
                    </Form>   
                </Card.Text>
            </Card>
        </div>
    )

};


export default Emailverify;