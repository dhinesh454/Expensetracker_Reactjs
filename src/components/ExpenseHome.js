import React, { useEffect,useState } from "react";
import { Button, Image } from "react-bootstrap";
import { Link,useHistory } from "react-router-dom/cjs/react-router-dom.min";


const ExpenseHome = () =>{


    const [profilestate,setProfilestate]=useState(true);
    const [profile,setProfile] = useState(null);
    const [emailVerified,setemailVerified] = useState(true);
    const history = useHistory();

    console.log(profile);
    useEffect(()=>{
        getUserProfile();
    },[]);


    const emailverifyHandler = () => {
        history.push('/verifyemail')
    }

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
        
            if (user) {
                const displayName = user.displayName || 'No display name';
                const photoUrl = user.photoUrl || 'No photo URL';
    
                console.log(displayName, photoUrl);

                if(!user.emailVerified) setemailVerified(false)
    
                if (displayName === 'No display name' || photoUrl === 'No photo URL') {
                    console.log('Profile not fully updated');
                    setProfilestate(false)
                }
                else{
                    console.log(data.users)
                    setProfile(user); // Set user object direct
                    
                    
                    
                }
            }    
        } catch (error) {
            console.log(error)
        }
    }
    


    
    return(

        <>
        
        <div className="d-flex align-items-center justify-content-between p-2 border-bottom 1px solid black">
              <p className="fst-italic fw-bold">Welcome to Expense tracker</p>
              {!profilestate && <p>Your profile incomplete<span><Link to={'/updateprofile'}>Complete Now</Link></span></p>}
              {profile && 
                <div className="d-flex align-items-center gap-2 m-2">
                    <Image width={40} height={40} src={profile.photoUrl} alt="User Profile" roundedCircle/>
                    <Link  to={'/profilepage'}><p className="fw-bold fst-italic text-success mt-2 text-decoration-none">{profile.displayName}</p></Link>
                </div>
            }
              
              
        </div>

       {!emailVerified  && <div className="d-flex justify-content-end m-1">
            <Button onClick={emailverifyHandler}>Verify Email</Button>
        </div>}

        </>
            
       
       
      
    )
};

export default ExpenseHome;