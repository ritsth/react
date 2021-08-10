import React, { useEffect, useState, useRef } from 'react';
import axiosInstance from '../axios';
import { Card, Button, Row, Col, Image, Modal, Container, ListGroup, OverlayTrigger, Popover, Dropdown, } from 'react-bootstrap';


export default function Posts({ handleMouseLeave, handleMouseEnter, posts, delayHandler,user,comment }) {

    const pub_date = (new Date(posts.pub_date)).toString().replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/, '$1 $2 $3') ;

    const [showComment, setShowComment] = useState(false);
    const close = () => setShowComment(false);
    const showPostComment = () => setShowComment(true);

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
                const Url=`/posts_now/${posts.id}/`
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


        <Modal size="lg"
            className=""
            show={showComment}
            onHide={close}
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
                                    <div key={posts.id} className="cards" >
                                        <div className="card-header card-top"><Row><Col sm={10}>
                                          <a href={`/profile/${posts.user}`}>
                                                {user.filter(u=>u.id==posts.user).map((user) => <>
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
                                                            style={{cursor:"pointer"}}
                                                            ></i>
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                          <Dropdown.Item eventKey="1" onClick={deletePost}><i className="fa fa-trash" ></i> &nbsp; Delete</Dropdown.Item>
                                                             <Dropdown.Divider />
                                                          <Dropdown.Item eventKey="1" onClick={editPost}><i className="fa fa-edit "></i> &nbsp; Edit</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                  </Dropdown>
                                                    
                                                </Col>
                                          </Row>    
                                        </div>

   
                                        <Row sm={12}>
                                            <Col sm={6}>
                                                <Image alt="pic" src={posts.post_img} 
                                                    width="380"
                                                    height="280"
                                                    onMouseEnter={handleMouseEnter}
                                                    onMouseLeave={handleMouseLeave}

                                                />
                                                {delayHandler &&
                                                    <div id={ posts.id} className="index">click to see all the posts by the user</div>
                                                }
                                            </Col>
                                            <Col sm={6}>
                                                <div className="container ">
                                                        <br/>
                                                    <strong className="text-primary">{posts.type_name}</strong>
                                                    <h5 className="mt-3 mb-1 " >
                                                        {posts.user_name3}</h5>
                                                    <div className="text-muted mb-3 ml-2" >{pub_date} </div>
                                                    <p className="card-text  mb-4" style={{ fontSize:"18px" }}>{posts.status}</p>

                                                     <div className="display" id={`${posts.id}`}
                                                            onClick={showPostComment} >
                                                            <i className="fa fa-comments fa-2x "></i>
                                                            <p  data-toggle="popover"
                                                                title="Click here to comment"
                                                                className="text-muted ml-2">drop a comment ...
                                                            </p>
                                                     </div>  
                                                  
                                                            {comment.filter(c=> c.post == posts.id).slice(0,1).map((comment)=><>
                                                                <div className="commentSection">
                                                                    <Image src={localStorage.getItem(`photo-${comment.user}`) !==
                                                                        localStorage.getItem(`photo-`) ?
                                                                        (localStorage.getItem(`photo-${comment.user}`))
                                                                        : (process.env.PUBLIC_URL + "empty profile.png")}
                                                                        className="profile_img mt-1"
                                                                        width="31"
                                                                        height="31"
                                                                        alt="pic"
                                                                        roundedCircle
                                                                    />
                                                                    
                                                                    <div className="container">
                                                                     
                                                                        <small className="card-title "
                                                                            style={{ fontSize: "13px", fontWeight:"650" }}>{comment.user_name1}
                                                                        </small>
                                                                        <small className="text-muted ml-2 "
                                                                            style={{ fontSize: "11px" }}
                                                                        >
                                                                            {(new Date(comment.pub_date)).toString().replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/, '$2 $1 ')}
                                                                        </small>
                                                                        
                                                                        <p className="card-text " style={{ fontSize: "14px", wordWrap: "break-word" }}>
                                                                            {comment.comment_text} <a href="#" className="ml-5">see all comments &nbsp;
                                                                                <i className="fa fa-angle-double-right  "></i>
                                                                            </a>
                                                                           
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                            </>
                                                                )}
                                                    
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
           
                </>
			);
	
}

