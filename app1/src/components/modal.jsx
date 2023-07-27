import { Card, Button, Row, Col, Image, Modal, } from 'react-bootstrap';
import React, { Component, useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom';
import Cropper from "react-cropper";



export default function ModalPhoto({ User_id }) {
    const [show, setShow] = useState(false);
    const [view, setView] = useState(false);
    const [cropModal, setCropModal] = useState(false);
    const handleClose = () => setShow(false);
    const handleClose3 = () => setCropModal(false);
    const handleShow = () => setShow(true);
    const handleView = () => setView(true);
    const initialFormData = Object.freeze({
        user_id: `${localStorage.getItem('current_user_id')}`,
        Profile_photo: '',
        photo_no: ''
    });


    const [cropImg, setCropImg] = useState({I:''});    
    const [Img, setImg] = useState({i:''});    

    const [cropData, setCropData] = useState(initialFormData);
    const [cropper, setCropper] = useState();

    const [error, setError] = useState(false)
    const fileSelector = (event) => {

        const reader = new FileReader();
        reader.addEventListener('load', () => {
            setCropImg({ I: reader.result });
        })
        reader.readAsDataURL(event.target.files[0]);
        setImg({ i: event.target.files[0] });
        setCropModal(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const dataurl = cropper.getCroppedCanvas().toDataURL()
        axiosInstance.get(`/profile_photo/${User_id}/`).then((res) => {
            const Data = res.data;
        }).catch((err) => {
            if (err = 'Request failed with status code ') {
                setError(true)
            }
            console.log(error)
        })
        cropper.getCroppedCanvas().toBlob((blob) => {
            const formData = new FormData();
            const URL = '/profile_photo/';
            const Url =`/profile_photo/${User_id}/`;
            formData.append('Profile_photo', blob, `${Img.i.name}`);
            console.log(blob);

            if ( error == true) {
                axiosInstance
                    .post(URL, formData)
                    .then((res) => {
                        console.log(res.data);
                        const data = res.data;
                        setCropData({ cropData: data });
                        window.location.reload(true);
                    })
                    .catch((err) => console.log(err));
            } else {
                axiosInstance
                    .put(Url, formData)
                    .then((res) => {
                        console.log(res.data);
                        const data = res.data;
                        setCropData({ cropData: data });
                        window.location.reload(true);
                    })
                    .catch((err) => console.log(err));
            };
        })
    }

    const cancleCrop = (e) => {
        e.preventDefault();
        cropper.destroy();
        setCropModal(false);

    }
    return (
        <>         
            {localStorage.getItem('current_user_id') == User_id ?
                (<>
                <Button  variant="" onClick={handleShow} data-toggle="popover"
                        title="upload photo">
                <i className="fa fa-camera circle-icon"> </i>
                    </Button>
                 
                </>):
                (
                   null
                )
            }

        

            <Modal size="auto" show={cropModal} onHide={handleClose3} aria-labelledby="contained-modal-title-vcenter" centered>

                <div className="profileCrop">
                    <form >
                        <Cropper 
                        style={{ height: 400, width: "100%", }}
                        aspectRatio={1}
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
                            <button className=" btn-outline-primary  mt-3 mb-3 mr-3" onClick={handleSubmit}>upload photo</button>
                            <button className=" btn-outline-primary  mt-3 mb-3" onClick={cancleCrop}>close</button>
                        </div>
                    </form>
             
                </div>    
             
            </Modal>

            <Modal size="lg" show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="modal-top ">
                    <Modal.Title>Upload a photo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >
                            <label>
                                Choose a profile photo
                                    </label>
                            <input required style={{ width: 770 }}

                                class="form-control"
                                type="file"
                                onChange={fileSelector}
                            />
                        
                    </form>
                </Modal.Body>
                <Modal.Footer>
             
                </Modal.Footer>
            </Modal>
        </>
    );
}

