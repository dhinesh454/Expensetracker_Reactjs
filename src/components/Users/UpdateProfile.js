import { Form ,Row,Col, Button} from "react-bootstrap";
import { useRef } from "react";
import { useHistory } from "react-router-dom";



const UpdateProfile = () => {
    
    const history = useHistory();

    const nameRef = useRef();
    const photoRef = useRef();

    function cancelHandler (event){
        history.goBack();
    }


    async function updateHandler(event){
        event.preventDefault();
        const displayName = nameRef.current.value;
        const photoUrl = photoRef.current.value;
        const idToken = localStorage.getItem('token');

        try {
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCadqOoJjHC-xCAKq19vBPdxjuzR1XcGFk',{
                method:'POST',
                body:JSON.stringify({
                    idToken,
                    displayName,
                    photoUrl,
                    returnSecureToken:false
                }),
                headers:{
                   'Content-Type': 'application/json' 
                }

            });

            if(!res.ok){
                throw new Error('Failed to Update your profile Retry')
            }

            const data = await res.json();
            console.log(data);
            history.push('/expense');
            
        } catch (error) {
            alert(`Failed retry!!..${error}`);
            console.log(error)
        }
    }

    return(

    <>
         <div className="d-flex align-items-center justify-content-between p-2 border-bottom 1px solid black">
              <p className="fst-italic fw-bold">Winners never quite , Quitters never win.</p>
              <p>Your profile is <span className="fst-italic fw-bold">64%</span>completed.completeNow</p>      
        </div>
        <h1 className="text-center fs-3 fw-bolder text-success">Update Profile</h1>
        <div className="m-2 d-flex justify-content-end variant-warning">
            <Button onClick={cancelHandler} variant="danger">Cancel</Button>
        </div>
        <Form className="m-4 width-" onSubmit={updateHandler}>
            <Row>
                <Col>
                    <Form.Group className="mb-3" onSubmit={updateHandler}>
                        <Form.Label className="fst-italic fw-bold ">Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter the name" required  ref={nameRef}/>
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label className="fst-italic fw-bold ">Photo URL</Form.Label>
                        <Form.Control type="text" placeholder="Enter the name" required  ref={photoRef}/>
                    </Form.Group>
                </Col>

            </Row>

            <Button type="submit">update</Button>
        </Form>
    </>
    )

};

export default UpdateProfile;