
import React, { useEffect, useState, useRef } from 'react';
import Slider from "react-slick";
import axiosInstance from '../axios';
import { Component } from 'react';
import { Card, Button, Row, Col, Image, Modal, Container, OverlayTrigger, Tooltip, Popover, Spinner } from 'react-bootstrap';
import Posts from './posts';
import C_post from './create_post';
import Posts_old from './posts_old';



function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}  
            style={{
                ...style, display: "block",
                background: "teal",
                height: "300px",
                alignContent: "center",
                width: "20px",
                marginRight: "15px",
            }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style, display: "block",
                background: "teal",
                height: "300px",
                alignText: "center",
                width: "20px",
                marginLeft: "15px",
                position: "absolute"
            }}
            onClick={onClick}
        />
    );
}




export default class Feed extends Component {

    state = {
        user: [{ id: '', username: '', first_name: '', last_name: '', date_joined: '', email: '', }],
        posts: [{ id: '', status: '', pub_date: '' ,post_img:'',type:'',user:'',user_name3:'',type_name:''}],
        posts_old: [{ id: '', status: '', pub_date: '', post_img: '', type: '', user: '', user_name3: '' }],
        comments: [{comment_text:'',pub_date:'',user:'',user_name1:'',id:'',post:''}],
        loading:true,
    };


    close = () => {
        this.setState({show_create_post: false })
    }

    componentDidMount() {
    
           
            const Url = `/posts_now`;
            axiosInstance.get(Url).then((res) => {
                const posts = res.data;
                this.setState({ loading:false, posts: posts });
            });
            axiosInstance.get('/posts_later').then((res) => {
                const posts = res.data;
                this.setState({ loading: false, posts_old: posts });

            });           
            axiosInstance.get('/users').then((res) => {
                const User= res.data;
                this.setState({ loading: false, user: User});
                console.log(User);

            });            
            axiosInstance.get('/comment').then((res) => {
                const data= res.data;
                this.setState({ loading: false,  comments: data});
            });


    };

    handleSubmit = (event) => {
        event.preventDefault();
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const URL = '/comment/';
        let formData = new FormData();

        formData.append('comment_text', this.state.comment_text);

        axiosInstance
            .post(URL, formData, config)
            .then((res) => {
                console.log(res.data);
                window.location.reload(true);
            })
            .catch((err) => console.log(err));

    }

    settings = {
        dots: false,
        infinite:false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        
    };
    render() {
         return (
             <>
                
                    <div className="post-box card ">
                        <C_post />
                    </div>

                    <div className="">
                            <p className="heading1">recent posts</p>
                        {this.state.loading == true?(
                            <Spinner animation="border" className="ml-5"/>
                        ): (
                                   <Slider className="slides" {...this.settings} >
                                          {this.state.posts[0] == null ? (
                                             
                                                 <><p className="mt-3">No posts</p><img
                                                    alt="pic"
                                                    src="https://i.pinimg.com/564x/18/c8/25/18c8257fc8d68973cfcf7c50d3a66646.jpg" 
                                                    className="ml-5 mb-5" width="500" height="200"
                                                />
                                                </>    
                                       
                                              )
                                             : (  this.state.posts.map((posts) => {
                                             
                                                             return <Posts
                                                                 posts={posts}
                                                                 user={this.state.user}
                                                                 comment={this.state.comments}
                                                                />
                                                             }
                                                 )
                                            )} 
                                    </Slider>
                         )}
                            
                    </div>

                     <div className="">
                         <p className="heading2">Old posts</p>
                        {this.state.loading==true?(
                            <Spinner animation="border" className="ml-5" />
                            ):(
                             <Slider className="slides2" {...this.settings} >
                                 {this.state.posts_old[0] == null ? (

                                     <><p className="mt-3">No older posts</p><img
                                         alt="pic"
                                         src="https://i.pinimg.com/564x/18/c8/25/18c8257fc8d68973cfcf7c50d3a66646.jpg"
                                         className="ml-5"
                                     />
                                     </>
                                     )
                                     : (this.state.posts_old.map((posts) => {

                                         return <Posts_old
                                             posts={posts}
                                             user={this.state.user}
                                             comment={this.state.comments}
                                             profile_photo={this.state.profile_photo}

                           
                                         />
                                     }
                                     ))}
                             </Slider>
                             ) }

                     </div>
               

             
               
                </>
            );
    }
}