import React, { useEffect, useState, useRef } from 'react';
import { Card, Button, Row, Col, Image, Modal, Spinner } from 'react-bootstrap';
import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom';

function PlantStatus({match}) {
    
    const [humidityState, sethumidityState] = useState({
        data: [{
            humidity: '',
        }]
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const add = parseInt(match.params.userId)
        axiosInstance.get(`/humidity/${add}/`).then((res) => {
            const Data = res.data;
            sethumidityState({ data: Data })
            setLoading({ loading: false })
            console.log(Data);
        });
        const interval = setInterval(() => {
            const Url = `/humidity/${add}/`;
            axiosInstance.put(Url).then((res) => {
                const Data = res.data;
                sethumidityState({ data: Data })
                setLoading({ loading: false })
                localStorage.setItem(`${add}`, Data.humidity);
                console.log(Data);
            });
        }, 20000);
        return () => clearInterval(interval);

    }, [ sethumidityState, setLoading]);

    return (<>
        {loading == true ? (<>
            <Spinner animation="border" />
            {localStorage.getItem('22')}
        </>)
            :
            (<>
                {humidityState.data.humidity}
            </>)}
    
    </>);
}
export default PlantStatus