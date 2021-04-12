import React from "react";

const LibrarySong = ({ song }) => {
  return (
    <div className="library-song" key>
      <img alt={song.name} src={song.cover}></img>
      <div className="song-description">
        <h3>{song.artist}</h3>
        <h4>{song.name}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
