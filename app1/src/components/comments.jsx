import React, { useEffect, useState, useRef } from 'react';
import axiosInstance from '../axios';
import { Card, Button, Row, Col, Image, Modal, Container, ListGroup, OverlayTrigger, Popover, Dropdown, } from 'react-bootstrap';
import axios from 'axios';


export default function Comment({ comment, user }) {


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
                {user.filter(u => u.id == comment.user).map((user) => <>
                    <a href={`/profile/${comment.user}`}>
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 700, hide: 300 }} key={user.id}
                            overlay={<Popover id={user.id} >
                                <div className="card">
                                    <div className="card-header t" >
                                        <Image src={error == false ? (profilePhoto.data.Profile_photo)
                                            : (process.env.PUBLIC_URL + "empty profile.png")}
                                            className="profile_img"
                                            width="90"
                                            height="90"
                                            alt="pic"

                                        />
                                        <b className="lead ml-4">{user.first_name} {user.last_name}</b>

                                    </div>
                                    <div className="card-body b">
                                        <p className="">A beginner programmer ! And I am learning react and django .</p>
                                        <p><i className="fa fa-envelope fa-fw margin-right text-theme"></i> {user.email}</p>

                                    </div>
                                </div>
                            </Popover>}
                        >

                            <Image src={error == false ? (profilePhoto.data.Profile_photo)
                                : (process.env.PUBLIC_URL + "empty profile.png")}
                                className="profile_img mt-1"
                                width="31"
                                height="31"
                                alt="pic"
                                roundedCircle
                            />

                        </OverlayTrigger></a>
                </>)}


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