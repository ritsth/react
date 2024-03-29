
import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom';

export default function Logout() {
	const history = useHistory();
	

	useEffect(() => {
		const response = axiosInstance.post('logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		});
		localStorage.removeItem('current_user')
		localStorage.removeItem('current_user_id')
	
		
		axiosInstance.defaults.headers['Authorization'] = null;
		history.push('/login');
		window.location.reload(true);
	});
	return <div>Logout</div>;
}