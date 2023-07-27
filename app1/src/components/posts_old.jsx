import React, { useEffect, useState, useRef } from 'react';
import axiosInstance from '../axios';
import { Card, Button, Row, Col, Image, Modal, Container, ListGroup, OverlayTrigger, Popover, Dropdown, } from 'react-bootstrap';
import axios from 'axios';
import Comments_modal from './comments_modal';
import Comment from './comments';

export default function Posts_old({ posts, user, comment }) {

    const pub_date = (new Date(posts.pub_date)).toString().replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/, '$1 $2 $3');
    const [isLogedin, setIsLogedin] = useState(false)
    const [showComment, setShowComment] = useState(false);
    const [addComment, setAddComment] = useState(false);
    const close = () => setShowComment(false);
    const [error, setError] = useState(false)

    const [profilePhoto, setProfilePhoto] = useState({
        data: [{
            user: '',
            Profile_photo: '',
        }]
    })

    useEffect(() => {

        axiosInstance.get(`/profile_photo/${posts.user}/`).then((res) => {
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

    const [commentData, setCommentData] = useState({
        comment_text: '',

    })

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <p
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);

            }}
        >
            {children}

        </p>
    ));
    const deletePost = (event) => {
        event.preventDefault();
        const Url = `/posts_later/${posts.id}/`
        axiosInstance.delete(Url).then((res) => {
            window.location.reload(true);
        });
    }

    const editPost = (event) => {
        event.preventDefault();
        alert('under construction !!')

    }

    const inputChanged = (event) => {
        setCommentData({
            ...commentData,
            [event.target.name]: event.target.value.trim(),
        });

    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const URL = '/comment/';
        axiosInstance
            .post(URL, {
                comment_text: commentData.comment_text,
                post: `${posts.id}`
            })
            .then((res) => {
                console.log(res.data);
                window.location.reload(true);
            })
            .catch((err) => alert(err));
    }
    return (<>

        <Modal size="lg" className="" show={isLogedin} onHide={() => setIsLogedin(false)} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className=" ">
                <p>Don't have an account?<a href="/signup"> Click here</a></p>
            </Modal.Header>
            <Modal.Header >
                <Modal.Title>
                    <a href="/login">Login </a>  first to add posts !!
                    </Modal.Title>
            </Modal.Header>
        </Modal>

        <Modal size="lg"
            className=""
            show={addComment}
            onHide={() => setAddComment(false)}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton className="modal-top ">
                Comments
            </Modal.Header>
            <Modal.Header >
                <Modal.Title>
                    <form onSubmit={handleSubmit}>
                        <input required
                            style={{ width: 770 }}
                            placeholder="write a comment .  .  ."
                            class="form-control"
                            type="text"
                            onChange={inputChanged}
                            name="comment_text"
                        />
                        <button
                            className="btn btn-success mt-3"
                        >comment</button>
                    </form>

                </Modal.Title>
            </Modal.Header>

        </Modal>

        <>


            <div key={posts.id} className="cards" >
                <div className="card-header card-top"><Row><Col sm={10}>

                    {user.filter(u => u.id == posts.user).map((user) => <>

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
                                        <b className="h6 ml-1">{user.first_name} {user.last_name}</b>

                                    </div>
                                    <div className="card-body b">
                                        <p>Exploring the plant world.</p>
                                        <p><i className="fa fa-clock-o fa-fw margin-right text-theme ">
                                        </i>
                                            {(new Date(user.date_joined)).toString().replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/, '$1 $2 $3')}
                                            <br />
                                            <i className="fa fa-envelope fa-fw margin-right text-theme"></i> {user.email}</p>
                                    </div>
                                </div>
                            </Popover>}
                        >

                            <Image src={error == false ? (profilePhoto.data.Profile_photo)
                                : (process.env.PUBLIC_URL + "empty profile.png")}
                                className="profile_img"
                                width="40"
                                height="40"
                                alt="pic"
                                roundedCircle
                                style={{ cursor: "pointer" }}

                            />
                        </OverlayTrigger>
                    </>)}

                    <blockquote ><a href={`/profile/${posts.user}`} style={{ color: "black" }}>{posts.user_name3}</a></blockquote>
                </Col>

                    <Col>{localStorage.getItem('current_user_id') != null & posts.user == localStorage.getItem('current_user_id') ?
                        (<Dropdown>
                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                <i className="fa fa-ellipsis-h  icon"
                                    data-toggle="popover"
                                    title="delete or edit"
                                    style={{ cursor: "pointer" }}
                                ></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="1" onClick={deletePost}><i className="fa fa-trash" ></i> &nbsp; Delete</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item eventKey="1" onClick={editPost}><i className="fa fa-edit "></i> &nbsp; Edit</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>) : (null)}

                    </Col>
                </Row>
                </div>


                <Row sm={12}>
                    <Col sm={6}>
                        <Image alt="pic" src={posts.post_img}
                            width="380"
                            height="280" className=" "
                        />
                    </Col>
                    <Col sm={6}>
                        <div className="container card" style={{ border: "none" }}>
                            <br />
                            <strong className="text-primary">{posts.type_name}</strong>
                            <h5 className="mt-3 mb-1 " >
                                {posts.user_name3}</h5>
                            <div className="text-muted mb-3 ml-2" >{pub_date} </div>
                            <p className="card-text mb-4" style={{ fontSize: "18px" }}>{posts.status}</p>

                            <div className="display" id={`${posts.id}`}
                                onClick={localStorage.getItem('current_user_id') != null ?
                                    (() => setAddComment(true))
                                    : (() => setIsLogedin(true))} >
                                <i className="fa fa-comments fa-2x "></i>
                                <p data-toggle="popover"
                                    title="Click here to comment"
                                    className="text-muted ml-2">drop a comment ...
                                                            </p>
                            </div>

                            <Modal size="lg"
                                className=""
                                show={showComment}
                                onHide={close}
                                aria-labelledby="contained-modal-title-vcenter"
                                centered>
                                <Modal.Header closeButton className="modal-top ">
                                    All Comments
                                                                </Modal.Header>
                                <Modal.Header >
                                    <Modal.Title>
                                        {comment.filter(c => c.post == posts.id).map((comments) => {
                                            return <Comments_modal
                                                comment={comments}
                                                user={user}
                                            />
                                        })
                                        }

                                    </Modal.Title>
                                </Modal.Header>

                            </Modal>
                            {comment.filter(c => c.post == posts.id).slice(0, 1).map((comments) => {
                                return <Comment
                                    comment={comments}
                                    user={user}
                                />
                            })}

                            {comment.filter(c => c.post == posts.id).slice(0, 1).map((comments) => {
                                <a href="#" className="ml-5 "
                                    onClick={() => setShowComment(true)}>see all comments &nbsp;
                                    <i className="fa fa-angle-double-right  "></i>
                                </a>
                            })}
                        </div>
                    </Col>
                </Row>
            </div></>

    </>
    );

}