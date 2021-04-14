import React from "react";

const LibrarySong = ({ song, setCurrentSong, audioRef, isPlaying }) => {

  const songSelectHandler = async () => {
    await setCurrentSong(song);
    if (isPlaying) {
      audioRef.current.play();
    }
  }

  return (
    <div className="library-song" key={song.id} onClick={songSelectHandler}>
      <img alt={song.name} src={song.cover}></img>
      <div className="song-description">
        <h3>{song.artist}</h3>
        <h4>{song.name}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
