import React, { useEffect, useState, useRef } from 'react';
import { Card, Button, Row, Col, Image, Modal, } from 'react-bootstrap';
import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom';
import Cropper from "react-cropper";

export default function C_post(props) {
    const [cropModal, setCropModal] = useState(false);
    const handleClose3 = () => setCropModal(false);
    const [ModalState, setModalState] = useState(false);
    const [isLogedin, setIsLogedin] = useState(false)
    const history = useHistory();

    const [error, setError] = useState(true)
    const initialPostData = Object.freeze({
        user:'',
        type: '',
        status: '',
        post_img: '',
    });
    const [postData, UpdatePostData] = useState(initialPostData);
    const [plantData, setPlantData] = useState({
        plant: [{
        id: '',
        user: '',
        user_name2: '',
        name_text: '',
        type_text: '',
        pub_date: '',
        plant_img:''}]
    });
    const [cropImg, setCropImg] = useState({ I: '' });
    const [Img, setImg] = useState({ i: '' });
    const [canvas, setcanvas] = useState({ c: '' });


    const [cropper, setCropper] = useState();
    const changes = (e) => {
        e.preventDefault();
        setcanvas({ c: cropper.getCroppedCanvas() });
        setCropModal(false);
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const URL = '/posts_now/';
        const dataurl = cropper.getCroppedCanvas().toDataURL()
        canvas.c.toBlob((blob) => {
            let formData = new FormData();

            formData.append('type', postData.type);
            formData.append('status', postData.status);
            formData.append('post_img', blob,`${Img.i.name}`);
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
    const inputChanged = (event) => {
        UpdatePostData({
            ...postData,
            [event.target.name]: event.target.value.trim(),
        });
  
    }
    const fileSelector = (event) => {
        UpdatePostData({ ...postData, post_img: event.target.files[0] });

        const reader = new FileReader();
        reader.addEventListener('load', () => {
            setCropImg({ I: reader.result });
        })
        reader.readAsDataURL(event.target.files[0]);
        setImg({ i: event.target.files[0] });
        setCropModal(true);
    }
    const Select = (event) => {
        UpdatePostData({ ...postData, type: event.target.value });
    }
    const [profilePhoto, setProfilePhoto] = useState({
        data: [{
            user: '',
            Profile_photo: '',
        }]
    })
    useEffect(() => {
        axiosInstance.get(`/profile_photo/${localStorage.getItem('current_user_id')}/`).then((res) => {
            const Data = res.data;
            setProfilePhoto({ data: Data });
            console.log(profilePhoto.data);
        })
            .catch((err) => {
                if (err = 'Request failed with status code 404') {
                    setError(false)
                }
                console.log(err);
                console.log(error);
            })
        if (localStorage.getItem('current_user_id') !== null) {
            var Url = `/plants/`;
            axiosInstance.get(Url).then((res) => {
                const data = res.data;
                setPlantData({plant:data});
                console.log(res.data);
            });
        }
    }, [setPlantData]);
    return (
        <>
            <div className="card-header" >
                <a href={localStorage.getItem('current_user_id') != null ?
                    (`/profile/${localStorage.getItem('current_user_id')}`) : ('/login')}> <Image
                    alt="pic"
                    roundedCircle
                    width="47"
                    height="44"
                    className="profile_img" 
                        src={localStorage.getItem('current_user_id') !== null & error == true
                            ? (profilePhoto.data.Profile_photo)
                        : (process.env.PUBLIC_URL + "empty profile.png")} /></a>
                <big className="ml-4"
                    data-toggle="popover"
                    title="Click here to post"
                    style={{ cursor: "pointer" }}
                    onClick={localStorage.getItem('current_user_id') != null ?
                        (() => setModalState(true))
                        :
                        (() => setIsLogedin(true))}>
                    What's going on with your plants ? Post Something ...
                </big><br />
            </div>

            <Modal size="auto" show={cropModal} onHide={handleClose3} aria-labelledby="contained-modal-title-vcenter" centered>

                <div className="postCrop">
                    <form >
                        <Cropper
                            style={{ height: 400, width: "100%", }}
                            aspectRatio={11/8}
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

            <Modal size="lg" className="" show={ModalState} onHide={()=>setModalState(false)}  aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="modal-top ">
                    Add Post
                            </Modal.Header>
                <Modal.Header >
                    <Modal.Title>
                        <form onSubmit={handleSubmit}>

                            <label>
                                Type
                            </label>
                            <select class="form-select" name="type"  onChange={Select}>
                                <option selected disabled>Select your plant</option>
                                {plantData.plant.filter(p => p.user == localStorage.getItem('current_user_id')).map((plant) => 
                                    <>
                                         <option required value={plant.id}>{plant.type_text}</option>
                                    </>
                                )}
                            </select>
                      
                            <label>
                                Status
                            </label>
                            <input style={{ width: 770 }}
                                name="status"
                                placeholder="say something ..."
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
                            <button className="btn btn-success mt-3 center">Post</button>
                        </form>

                    </Modal.Title>
                </Modal.Header>
            </Modal>

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

        </>
        );
}
