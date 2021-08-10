
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



function App({}) {
 
	const [appState, setAppState] = useState({
		loading: true,
        questions: [{question_text:'',}]
	});

    useEffect(() => {
   

    }, [setAppState]);

	return (
        <div>
           
            <Navcom />
   
            <BrowserRouter>
                        <Route path="/feed" >
                            <Feed
                            />
                        </Route>
                   
                    <Route path="/" exact >
                        <Home />
                    </Route>
                    <Route path='/profile/:userId' render={props => <Profile {...props}/>} />
                       
         
                    <Route path="/signup" exact >
                        <SignUp />
                    </Route>
                    <Route path="/login" exact >
                        <Login  />
                    </Route>                    
                    <Route path="/logout" exact >
                        <Logout />
                    </Route>
                </BrowserRouter>
                
		</div>
	);
}
export default App;


