import React, { useState } from 'react';
import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom';
import { Card, Button, Row, Col, Image, Modal, Container, Form } from 'react-bootstrap';


function SignUp() {
    const history = useHistory();
    const [errors, setErrors] = useState(false);
    const initialFormData = Object.freeze({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',

    });

    const [formData, UpdateFormData] = useState(initialFormData);

    const handleSubmit = (event) => {
        event.preventDefault()
        axiosInstance
            .post('users/',{
                username: formData.username,
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                password: formData.password
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                history.push('/login');

            })
            .catch(err => {
                console.log(err);
                setErrors(true); 
            });
    };

    const inputChanged = (event) => {
        UpdateFormData({
            ...formData,
            [event.target.name] : event.target.value.trim(),
        });
    };
    
        return (
            <Container fluid="true ">
                <figure className="position-relative bg-pic">
                    <figcaption className="figcap">
                        
                        <h2 className=" mb-5 mt-5  ">SIGN UP HERE !</h2>
                        <form onSubmit={handleSubmit} >
                            {errors == true && <h5 className="lead mb-3">A user with that username already exists !!!</h5>}

                            <Row>
                                <Col>
                            
                                    <input
                                        placeholder="firstname"
                                        class="form-control"
                                        type="text"
                                        name="first_name"
                                        autoComplete="first_name"
                                        onChange={inputChanged}
                                        required
                                    />
                                </Col>
                            
                                <Col>
                                    <input required
                                        placeholder="lastname"
                                        class="form-control"
                                        type="text"
                                        name="last_name"
                                        autoComplete="last_name"
                                        onChange={inputChanged}
                                    />
                                </Col>
                            </Row>
                            <br />
                            <label>
                                Username
                            </label>
                            <br />
                            <input required
                                placeholder="Username"
                                class="form-control"
                                type="text"
                                name="username"
                                autoComplete="username"
                                onChange={inputChanged}
                            />
                            <br/>

                            <label>
                                Email
                            </label>
                            <br />
                            <input required
                                placeholder="email"
                                class="form-control"
                                type="email"
                                name="email"
                                autoComplete="email"
                                onChange={inputChanged}
                            />
                            <br />

                            <label>
                                Password
                            </label>
                            <br />
                            <Row>
                                <Col>
                                    <input required
                                        placeholder="password"
                                        type="password"
                                        class="form-control"
                                        name="password"
                                        autoComplete="password"
                                        onChange={inputChanged}
                                    /> 
                                </Col>
                                <Col>
                                    <input required
                                        placeholder="Confirm password"
                                        type="password"
                                        class="form-control"
                                        name="confirm_password"
                                        autoComplete="password"
                                        onChange={inputChanged}
                                    /> 
                                </Col>
                            </Row>
                            <br />
                            <button type="submit" className="btn btn-success mb-2 ">Submit</button>
                            <p>Already have an account?<a href="/login"> Click here</a></p>

                        </form>
                  
                    </figcaption>
                </figure>
            </Container>
        );
    
}

export default SignUp;