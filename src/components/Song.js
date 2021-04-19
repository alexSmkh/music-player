import React from "react";

const Song = ({ currentSong, isPlaying }) => {
  return (
    <div className="song-container">
      <img
        className={`${isPlaying ? "rotate" : ""}`}
        alt={currentSong.name}
        src={currentSong.cover}
      />
      <h2>{currentSong.artist}</h2>
      <h3>{currentSong.name}</h3>
    </div>
  );
};

export default Song;
