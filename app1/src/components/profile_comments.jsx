import React, { useEffect, useState, useRef } from 'react';
import axiosInstance from '../axios';
import { Card, Button, Row, Col, Image, Modal, Container, ListGroup, OverlayTrigger, Popover, Dropdown, } from 'react-bootstrap';
import axios from 'axios';
import p from './profileLogo.svg';

export default function Profile_comments({ comment, user }) {


    const [error, setError] = useState(false)

    const [profilePhoto, setProfilePhoto] = useState({
        data: [{
            user: '',
            Profile_photo: '',
        }]
    })

    useEffect(() => {

        axiosInstance.get(`/profile_photo/${comment.user}/`).then((res) => {
            const Data = res.data;
            setProfilePhoto({ data: Data });
            console.log(profilePhoto.data.Profile_photo);
        })
            .catch((err) => {
                if (err = 'Request failed with status code 404') {
                    setError(true)
                }
            })



    }, [setProfilePhoto, setError]);

    return (

        <>

            <div className="commentSection">
                <a href={`/profile/${comment.user}/`}>
                <Image src={error == false ? (profilePhoto.data.Profile_photo)
                    : (p)}
                    className="profile_img mt-1"
                    width="31"
                    height="31"
                    alt="pic"
                    roundedCircle
                /></a>
                <div className="container">

                    <small className="card-title "
                        style={{ fontSize: "13px", fontWeight: "650" }}>{comment.user_name1}
                    </small>
                    <small className="text-muted ml-2 "
                        style={{ fontSize: "11px" }}
                    >
                        {(new Date(comment.pub_date)).toString().replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/, '$2 $1 ')}
                    </small>{comment.user == localStorage.getItem('current_user_id') ? (<>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i
                            className="fa fa-info-circle ml-5 text-muted "
                            data-toggle="popover"
                            title="Click here to delete this comment"
                            style={{ cursor: "pointer" }}
                            onClick={() => axiosInstance.delete(`/comment/${comment.id}/`).then(window.location.reload())}
                        ></i></>) : (null)}

                    <p className="card-text " style={{ fontSize: "14px" }}
                    >
                        {comment.comment_text}

                    </p>
                </div>
            </div>

        </>
    );

}