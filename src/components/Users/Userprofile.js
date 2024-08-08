import React,{useEffect, useState} from "react";
import { Card,Image } from "react-bootstrap";
import classes from './Userprofile.module.css';


const Userprofile = () => {
    const [profile,setProfile] = useState(null);



    useEffect(()=>{
        getUserProfile()
    },[])

 async function getUserProfile(){
   
        const idToken = localStorage.getItem('token');
        try {
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCadqOoJjHC-xCAKq19vBPdxjuzR1XcGFk',{
                method:'POST',
                body:JSON.stringify({
                    idToken
                }),
                headers:{
                    'Content-Type': 'application/json'
                }

            });

            if(!res.ok){
                throw new Error('Failed to get user data!..check Again')
            }

            const data = await res.json();
            console.log(data);
            const user = data.users?.[0];
        
        
            console.log(user)
            setProfile(user); // Set user object direct
                    
                    
           
        } catch (error) {
            console.log(error)
        }
    }


return(
    <div className={`${classes.container}`}>
       {profile &&  
       <Card style={{width:'25rem'}} >
            <div className="d-flex flex-column justify-content-center align-items-center m-1 p-1">
                <Image src={profile.photoUrl} roundedCircle/>
                <Card.Text className="fw-bold fst-italic text-primary">{profile.displayName}</Card.Text>
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center m-1 p-1">
                <p><span className="fw-bold text-primary">Email</span>:{profile.email}</p>
    

            </div>
           
        </Card>}
    </div>
)
};

export default Userprofile;