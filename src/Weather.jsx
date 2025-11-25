import React, { useRef, useState, useEffect } from "react";
import "./Weather.css";
import { getWeatherData } from "./api";

function Weather() {
  const [details, setDetails] = useState(null);
  const [error, setError] = useState("");
  const [cityName, setCityName] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const getData = async () => {
    if (!cityName.trim()) {
      setError("Please enter a city name");
      setDetails(null);
      inputRef.current.focus();
      return;
    }

    inputRef.current.blur();

    try {
      const data = await getWeatherData(cityName);
      if (data.cod === "404") {
        setError("City not found...!");
        setDetails(null);
        return;
      }
      setDetails(data);
      setError("");
      setCityName("");
    } catch (error) {
      setError("City not found...!");
      setDetails(null);
      inputRef.current.focus();
      setCityName("");
    } finally {
      setCityName("");
    }
  };

  const getEmoji = (id) => {
    switch (true) {
      case id >= 200 && id < 300:
        return "⛈️";
      case id >= 300 && id < 400:
        return "🌧️";
      case id >= 500 && id < 600:
        return "🌦️";
      case id >= 600 && id < 700:
        return "❄️";
      case id >= 701 && id < 800:
        return "☁️";
      case id === 800:
        return "🌞";
      case id >= 801 && id < 810:
        return "⛅";
      default:
        return "❓";
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <div className="weather-container">
        <div className="search-area">
          <input
            className="search-input"
            ref={inputRef}
            type="text"
            placeholder="Enter City Name..."
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getData();
              }
              inputRef.current.blur();
            }}
          />
          <button onClick={getData}>
            <span className="full-text">Get Weather</span>
            <span className="short-text">🔍</span>
          </button>
        </div>
        {error && <div className="error">{error}</div>}

        {details && (
          <div className="weather-details">
            <div className="city-name">{details.name}</div>
            <div className="temp-display">
              {(details.main?.temp - 273.15).toFixed(0)} °C
            </div>
            <div className="humidity-display">
              Humidity: {details.main?.humidity}%
            </div>
            <div className="desc-display">
              {details?.weather[0]?.description}
            </div>
            <div className="weather-emoji">
              {getEmoji(details?.weather[0]?.id)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
