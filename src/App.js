import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.scss";

const App = () => {
  let [data, setData] = useState({});
  let [location, setLocation] = useState("cairo");
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(true);

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=a1b8233873812c89b743dfcf624cd755`;
  const search = async (e) => {
    try {
      if (e.key === "Enter") {
        let response = await axios.get(url);
        setData(response.data);
        setLoading(false);
        setError(null);
        setLocation("");
      }
    } catch (error) {
      console.log("error", error);
      setData({});
      setLoading(false);
      setLocation("");
      if (error.code === "ERR_BAD_REQUEST") {
        error.message = "Couldn't find this country weather";
      }
      setError(error.message);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        let response = await axios.get(url);
        setData(response.data);
        setLoading(false);
        setError(null);
        setLocation("");
      } catch (error) {
        console.log("error", error);
        setData({});
        setLoading(false);
        if (error.code === "ERR_BAD_REQUEST") {
          error.message = "Couldn't find this country weather!";
        }
        setError(error.message);
        setLocation("");
      }
    })();
  }, []);

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={(e) => search(e)}
        />
      </div>
      {loading ? (
        <div className="loading">
          <h3>Loading..</h3>
        </div>
      ) : Object.keys(data).length ? (
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              <h1>{`${data?.main && data.main.temp.toFixed()}°F` || null}</h1>
            </div>
            <div className="desc">
              <p>
                {(data.weather && data.weather[0] && data.weather[0].main) ||
                  null}
              </p>
            </div>
          </div>
          <div className="bottom">
            <div className="feels">
              <p className="bold">
                {(data.main && data.main.feels_like.toFixed()) || null}°F
              </p>
              <p>feels like</p>
            </div>
            <div className="humidity">
              <p className="bold">
                {(data.main && data.main.humidity.toFixed()) || null}%
              </p>
              <p>humidity</p>
            </div>
            <div className="wind">
              <p className="bold">
                {(data.wind && data.wind.speed.toFixed()) || null} MPH
              </p>
              <p>wind speed</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="error">
          <h3>{error}</h3>
        </div>
      )}
    </div>
  );
};

export default App;
