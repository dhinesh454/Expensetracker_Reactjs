
import { Button,Card, Row,Form ,Col } from "react-bootstrap";
import classes from './Emailverify.module.css'

const Emailverify = () => {
    return(
        <div className={classes.background}>
            <Card style={{width:'20rem',border: '1px solid blue'}} className="border 1 dark">
                <Card.Title className="fst-italic fw-lighter fs-5 text-center ">EmailVerification</Card.Title>
                <Card.Text>
                    <Form className="align-items-center m-3 p-2 ">
                        <Row>
                
                                <Form.Label className="">OTP</Form.Label>
                        
                        <Col>        
                                <Form.Control className="text-danger fst-italic fw-bold" type='text' placeholder='Enter the OTP'/>
                        </Col>

                          
                        </Row>
                        <div className="d-flex justify-content-center m-3 p-1">
                        <Button >Verify</Button> 
                        </div>
                    </Form>   
                </Card.Text>
            </Card>
        </div>
    )

};


export default Emailverify;