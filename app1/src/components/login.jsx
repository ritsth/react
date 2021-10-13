import React, { useState } from 'react';
import axiosInstance from '../axios';
import { Card, Button, Row, Col, Image, Modal, Container, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode'

export default function Login() {
    const history = useHistory();
    const [errors, setErrors] = useState(false);
    const initialFormData = Object.freeze({
        username: '',
        password: ''
    });

    const [formData, UpdateFormData] = useState(initialFormData);

    const inputChanged = (event) => {
        UpdateFormData({
            ...formData,
            [event.target.name]: event.target.value.trim(),
        });
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        console.log(formData);
        localStorage.setItem('formData', formData);
        axiosInstance
            .post('token/', {
                username: formData.username,
                password: formData.password,
            })
            .then((res) => {
                const user = formData.username;
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                localStorage.setItem('current_user', user);
                console.log(user);

                var decode = jwt_decode(res.data.refresh);
                localStorage.setItem('current_user_id', decode.user_id);
                axiosInstance.defaults.headers['Authorization'] =
                    'JWT ' + localStorage.getItem('access_token');
                history.push('/');
                window.location.reload(true);

                //console.log(res);
                
            })
            .catch((err) => {
                setErrors(true);
            });
    } 

        return (
            <Container fluid="true">
                <figure className="position-relative bg-pic ">
                  
                    <figcaption className="figcap">
                        <form onSubmit={handleSubmit}>
                            <h2 className="mb-5 mt-3 ">LOGIN </h2>
                            {errors == true && <h5 className="lead mb-3">No account found with the given credentials !!!</h5>}

                            <label>
                                Username
                            </label>
                            <br/>
                            <input required
                                placeholder="username"
                                class="form-control"
                                type="text"
                                name="username"
                                autoComplete="username"
                                onChange={inputChanged}
                            />
                            <br />

                            <label>
                                Password
                            </label>
                            <br/>
                            <input type="password"
                                required
                                placeholder="password"
                                class="form-control"
                                name="password"
                                autoComplete="current-password"
                                onChange={inputChanged}
                            />
                            <br />
                            <button  className="btn btn-success mb-4 ">Submit</button>
                            <p>Don't have an account?<a href="/signup" style={{ color: "blue" }}> Click here</a></p>
                        </form>
                        <br/>
                        <br/>
                        <br/>
                        <br />
                        <br />
                       
                       
                    </figcaption>
                </figure>
            </Container>
        );
    
}

