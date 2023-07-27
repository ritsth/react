import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/fontawesome-free-solid';
import {Form,Button,FormControl,Navbar,Nav, NavDropdown,} from 'react-bootstrap';
import logo from './logo.svg';
import Google from '../Google';
import axiosInstance from '../axios';
import Search_bar from './search_bar';


class Navcom extends Component {
    state = {
        value: '',
        value2: '',
        list: '',
        count: 0,
        plant: [{ id: '', name_text: '', pub_date: '', plant_img: '', type_text: '', user: '' }],
        notifications: [{list:''}],
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

    notif_Condition = (e) => {
        if (localStorage.getItem(`${e}`) > 60) {
            axiosInstance
                .post('/Notifications/', {
                    list: `Time to water your ${e.name_text}.. Check the soli humidtity status !! `,

                })
                .then((res) => {

                    console.log(res.data);
                    const x = parseInt(localStorage.getItem('count'))+1
                    this.setState({ count: x });
                    localStorage.setItem('count', this.state.count)
                    localStorage.setItem(`${e}`, '00.00')
                })
                .catch((err) => console.log(err));
        }
    
    }
    componentDidMount() {

        const Url = `/plants/`;
        axiosInstance.get(Url).then((res) => {
            const data = res.data;
            this.setState({ plant: data });

        });
        this.state.plant.filter((filter) => filter.user == localStorage.getItem('current_user_id')).map(
            (plant) => {
                return (
                    axiosInstance.get(`/humidity/${plant.id}/`).then((res) => {
                        const Data = res.data;
                        localStorage.setItem(`${plant.id}`, Data.humidity);
                        console.log(Data);

                    })
                    
                )
            })
        this.interval = setInterval(() => {
            this.state.plant.filter((filter) => filter.user == localStorage.getItem('current_user_id')).map(
                (plant) => {
                    return (
                        axiosInstance.put(`/humidity/${plant.id}/`).then((res) => {
                            const Data = res.data;
                            localStorage.setItem(`${plant.id}`, Data.humidity);
                            console.log(localStorage.getItem(`${plant.id}`));
                            window.location.reload(true);
                        })
                    )
                })
        }, 10000000);
        this.interval = setInterval(() => {
            this.state.plant.filter((filter) => filter.user == localStorage.getItem('current_user_id')).map(
                (plant) => {
                    return (
                        this.notif_Condition(plant.id)
                    )
                })
        }, 10000000);

        axiosInstance.get(`Notifications/`).then((res) => {
            const Data = res.data;
            this.setState({notifications:Data});
        });
    }
    componentWillUnmount() {
        clearInterval(this.interval);
      
    }
    checked = (e) => {
        e.preventDefault();
        this.setState({ count: 0 });
        localStorage.setItem('count',0)
    }
    searchUpdate() {

        return this.state.value2 != 0 ? <Search_bar SearchWord={this.state.value2} /> : null;
    }
    render(){
        return (

            <>
                <Navbar className="color-nav" sticky="top" expand="lg" variant="dark">
                    <Navbar.Brand className="ml-2 mr-4 lead mt-1 t-logo" href="/"><img src={logo} height="44" width="44" alt="Logo" />&nbsp; &nbsp;BRANCH</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">

                            
                                <Nav.Link className="ml-5 mr-4" href="/feed">&nbsp;  Feed</Nav.Link>
                            {localStorage.getItem('current_user') !== null ? (
                            <NavDropdown className="ml-5  " onClick={this.checked}
                                title={<><i class="fa fa-bell" ></i>
                                    {this.state.count || localStorage.getItem('count')> 0 ?
                                        (
                                            <span className="position-absolute top-46  badge rounded-pill bg-danger lead">
                                                {localStorage.getItem('count')}
                                            </span>
                                        ) : (null)}

                                </>}
                                id="basic-nav-dropdown">
                                {this.state.notifications.map((list) => <>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item className="list"
                                        style={{ fontSize: "20px" }}>
                                        {list.list}
                                        <button onClick={(e) => {
                                            e.preventDefault();
                                            axiosInstance.delete(`/Notifications/${list.id}`).then((res) => {
                                                window.location.reload(true);
                                            })}
                                        } >ok</button>
                                    </NavDropdown.Item>
                                </>)}
                            </NavDropdown>):null}
                        </Nav>
                        <Nav>
                            <Form inline onSubmit={this.handleSubmit}>
                                <Nav.Link active className="ml-5 "
                                    href={localStorage.getItem('current_user') === null ? ("/login") : ('/profile/' + `${localStorage.getItem('current_user_id')}`)}>
                                    <i class="fa fa-user-circle lead">&nbsp; {localStorage.getItem('current_user')}</i>
                                </Nav.Link>

                                {localStorage.getItem('current_user') === null ? (<Nav.Link className="mr-4 ml-4" href="/signup">Sign up</Nav.Link>) :
                                    (<Nav.Link className="mr-4 ml-4" href="/logout">Logout</Nav.Link> )}

                                 <input className="form-control mr-sm-2 ml-3" type="search" placeholder="Search plant types" aria-label="Search" value={this.state.value} onChange={this.handleChange} />
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