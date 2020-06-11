import React, { useState, useEffect } from 'react';
// import axios from 'axios';

export default function Main() {
    const [zip, setZip] = useState('');
    const [data, setData] = useState('');
    const [info, setInfo] = useState('');

    const getWeather = async (e) => {
        e.preventDefault();
        console.log('clicked', zip);
        await fetch("https://api.openweathermap.org/data/2.5/weather?zip=" + zip + "&appid=97c1709133fbc864e7d9571b665abe73")
            .then(function (resp) {
                return resp.json()
            })
            .then(function (data) {
                console.log(data);
            })
            .catch(error => {
                console.log(error)
            });
        setInfo(data);
    }

    // const city = info;
     console.log(info.data);

    return (
        <>
            <div className="card text-center">
                <div className="card-header">
                    Weather
        </div>
                <div className="card-body">
                    <h5 className="card-title">Enter your zip code</h5>
                    <form onSubmit={getWeather}>
                        <div className="form-group">
                            <label for="zipCode"></label>
                            <input onChange={(e) => setZip(e.target.value)} type="input" className="form-control text-center" id="zipCode" placeholder="zip code"></input>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">{}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

                </div>
            </div>
        </>
    )

}
