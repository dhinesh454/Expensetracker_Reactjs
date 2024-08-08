import React, { useRef, useState } from "react";
import Navigation from '../../Navigation'
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { CircularProgress } from "@mui/material";

const ForgotPassword = () => {
    const [loading,setLoading] = useState(false);

    const emailRef = useRef();
    const history = useHistory();

    const passwordHandler = async () =>{
        const email = emailRef.current.value;
        setLoading(true);
        try {
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCadqOoJjHC-xCAKq19vBPdxjuzR1XcGFk',{
                method:'POST',
                body:JSON.stringify({
                    requestType:'PASSWORD_RESET' ,
                    email 
                      
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
            console.log(data);
         
            alert('check your mail reset the password')
            history.replace('/')
        } catch (error) {
            alert(`Try again!..check your mailid ${error}`);
            setLoading(false);
            console.log(error)
        }



    }

       return(
        <>
            <Navigation/>
            <Container fluid style={{height:'100vh'}}  className="d-flex flex-column justify-content-center bg-info align-items-center">
            <Card style={{width:'25rem',height:'14rem'}} className="m-2 p-2">
                <Card.Text className="text-center fst-italic fw-bold text-danger">Forgot Password</Card.Text>
                
              
                  <Row className="mb-3">
                    <Form.Group>
                        <Form.Label className="fw-bold fst-italic">EmailId</Form.Label>
                        <Form.Control type='text' placeholder="Enter the email" ref={emailRef}/>                    
                    </Form.Group>
                  </Row>
                  
                
                <Button  onClick={passwordHandler}>{loading?'Loading...' : 'Send'}</Button>

               {/* {loading &&<p className="text-center fw-bold text-danger m-1 p-1 fst-italic">Sending mail...</p>}
                 */}
                {loading && <div  className="d-flex justify-content-center align-item-center m-2">
                    <CircularProgress/>
                </div>}

             </Card>
            
            </Container>
            
        </>
       )
};

export default ForgotPassword;