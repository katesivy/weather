import React, { useState } from 'react';
import axios from 'axios';

export default function Main() {
    const [zip, setZip] = useState('');
    const [city, setCity] = useState('');
    const [farenheit, setFarenheit] = useState('');
    const [feels, setFeels] = useState('');
    const [condition, setCondition] = useState('');
    const [icon, setIcon] = useState('');

    const getWeather = async (e) => {
        e.preventDefault();
        console.log('clicked', zip);
        await axios.get("https://api.openweathermap.org/data/2.5/weather?zip=" + zip + "&appid=97c1709133fbc864e7d9571b665abe73")
            .then(response => {
                populateData(response.data);
            })
            .catch(error => {
                console.log(error)
            });
    }

    

    function populateData(info) {
        console.log('populateData clicked')     
        console.log(info.cod);
        if (info.cod == 200) {
            console.log('if statement')
            setCity(info.name);
            setFarenheit(Math.round((info.main.temp * (9 / 5) - 459.67)) + "°F");         
            setFeels(Math.round((info.main.feels_like * (9 / 5) - 459.67)) + "°F");
            setCondition(info.weather[0].main);
            setIcon("http://openweathermap.org/img/wn/" + info.weather[0].icon + "@2x.png");
           
        } else {
            console.log(info.message);
            return info.message;
        }
    }


    return (
        <>
        <div className="container">
            <div className="card text-center">
                <div className="card-header display-4">
                    Today's Weather
                 </div>
                <div className="card-body text-center">
                    <h5 className="card-title text-center">Enter your zip code</h5>
                    <form onSubmit={getWeather}>
                        <div className="form-group col-lg-2 col-sm-12 offset-sm-0 text-center offset-lg-5">
                            <label htmlFor="zipCode"></label>
                            <input onChange={(e) => setZip(e.target.value)} type="input" className="form-control text-center" id="zipCode" placeholder="zip code"></input>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="card" >
                <div className="card-body">
            
                    <div className="card-header">
                        <h5 className="card-subtitle mb-2 text-muted">City: </h5>
                        <h5 className="text-primary"> {city}</h5>
                    </div>
                    <div className="card-header">
                        <h5 className="card-subtitle mb-2 text-muted">Temperature:</h5>
                        <h5 className="text-primary"> {farenheit}</h5>
                    </div>
                    <div className="card-header">
                        <h5 className="card-subtitle mb-2 text-muted">Feels like:</h5>
                        <h5 className="text-primary">  {feels}</h5>
                    </div>
                    <div className="card-header">
                        <h5 className="card-subtitle mb-2 text-muted">Condition:</h5>
                        <h5 className="text-primary">  {condition}</h5>
                    </div>
                    <img className=" " src={icon}></img>
                   


                </div>
            </div>
            </div>
        </>
    )

}
