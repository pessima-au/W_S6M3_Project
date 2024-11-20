import React, { useState, useEffect } from "react";
import MediaDisplay from "./MediaDisplay";
import axios from "axios";
import "../styles/styles.css";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Today's date as default

  useEffect(() => {
    const cachedData = localStorage.getItem(date);
    if (cachedData) {
      setData(JSON.parse(cachedData));
      setError(null);
    } else {
      fetchAPOD(date);
    }
  }, [date]);

  const fetchAPOD = (selectedDate) => {
    const apiKey = "z6tbGC4iWnPPopHOX0dVelXGMvdtopQXe9VlM4vO"; 

    axios
      .get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${selectedDate}`)
      .then((response) => {
        setData(response.data);
        setError(null);
        localStorage.setItem(selectedDate, JSON.stringify(response.data)); 
      })
      .catch((err) => {
        if (err.response?.status === 429) {
          setError("Rate limit exceeded. Please try again later.");
        } else {
          setError("Failed to fetch data. Please try again.");
        }
        setData(null);
      });
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const changeDateBy = (days) => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + days);
    const newDate = currentDate.toISOString().split("T")[0];
    setDate(newDate);
  };

  return (
    <div className="app-container">
      <div className="navigation-controls">
        <button onClick={() => changeDateBy(-1)}>&lt; Previous</button>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          max={new Date().toISOString().split("T")[0]}
        />
        <button onClick={() => changeDateBy(1)} disabled={date === new Date().toISOString().split("T")[0]}>
          Next &gt;
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      {data ? (
        <div className="media-content">
          {/* <h2>{data.title}</h2> */}
          <MediaDisplay mediaType={data.media_type} url={data.url} title={data.title} />
          <p>{data.explanation}</p>
        </div>
      ) : (
        !error && <div className="loading-message">Loading...</div>
      )}
    </div>
  );
}

export default App;
