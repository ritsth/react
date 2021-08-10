import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/fontawesome-free-solid';
import {Form,Button,FormControl,Navbar,Nav, NavDropdown,} from 'react-bootstrap';
import logo from './logo.svg';
import Google from '../Google';


class Navcom extends Component {
    state = {
        value: '',
        value2: '',
    };


    handleChange = (event) => {
        event.preventDefault()
        this.setState({ value: event.target.value });
        console.log(this.state.value)
        return this.state.value == 0 ? this.setState({ value2: this.state.value }) : null;
        console.log("2" + this.state.value2)
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({ value2: this.state.value });
        const data = this.state.value
        console.log(this.state.value2)
    };
    searchUpdate() {

        return this.state.value2 != 0 ? <Google SearchWord={this.state.value2} /> : null;
    }

    render(){
        return (
            
            <>
                
                <Navbar className="color-nav" sticky="top" expand="lg" variant="dark">
                    <Navbar.Brand className="ml-2 mr-4 lead mt-1 t-logo" href="/"><img src={logo} height="44" width="44" alt="Logo" />&nbsp; &nbsp;BRANCH</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">

                            {localStorage.getItem('current_user') !== null ? (
                                <Nav.Link className="ml-5 mr-4" href="/feed">&nbsp;  Feed</Nav.Link>):null}
                            
                            <NavDropdown className="ml-5 bell" title={<i class="fa fa-bell"></i>} id="basic-nav-dropdown">
                                   REMAINDER !!!
                                <NavDropdown.Divider />
                                   YOU NEED TO water your plant
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Form inline onSubmit={this.handleSubmit}>
                                <Nav.Link active className="ml-5 " href={localStorage.getItem('current_user') === null ? ("/login") : ('/profile/'+`${localStorage.getItem('current_user_id')}`)}><i class="fa fa-user-circle lead">&nbsp; {localStorage.getItem('current_user')}</i></Nav.Link>

                                {localStorage.getItem('current_user') === null ? (<Nav.Link className="mr-4 ml-4" href="/signup">Sign up</Nav.Link>) :
                                    (<Nav.Link className="mr-4 ml-4" href="/logout">Logout</Nav.Link> )}

                                 <input className="form-control mr-sm-2 ml-3" type="search" placeholder="Search" aria-label="Search" value={this.state.value} onChange={this.handleChange} />
                                 <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">
                                     <i class="fa fa-search"></i>
                                 </button>
                            </Form>
                        </Nav>
                        
                    </Navbar.Collapse>
                </Navbar>
                {this.searchUpdate()}
            </>
        );
    }
};

export default Navcom;