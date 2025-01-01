import React from "react";
import styled from "styled-components"

const MediaDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 750px;
  margin: 20px auto;
  padding: 10px;
  background-color:rgb(0, 0, 0);
  border-radius: 10px;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  transition: transform 0.3s ease;
  /* border: 9px solid white; */
  &:hover {
    transform: translateY(-10px);
  }

  img,
  iframe {
    max-width: 100%;
    border-radius: 10px;
  }

  .media-title { 
    font-size: 1.5rem;
    margin-top: 10px;
    color: #fff;
    text-align: center;
    font-weight: bold;
    padding: 20px;
  }

  .media-display .loading-text {
    font-size: 1.2rem;
    color: #888;
    text-align: center;
  }
`;

export default function MediaDisplay({ mediaType, url, title }) {
  if (!mediaType || !url) {
    return <div className="media-display">Loading media...</div>;
  }

  return (
    <MediaDisplayContainer className="media-display">
      {mediaType === "image" ? (
        <img
          src={url}
          alt={title}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x200?text=Image+Not+Found";
          }}
        />
      ) : (
        <iframe
          className="media-video"
          src={url}
          title={title}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          onError={(e) => {
            console.error("Error loading video:", e);
          }}
        />
      )}

      <h2 className="media-title">{title}</h2>
    </MediaDisplayContainer>
  );
}
