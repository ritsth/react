
import './App.css';
import Navcom from './components/navbar';
import Google from './Google';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Home from './components/home';
import SignUp from './components/signup';
import Profile from './components/profile';
import Login from './components/login';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import axiosInstance from './axios';
import Logout from './components/logout';
import Feed from './components/feed';
import bootstrapBundle from './../path to node modules/../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import PlantStatus from './components/plantStatus';
import intreval from './components/plantStatus';




function App({}) {
 
	const [appState, setAppState] = useState({
		loading: true,
        questions: [{question_text:'',}]
	});

    const [loading,setLoading] = useState(true);
    useEffect(() => {
        
    }, [setAppState, setLoading]);

	return (
        <div>

            <Navcom />
            
            <BrowserRouter>
                   <Route path="/feed" >
                       <Feed/>
                   </Route>
                    <Route path='/plantStatus/:userId' render={props => <PlantStatus {...props} />} />
                   
                    <Route path="/" exact >
                        <Home />
                    </Route>
                    <Route path='/profile/:userId' render={props => <Profile {...props}/>} />
                       
         
                    <Route path="/signup"  >
                        <SignUp />
                    </Route>
                    <Route path="/login" >
                        <Login  />
                    </Route>                    
                    <Route path="/logout"  >
                        <Logout />
                    </Route>
                </BrowserRouter>
                
		</div>
	);
}
export default App;


