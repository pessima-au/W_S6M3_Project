import React from "react";
import "../styles/MediaDisplay.css";

export default function MediaDisplay({ mediaType, url, title }) {
  if (!mediaType || !url) {
    return <div className="media-display">Loading media...</div>;
  }

  return (
    <div className="media-display">
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
    </div>
  );
}
