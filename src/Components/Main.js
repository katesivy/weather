import React, { useState } from 'react';
import axios from 'axios';

export default function Main() {
    const [zip, setZip] = useState('');
    const [info, setInfo] = useState('');
    const [city, setCity] = useState('');
    const [farenheit, setFarenheit] = useState('');
    const [feels, setFeels] = useState('');
    const [condition, setCondition] = useState('');
    const [icon, setIcon] = useState('');


    const getWeather = async (e) => {
        e.preventDefault();
        console.log('clicked', zip);
        let info = await axios.get("https://api.openweathermap.org/data/2.5/weather?zip=" + zip + "&appid=97c1709133fbc864e7d9571b665abe73")
            .then(response => {
                setInfo(response.data)
                populateData();
            })
            .catch(error => {
                console.log(error)
            });
        console.log(info);
    }

    console.log(info);
    // console.log(info.name);
    // console.log(info.weather);
    // console.log(info.main);


    function populateData() {
        // e.preventDefault();
        // await getWeather();
        if (info.cod == 200) {
            let city = info.name;
            setCity(city);
            let farenheit = Math.round((info.main.temp * (9 / 5) - 459.67)) + "°F";
            setFarenheit(farenheit);
            let feelsFaranheit = Math.round((info.main.feels_like * (9 / 5) - 459.67)) + "°F";
            setFeels(feelsFaranheit);
            let condition = info.weather[0].main;
            setCondition(condition);
            let icon = "http://openweathermap.org/img/wn/" + info.weather[0].icon + "@2x.png";
            setIcon(icon);

        } else {
            console.log(info.message);
            return info.message;
        }
    }


    return (


        <>

            <div className="card text-center">
                <div className="card-header">
                    Weather
        </div>
                <div className="card-body text-center">
                    <h5 className="card-title">Enter your zip code</h5>
                    <form onSubmit={getWeather}>
                        <div className="form-group col-2 offset-5">
                            <label for="zipCode"></label>
                            <input onChange={(e) => setZip(e.target.value)} type="input" className="form-control text-center" id="zipCode" placeholder="zip code"></input>
                            <button type="submit" className="btn btn-primary">Submit</button>

                        </div>
                    </form>
                </div>
            </div>

            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">City: {info.name}</h5>
                   
                    <h6 className="card-subtitle mb-2 text-muted">City: {city}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Temperature: {farenheit}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Feels like: {feels}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Condition: {condition}</h6>
                    <img src={icon}></img>


                </div>
            </div>
        </>
    )

}
