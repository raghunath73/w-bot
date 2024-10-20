// Weather.js
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './Weather.css'; // Import the CSS file

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('Ālampur'); // Default city
    const [error, setError] = useState('');

    const apiKey = '42fe7896b3ea555aa46a0f9ec6f3977b'; // Replace with your API key

    const fetchWeatherData = useCallback(async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather`,
                {
                    params: {
                        q: city,
                        appid: apiKey,
                        units: 'metric', // For Celsius
                    },
                }
            );
            setWeatherData(response.data);
            setError(''); // Clear any previous errors
        } catch (err) {
            setError('Could not fetch weather data. Please try again.');
            setWeatherData(null); // Clear previous data on error
        }
    }, [city, apiKey]);

    useEffect(() => {
        fetchWeatherData();
    }, [fetchWeatherData]);

    // Set background based on weather condition
    const backgroundStyle = {
        backgroundImage: weatherData
            ? `url('https://source.unsplash.com/featured/?${weatherData.weather[0].description}')`
            : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        color: '#fff',
        padding: '20px',
    };

    return (
        <div style={backgroundStyle}>
            <div className="weather-container">
                <h1>Weather App</h1>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                />
                <button onClick={fetchWeatherData}>Get Weather</button>

                {error && <p className="error-message">{error}</p>}
                {weatherData && (
                    <div className="weather-info">
                        <h2>{weatherData.name}</h2>
                        <p>Temperature: {weatherData.main.temp} °C</p>
                        <p>Feels Like: {weatherData.main.feels_like} °C</p>
                        <p>Humidity: {weatherData.main.humidity} %</p>
                        <p>Weather: {weatherData.weather[0].description}</p>
                        <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                        <p>Wind Direction: {weatherData.wind.deg}°</p>
                        <p>Pressure: {weatherData.main.pressure} hPa</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Weather;
