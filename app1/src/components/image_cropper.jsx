
import React, { Component } from 'react';
import { Card, Button, Row, Col, Image, Modal, } from 'react-bootstrap';
import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom';
import Cropper from "cropperjs";

export default class ImageCropper extends Component{
    constructor() {
        super();
        this.state = {
            imageDestination: " ",
            src:""
        };
        this.imageElement = React.createRef();
    }
    componentDidMount() {
  
        const cropper = new Cropper(this.imageElement.current, {
            zoomable: true,
            scalable: false,
            aspectRatio: 1,
            
        });

    }
    fileSelector = (event) => {
        event.preventDefault();
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            this.setState({ src: reader.result });
        })
        reader.readAsDataURL(event.target.files[0]);
    }
    render(){
        return (
            <div>

                <input type="file" onChange={this.fileSelector} />

                    <div class="img-container">
                        <img ref={this.imageElement} src={this.state.src} alt="Source" crossorigin />
                    </div>
  
                </div>
            );  
    }
}