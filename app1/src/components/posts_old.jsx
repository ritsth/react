import React, { Component } from 'react';
import { Card, Button, Row, Col, Image, Modal, Container, Dropdown, DropdownButton, OverlayTrigger, Popover } from 'react-bootstrap';
import axiosInstance from '../axios';

export default function Posts_old({ postComments, Contents, handleMouseLeave, handleMouseEnter, posts, delayHandler,user }) {

    const pub_date = (new Date(posts.pub_date)).toString().replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/, '$1 $2 $3');

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
            console.log(res.data);
        });
    }
    const editPost = (event) => {
        event.preventDefault();
        const Url = `/posts_later/${posts.id}/`
        axiosInstance.delete(Url).put((res) => {
            window.location.reload(true);
            console.log(res.data);
        });
    }
    return (<>
        <div key={posts.id} className="cards" >
            <div className="card-header card-top"><Row><Col sm={10}>
                <a href={`/profile/${posts.user}`}>
                    {user.filter(u => u.id == posts.user).map((user) => <>
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 700, hide: 300 }} key={user.id}
                            overlay={<Popover id={user.id} >
                                <div className="card">
                                    <div className="card-header t" >
                                        <Image src={localStorage.getItem(`photo-${posts.user}`) !==
                                            localStorage.getItem(`photo-`) ?
                                            (localStorage.getItem(`photo-${posts.user}`))
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

                            <Image src={localStorage.getItem(`photo-${posts.user}`) !==
                                localStorage.getItem(`photo-`) ?
                                (localStorage.getItem(`photo-${posts.user}`))
                                : (process.env.PUBLIC_URL + "empty profile.png")}
                                className="profile_img"
                                width="40"
                                height="40"
                                alt="pic"
                                roundedCircle
                            />
                        </OverlayTrigger>
                    </>)}
                </a>
                <blockquote>{posts.user_name3}</blockquote>
            </Col>
                <Col> 
                    <Dropdown>
                        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                            <i className="fa fa-ellipsis-h  icon"
                                data-toggle="popover"
                                title="delete or edit"
                                style={{ cursor: "pointer" }}
                            ></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="1" onClick={ deletePost}><i className="fa fa-trash "></i> &nbsp; Delete</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="1" onClick={editPost }><i className="fa fa-edit "></i> &nbsp; Edit</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            </div>


            <Row>
                <Col className="post_img">
                    <Image alt="pic" src={posts.post_img}
                        width="380"
                        height="280"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                    {delayHandler &&
                        <div id={posts.id} className="index">click to see all the posts by the user</div>
                    }
                </Col>
                <Col className="mr-5">
                    <div className="container">
                        <br />
                        <strong className="text-primary  ">{posts.type_name}</strong>
                        <h5 className="mt-3 mb-1" >
                            {posts.user_name3}</h5>
                        <div className="text-muted mb-3 ml-2" >{pub_date} </div>
                        <p className="card-text h4 mb-4" style={{ fontFamily: "ariel" }}>{posts.status}</p>

                        <div className="flex" id={`${posts.id}`}
                            onClick={postComments} >
                            <i className="fa fa-comments fa-3x "></i>
                            <small className="text-muted ml-2">drop a comment ...</small>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>

    </>
    );


}