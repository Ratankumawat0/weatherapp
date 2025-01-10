import React, { useState } from "react";

const Weather = () => {
  const API_KEY = "07813c24234b45f48c162202251001"; // Your API key
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeatherData = async () => {
    if (!city.trim()) {
      alert("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");
    setWeatherData(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || "Failed to fetch weather data");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError("Failed to fetch weather data");
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Weather Application</h1>
      <div>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeatherData}>Search</button>
      </div>

      {loading && <p>Loading data…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weatherData && (
        <div className="weather-cards">
          <h2>Weather in {weatherData.location.name}</h2>
          <div className="weather-card">
            <p><strong>Temperature:</strong> {weatherData.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <p><strong>Humidity:</strong> {weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <p><strong>Condition:</strong> {weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <p><strong>Wind Speed:</strong> {weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
