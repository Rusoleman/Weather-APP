import React, { useState, useEffect } from 'react';
import Button from './Buttons.js';
import './grid.css';
import './component-styles.css';
//═════════════════Extern════════════════════
import axios from 'axios';
import {WiCloudyGusts} from 'react-icons/wi';
import {WiRaindrop} from 'react-icons/wi';
import {WiBarometer} from 'react-icons/wi';

let flag = 0;

const Board = () =>{
    //═════════════════Weather parametters═════════════════
    const [weather, setWeather] = useState("")
    const [description, setDescription] = useState("")
    
    //═════════════════Data parametters════════════════════
    const [temperature, setTemperature] = useState("")
    const [charset, setCharset] = useState("°C")
    const [wind, setWind] = useState("")
    const [pressure, setPressure] = useState("")
    const [humidity, setHumidity] = useState("")
    const [icon, setIcon] = useState()
    const [city,setCity] = useState('')
    const [country, setCountry] = useState("")
    //═════════════════Position parametters════════════════
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")

    navigator.geolocation.getCurrentPosition(position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    });
   
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
        axios(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=de3d843f4e334cc8ca6f0f138b737231`)
            .then(response => {
                setWeather(response.data.weather[0].main)
                setDescription(response.data.weather[0].description)
                setTemperature(response.data.main.temp)
                setWind(response.data.wind.speed)
                setPressure(response.data.main.pressure)
                setHumidity(response.data.main.humidity)
                setIcon(response.data.weather[0].icon)
                setCity(response.data.name)
                setCountry(response.data.sys.country)
            })   
            .catch(err =>{
                console.log(err)
            });
    },[latitude, longitude]);

    //═════════════════Celcius to Fahrenheit═════════════════
    const handleTemperature = () =>{
        if(flag === 0){
            let farenheit = (temperature * 1.8)+32;
            let farenheitTemp = farenheit.toFixed(2);
            setCharset("°F");
            setTemperature(farenheitTemp); 
            flag++;
        }
        else if(flag >= 1){
            let celcius = (temperature - 32)* .55;
            let celciusTemp = celcius.toFixed(2);
            setCharset("°C");
            setTemperature(celciusTemp);
            flag--;
        }
    }

    return (
        <div className="container-board">
            <div className="card">
                <div className="row">
                    <div className="col-md-12 col-lg-12">
                        <div className="container-title">
                            <h1>Wheather APP</h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-lg-12">
                        <div className="container-titular">
                            <h2>{country}</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-lg-12">
                        <div className="container-titular">
                            <h2>{city}</h2>
                        </div>          
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-md-12 col-lg-12">
                        <div className="container-titular">
                            <h2>{weather}</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-lg-6">
                        <div className="container-icon">
                            <img className="sizing" src={`http://openweathermap.org/img/w/${icon}.png`}/>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="card-info">
                            <div className="container-info">
                                <h4>We have: {description}</h4>
                            </div>
                            <div className="container-info">
                                <h4><WiCloudyGusts className="icon-style"/> Wind: {wind} Km/h</h4>
                            </div>
                            <div className="container-info">   
                                <h4><WiRaindrop className="icon-style"/> Humidity: {humidity} %</h4>
                            </div>
                            <div className="container-info">
                                <h4><WiBarometer className="icon-style"/> Pressure: {pressure} mb</h4>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-lg-6">
                                    <div className="container-info">
                                        <Button content={temperature} nameFunction={handleTemperature}/>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-6">
                                    <div className="container-complement">
                                        <h3>{charset}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Board;