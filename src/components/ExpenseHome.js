import React, { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ExpenseForm from "./ExpenseForm";
// import { expenseAction } from "../store/expense";
import { useSelector } from "react-redux";
import Premium from "./Premium";




const ExpenseHome = () => {
    const history = useHistory();
    const [profile, setProfile] = useState({ isComplete: true, data: null });
    const [emailVerified, setEmailVerified] = useState(true);
    const expense = useSelector((state)=>state.expenses.expenses);

    const total = expense.reduce((acc,exp)=> acc+parseInt(exp.amount),0);
    console.log(total,'--------->total')
    useEffect(() => {
        getUserProfile();
    }, []);

  

  



    //verify emailhandler
    const emailverifyHandler = async () => {
        try {
            const payload = {
                requestType: "VERIFY_EMAIL",
                idToken: localStorage.getItem('token')
            };
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCadqOoJjHC-xCAKq19vBPdxjuzR1XcGFk', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.statusText}`);
            }
            const data = await res.json();
            console.log('Verification email sent successfully:', data);
            alert('Check Your Email and verify ..login Again');
            history.push('/');
        } catch (error) {
            console.error('Error sending verification email:', error);
        }
    }

    async function getUserProfile() {
        const idToken = localStorage.getItem('token');
        try {
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCadqOoJjHC-xCAKq19vBPdxjuzR1XcGFk', {
                method: 'POST',
                body: JSON.stringify({ idToken }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) {
                throw new Error('Failed to get user data!..check Again');
            }

            const data = await res.json();
            const user = data.users?.[0];
        
            if (user) {
                const isComplete = !!(user.displayName && user.photoUrl);
                setProfile({ isComplete, data: user });

                if (!user.emailVerified) {
                    setEmailVerified(false);
                }
            }    
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="d-flex align-items-center justify-content-between p-2 border-bottom 1px solid black m-1">
                <p className="fst-italic fw-bold">Welcome to Expense tracker</p>
                {!profile.isComplete && <p>Your profile is incomplete <span><Link to={'/updateprofile'}>Complete Now</Link></span></p>}
                {profile.isComplete && profile.data &&
                    <div className="d-flex align-items-center gap-2 m-2">
                        <Image width={40} height={40} src={profile.data.photoUrl} alt="User Profile" roundedCircle />
                        <Link to={'/profilepage'}><p className="fw-bold fst-italic text-success mt-2 text-decoration-none">{profile.data.displayName}</p></Link>
                    </div>
                }

                  
            </div>
            {total>10000 && <Premium/>}

            {!emailVerified && <div className="d-flex justify-content-end m-1">
                <Button onClick={emailverifyHandler}>Verify Email</Button>
            </div>}

            <ExpenseForm />
        </>
    );
};

export default ExpenseHome;
