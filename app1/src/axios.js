import axios from 'axios';
import React, { Component } from 'react';

const baseURL = 'https://branchappxzy.herokuapp.com/';

 const axiosInstance = axios.create({   //creating a axios instance for every other request
	baseURL: baseURL,					
	timeout: 5000,
	headers: {
		Authorization: localStorage.getItem('access_token')		//get access token for
			? 'JWT ' + localStorage.getItem('access_token')		//authorization to request data for API
			: null,
		'Content-Type': 'application/json' ,
		accept: 'application/json',							//
	},
 });
axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;

		if (typeof error.response === 'undefined') {
			alert(
				'A server/network error occurred. ' +
				'Looks like CORS might be the problem. ' +
				'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}

		if (
			error.response.status === 401 &&
			originalRequest.url === baseURL + 'token/refresh/'
		) {
			window.location.href = '/login/';
			return Promise.reject(error);
		}

		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			const refreshToken = localStorage.getItem('refresh_token');

			if (refreshToken) {
				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

				// exp date in token is expressed in seconds, while now() returns milliseconds:
				const now = Math.ceil(Date.now() / 1000);
				console.log(tokenParts.exp);

				if (tokenParts.exp > now){
					console.log('Refresh token is expired', tokenParts.exp, now);
					alert('Refresh token is expired');
				}
			} else {
				console.log('Refresh token not available.');
				alert('Refresh token not available.')

			}
		}

		// specific error handling done elsewhere
		return Promise.reject(error);
	}
);
export default axiosInstance;