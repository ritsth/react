import React, { useEffect, useState, useRef } from 'react';
import axiosInstance from '../axios';
import { Card, Button, Row, Col, Image, Modal, Container, ListGroup, OverlayTrigger, Popover, Dropdown, } from 'react-bootstrap';
import axios from 'axios';
import p from './profileLogo.svg';

export default function No_results({  }) {

    return (

        <>
            <div className="h3">
           No posts availabe on searched plant type 
            </div>
        </>
    );

}