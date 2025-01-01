import React, { useState, useEffect } from "react";
import MediaDisplay from "./MediaDisplay";
import axios from "axios";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(21, 21, 21);
  width: 850px;
  border-radius: 8px;
  padding: 15px;

  button {
    padding: 5px 10px;
    font-size: 0.9rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #007acc;
    color: white;
    margin-bottom: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #005f99;
    }
    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  input[type="date"] {
    padding: 5px;
    font-size: 0.9rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin: 5px;
  }

  p {
    background-color: #00ffff;
    padding: 10px;
    border-radius: 8px;
  }
`;

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
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${selectedDate}`
      )
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
    <AppContainer className="app-container">
      <div className="navigation-controls">
        <button onClick={() => changeDateBy(-1)}>&lt; Previous</button>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          max={new Date().toISOString().split("T")[0]}
        />
        <button
          onClick={() => changeDateBy(1)}
          disabled={date === new Date().toISOString().split("T")[0]}
        >
          Next &gt;
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      {data ? (
        <div className="media-content">
          {/* <h2>{data.title}</h2> */}
          <MediaDisplay 
            key={data.url}
            mediaType={data.media_type}
            url={data.url}
            title={data.title}
          />
          <p>{data.explanation}</p>
        </div>
      ) : (
        !error && <div className="loading-message">Loading...</div>
      )}
    </AppContainer>
  );
}

export default App;
