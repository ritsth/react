import GoogleTrends from './components/googleTrends';
import React, { Component } from 'react';



export default function Google({ SearchWord }) {
    
    
    return (
        <>

            <h1 className="mx-5 my-4"> Google Trends Result</h1>
            <p>
                
            </p>
            <div id="widget">
                <GoogleTrends
                    type="TIMESERIES"
                    keyword={SearchWord}
                    url="https://ssl.gstatic.com/trends_nrtr/2051_RC11/embed_loader.js"
                />
                
            </div>
        </>
    );
}
