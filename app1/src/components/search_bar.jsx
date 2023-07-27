import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios';
import Posts from './posts'
import $ from "jquery";
import Slider from "react-slick";
import { Card, Button, Row, Col, Image, Modal, Container, Spinner, Dropdown, OverlayTrigger, Popover, } from 'react-bootstrap';
import No_results from './no_results';


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


export default function Search_bar({ SearchWord }) {
    const [appState, setAppState] = useState({
        loading: true,
        user: [{ id: '', username: '', first_name: '', last_name: '', date_joined: '', email: '', }],
    });
    const [allPostData, setAllPostData] = useState({
        posts: [{
            id: '',
            status: '',
            pub_date: '',
            post_img: '',
            type: '',
            user: '',
            user_name3: '',
            type_name: ''
        }],
    });
    const [Comment, setComment] = useState({
        comments: [{ comment_text: '', pub_date: '', user: '', user_name1: '', id: '', post: '' }],
    })

    useEffect(() => {
        axiosInstance.get(`/users/`).then((res) => {
            const User = res.data;
            setAppState({ loading: false, user: User });
        });
        axiosInstance.get('/comment').then((res) => {
            const Comments = res.data;
            setComment({ loading: false, comments: Comments });
        });  
        axiosInstance.get('/allPosts').then((res) => {
            const Posts = res.data;
            setAllPostData({ loading: false, posts: Posts });
        });


    }, [setComment, setAppState, setAllPostData]);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,

    };
    return (
        <>

            <h1 className="mx-5 my-4">Search Results</h1>
            <p>

            </p>
         
            <div >
                <Slider className="slides" {...settings} >
                    {allPostData.posts.filter((filter) => {
                        if (filter.type_name.toLowerCase().includes(SearchWord.toLowerCase())) {
                            return filter
                        }
                    }).map((posts) => {
                        if (posts != null) {
                            return <Posts
                                posts={posts}
                                user={appState.user}
                                comment={Comment.comments}/>
                        } else {
                            return <No_results/>
                        }
                        
                    })
                    }
            
                </Slider>
            </div>
            
        </>
    );
}
