import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Image, Modal, Container, Spinner, Dropdown, OverlayTrigger, Popover,  } from 'react-bootstrap';
import ModalPhoto from './modal';
import axiosInstance from '../axios';
import p from './profileLogo.svg';
import Cropper from "react-cropper";
import $ from "jquery";
import Slider from "react-slick";
import Posts from './posts'
import Profile_comments_modal from './profile_comments_modal';
import Profile_comments from './profile_comments';
import P from './p_posts';

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


function Profile({ match }) {
    const [showComment, setShowComment] = useState(false);
    const [cropModal, setCropModal] = useState(false);
    const handleClose3 = () => setCropModal(false);
    const [cropper, setCropper] = useState();
    const [cropImg, setCropImg] = useState({ I: '' });
    const [Img, setImg] = useState({ i: '' });
    const [canvas, setcanvas] = useState({ c: '' });
    const [addPlantModal,setAddPlantModal] = useState(false);
    const [viewModal, setModalView] = useState(false);
    const [view, setView] = useState(false);
    const handleClose = () => setView(false);
    const handleClose2 = () => setModalView(false);
    const handleModalView = () => setModalView(true);
    const [isLogedin, setIsLogedin] = useState(false)
    const [addComment, setAddComment] = useState(false);

    const [error, setError] = useState(true)

    const [appState, setAppState] = useState({
		loading: true,
        user: [{id:'',username:'',first_name:'',last_name:'',date_joined:'', email:'',}],
	});
    const [pState, setpState] = useState({
        user_photo: ''
    });
    const [nearbyDevices, setNearbyDevices] = useState({
            devices: ''
    })
    const [deviceNames, setDeviceNames] = useState({
            names: ''
    })
    const [plantData, setPlantData] = useState({
        plant: [{
        name_text: '',
        type_text: '',
        plant_img: '',
        device: '',
        }]
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
    const [plantsData, setPlantsData] = useState({
        plant: [{ id: '', name_text: '', pub_date: '', plant_img: '', type_text: '', user: '' }],
    })
    const [Comment, setComment] = useState({
        comments: [{ comment_text: '', pub_date: '', user: '', user_name1: '', id: '', post: '' }],
    })

    const [profilePhoto, setProfilePhoto] = useState({
        data: [{
            user: '',
            Profile_photo: null,
        }]
    })
  
    const inputChanged = (event) => {
        setPlantData({
            ...plantData,
            [event.target.name]: event.target.value.trim(),
            device: nearbyDevices.devices
        });
        
    }

    const fileSelector = (event) => {
        setPlantData({ ...plantData, plant_img: event.target.files[0] });

        const reader = new FileReader();
        reader.addEventListener('load', () => {
            setCropImg({ I: reader.result });
        })
        reader.readAsDataURL(event.target.files[0]);
        setImg({ i: event.target.files[0] });
        setCropModal(true);
    }

    const changes = (e) => {
        e.preventDefault();
        setcanvas({ c: cropper.getCroppedCanvas() });
        setCropModal(false);
    }

    const nextDevice = (e) => {
        e.preventDefault()
        axiosInstance.post('/nearbyDevices/').then((res) => {
            const Data = res.data;
            setNearbyDevices({ devices: Data.nearbyDevices});
            setDeviceNames({ names: Data.deviceNames });
            console.log(Data)
        });
    }

    useEffect(() => {
        const user_id = parseInt(match.params.userId)
        const URL = `/users/${user_id}`;

        axiosInstance.get(`/profile_photo/${user_id}/`).then((res) => {
            const Data = res.data;
            setProfilePhoto({ data: Data });
            console.log(profilePhoto.data.Profile_photo);
        })
            .catch((err) => {
                if (err = 'Request failed with status code 404') {
                    setError(false)
                }
                console.log(err);
                console.log(error);
            })

        axiosInstance.get('/allPosts').then((res) => {
            const Posts = res.data;
            setAllPostData({ loading: false, posts: Posts });
            console.log(Posts);
        });
        axiosInstance.get('/comment').then((res) => {
            const Comments = res.data;
            setComment({ loading: false, comments: Comments });
            console.log(Comments);
        });  

        axiosInstance.get(URL).then((res) => {
            const User = res.data;
            setAppState({ loading: false, user: User });
            console.log(User);
        });
       setpState({ user_photo: user_id });
        const Url = `/plants/`;
        axiosInstance.get(Url).then((res) => {
            const data = res.data;
            setPlantsData({ loading: false,plant: data });
            console.log(data);
        });
   
        axiosInstance.get('nearbyDevices/').then((res) => {
            const Data = res.data;
            setNearbyDevices({ devices: Data.nearbyDevices });
            setDeviceNames({ names: Data.deviceNames });
            console.log(Data)
        });

    }, [setAppState, setpState,
        setPlantsData, setNearbyDevices,
        setDeviceNames, setAllPostData, setComment,
        setProfilePhoto, setError]);


    const handleSubmit = (event) => {
        event.preventDefault();

        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const URL = '/plants/';
        const dataurl = cropper.getCroppedCanvas().toDataURL()
        canvas.c.toBlob((blob) => {
            let formData = new FormData();
            formData.append('type_text',plantData.type_text);
            formData.append('name_text', plantData.name_text);
            formData.append('device', plantData.device);
            formData.append('plant_img', blob, `${Img.i.name}`);

            axiosInstance
                .post(URL, formData, config)
                .then((res) => {
                    console.log(res.data);
                    window.location.reload(true);
                })
                .catch((res) => alert(res));

        })
    }

    const cancleCrop = (e) => {
        e.preventDefault();
        cropper.destroy();
        setCropModal(false);

    }
    const handleView = () => {
        setView(true);
    }


    const date = (new Date(appState.user.date_joined)).toString().replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/, '$1 $2 $3');
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


    const commentChanged = (event) => {
        setCommentData({
            ...commentData,
            [event.target.name]: event.target.value.trim(),
        });

    }

    const deleteProfilePhoto = (event) => {
        event.preventDefault();
        const Url = `/profile_photo/${parseInt(match.params.userId)}/`
        axiosInstance.delete(Url).then((res) => {
            window.location.reload(true);
        });
    }

    return (
            <>
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
                <Modal size="auto" show={cropModal} onHide={handleClose3} aria-labelledby="contained-modal-title-vcenter" centered>

                    <div className="postCrop">
                        <form >
                            <Cropper
                                style={{ height: 400, width: "100%", }}
                                aspectRatio={11 / 8}
                                src={cropImg.I}
                                guides={false}
                                background={true}
                                onInitialized={(instance) => {
                                    setCropper(instance);
                                }}
                                cropBoxResizable={false}
                                dragMode="move"
                                cropBoxMovable={false}
                            />
                            <div className="cropModalBottom">
                                <button className=" btn-outline-primary  mt-3 mb-3 mr-3" onClick={changes}>save changes</button>
                                <button className=" btn-outline-primary  mt-3 mb-3" onClick={cancleCrop}>close</button>
                            </div>
                        </form>
                    </div>


                </Modal>

                <Modal size="lg" className="" show={addPlantModal} onHide={() => setAddPlantModal(false)} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton className="modal-top ">
                        Add Plant
                            </Modal.Header>
                    <Modal.Header >
                        <Modal.Title>
                            <form onSubmit={handleSubmit}>

                                <label>
                                    Name 
                                </label>
                                <input required style={{ width: 770 }}
                                    name="name_text"
                                    placeholder="name of the plant"
                                    class="form-control"
                                    type="text"
                                    onChange={inputChanged}
                                />
                                <label>
                                    type
                                </label>
                                <input required style={{ width: 770 }}
                                    name="type_text"
                                    placeholder="type of the plant"
                                    class="form-control"
                                    type="text"
                                    onChange={inputChanged}
                                />

                                <label>
                                    Photo
                                </label>
                                <input required style={{ width: 770 }}

                                    class="form-control"
                                    type="file"
                                    onChange={fileSelector}
                                />
                                <label>
                                    Select bluetooth device
                                </label>
                                <input style={{ width: 600 }}
                                    class="form-control"
                                    type="text"
                                    placeholder={deviceNames.names}
                               
                                />
                                <button className="btn btn-success " onClick={nextDevice}>></button>
                                <button className="btn btn-success mt-3 center">Add Plant</button>
                            </form>

                        </Modal.Title>
                    </Modal.Header>
                </Modal>
                <Modal size="md" show={viewModal} onHide={handleClose2} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Image closeButton src={profilePhoto.data.Profile_photo }
                       
                            className="profile_img"
                            alt="upload a picture"
                            width="499"
                            height="300"
                            thumbnail
                    />
                <button className="btn btn-Success"
                    onClick={deleteProfilePhoto}
                >
                        Delete
                </button>

                </Modal>
                <div className="top-profile mt-4">
                    <Container >
                 
                        <figure className="position-relative profile">
                        <div onMouseEnter={handleView} onMouseLeave={handleClose}>
                            <Image src={error == true ? (profilePhoto.data.Profile_photo)
                                : (p)}
                                    className="profile_img"
                                    width="195"
                                    height="190"
                                    alt="upload a picture"
                                    roundedCircle 
                            />
                                {view && error && < div onClick={handleModalView} className="index_p ">Click here to view profile picture </div>}        
                            </div>
                            <figcaption>
                                    <ModalPhoto
                                        User_id={parseInt(match.params.userId)}

                                    />
                            </figcaption>
                        </figure>
                    </Container>

                    <hr className="mr-5 ml-5" />
                    {appState.loading == true ? (
                        <Spinner animation="border" />
                    )
                        :
                        (
                    <div className="detail">
                        <p className=""><i className="fa fa-user mr-3 mb-2"></i><b>{appState.user.first_name} {appState.user.last_name}</b><br/>
                                <i className="fa fa-clock-o fa-fw margin-right text-theme mr-3 mb-2"></i>{ date}<br/>
                                <i className="fa fa-envelope fa-fw margin-right text-theme mb-2"></i> {appState.user.email }</p>
                    </div>                      
                            )}
                    
                    {localStorage.getItem('current_user_id') == parseInt(match.params.userId)?(
                    <button className="btn btn-success " onClick={() => setAddPlantModal(true)}>Add Plant</button>
                        ):(null)}
                </div>
                <h3 className="ml-5 mt-5">Your Plants</h3>
                <div className="profileBody ">
                    
                    {plantsData.plant.filter(p => p.user === parseInt(match.params.userId)) === null ?
                        (<img alt="pic" src="https://i.pinimg.com/564x/39/6e/80/396e80bd90db1cb1811f3f64262d1a60.jpg"
                        className="ml-5" />)
                        : (<>
                        <Slider className="slides" {...settings} >
                        {plantsData.plant.filter(p => p.user === parseInt(match.params.userId))
                            .map((plant) =><>
                                {localStorage.getItem('current_user_id') == plant.user ? (<i className="fa fa-info-circle fa-1x"
                                    data-toggle="popover"
                                    title="Click here to delete this plant"
                                    style={{
                                        cursor: "pointer",
                                        color: "white"
                                    }}
                                    onClick={
                                        () => {
                                            if (window.confirm('Are you sure you want to delete your plant ?')) {
                                                axiosInstance.delete(`plants/${plant.id}`).then((res) => {
                                                    window.location.reload(true);
                                                });
                                            } else {
                                                // Do nothing!
                                            }
                                        }
                                    }
                                ></i>) : (null)}<strong className="ml-2"
                                    style={{
                                        color: "white"
                                    }}
                                >{plant.type_text}
                                </strong>
                                 <a href={'/plantStatus/' + `${plant.id}/`}>
                                    <div key={plant.id} className="ml-5 mr-5" >
                                        
                                        <img alt="pic" src={plant.plant_img}
                                            width="350" height="270"
                                        />
                                    
                                    </div>
                                 </a>
                                </>)}
                            </Slider></>)
                        }
                   
                </div>


                <div className="">
                   <h3 className="ml-5 mt-5">Your Posts</h3>
                    {appState.loading == true ? (
                        <Spinner animation="border" className="ml-5" />
                    ) : (
                            <Slider className="slides" {...settings} >
                            {allPostData.posts.filter((filter) => filter.user == parseInt(match.params.userId))[0] == null ? (

                                    <><p className="mt-3">No posts</p><img
                                        alt="pic"
                                        src="https://i.pinimg.com/564x/18/c8/25/18c8257fc8d68973cfcf7c50d3a66646.jpg"
                                        className="ml-5 mb-5" width="500" height="200"
                                    />
                                    </>

                            )
                                : (allPostData.posts.filter((filter) => filter.user == parseInt(match.params.userId))
                                    .map((posts) => {
                                        return <P
                                            posts={posts}
                                            user={appState.user}
                                            comment={Comment.comments}
                                        />
                                    }
                                    )
                                    )}
                            </Slider>
                        )}

                </div>

            </>
             
        );
    
}

export default Profile;