import React from 'react';
import {BrowserRouter as Router ,Route,Switch} from 'react-router-dom';
import LoginPage from './components/Pages/LoginPage';
import SignupPage from './components/Pages/SignupPage';
import ExpenseHomePage from './components/Pages/ExpenseHomePage';
import UpdateProfile from './components/Users/UpdateProfile';
import ProfilePage from './components/Pages/ProfilePage';
import ForgotPassword from './components/Users/ForgotPassword';



function App() {
  return (

    <Router>
      <Switch>
        <Route exact path='/'>
              <SignupPage/>
        </Route>

        <Route path='/login'>
              <LoginPage/>
        </Route>


        <Route path='/expense'>
              <ExpenseHomePage/>
        </Route>

        <Route path='/updateprofile'>
             <UpdateProfile/>
        </Route>

        <Route path='/profilepage'>
           <ProfilePage/>
        </Route>

        <Route path='/forgotpassword'>
           <ForgotPassword/>
        </Route>
        
      </Switch>
    </Router>
    
  );
}

export default App;
