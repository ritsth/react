import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Image, Modal, Container, Spinner } from 'react-bootstrap';
import ModalPhoto from './modal';
import axiosInstance from '../axios';
import p from './profileLogo.svg';
import Cropper from "react-cropper";
import $ from "jquery";

function Profile({ match }) {
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
    const [plantsData, setPlantsData] = useState({
        plant: [{ id: '', name_text: '', pub_date: '', plant_img: '', type_text: '', user: '' }],
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
        var URL = `/users/${user_id}`;
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

    }, [setAppState, setpState, setPlantsData, setNearbyDevices,setDeviceNames]);


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

    const regexp = /./g;
    const r = [...$('#own_tiles_tuple').text().matchAll(regexp)];
    const date = (new Date(appState.user.date_joined)).toString().replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/, '$1 $2 $3');
        return (
            <>

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

                    <Image closeButton src={localStorage.getItem(`photo-${parseInt(match.params.userId)}`) !==
                        localStorage.getItem(`photo-`) ? (localStorage.getItem(`photo-${parseInt(match.params.userId)}`))
                        : (process.env.PUBLIC_URL + "empty profile.png")}
                        className="profile_img"
                        alt="upload a picture"
                        thumbnail
                    />

                </Modal>
                <div className="top-profile mt-4">
                    <Container >
                    <h3 className=" mt-4 mb-4 lead mr-2" ><u>My Profile</u></h3> 
                        <figure className="position-relative profile">
                            <div onMouseEnter={handleView} onMouseLeave={handleClose}>
                                <Image src={localStorage.getItem(`photo-${parseInt(match.params.userId)}`) !==
                                    localStorage.getItem(`photo-`) ? (localStorage.getItem(`photo-${parseInt(match.params.userId)}`))
                                    : (p)}
                                    className="profile_img"
                                    width="195"
                                    height="190"
                                    alt="upload a picture"
                                    roundedCircle 
                                />
                                {view && < div onClick={handleModalView} className="index_p " style={{}}>Click here to view profile picture </div>}        
                            </div>
                            <figcaption>
                                {localStorage.getItem(`photo-`)}
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
                        <p className=""><i className="fa fa-user mr-3"></i><b>{appState.user.first_name} {appState.user.last_name}</b></p>
                        <p><i className="fa fa-clock-o fa-fw margin-right text-theme mr-3"></i>{ date}</p>
                        <p><i className="fa fa-envelope fa-fw margin-right text-theme"></i> {appState.user.email }</p>
                    </div>                      
                            )}
                    <br/>
                    <button className="btn btn-success mb-1" onClick={() => setAddPlantModal(true)}>Add Plant</button>
                </div>

                <div className="profileBody ">
                    {plantsData.plant.filter(p => p.user === parseInt(match.params.userId)) === null ?
                        (<img alt="pic" src="https://i.pinimg.com/564x/39/6e/80/396e80bd90db1cb1811f3f64262d1a60.jpg"
                        className="ml-5" />)
                        : (<>
                        
                            {plantsData.plant.filter(p => p.user === parseInt(match.params.userId))
                                .map((plant) =>
                                    <div key={plant.id} className="ml-5 mr-5"   >
                                        <a href={'/plantStatus/'+`${plant.id}/`}>
                                           <img alt="pic" src={plant.plant_img} width="350" height="270" />
                                        </a>
                                    </div>
                                )}

                        
                        </>)
                   }
                </div>
               

            </>
        );
    
}

export default Profile;