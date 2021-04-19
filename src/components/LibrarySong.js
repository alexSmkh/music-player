import React from "react";

const LibrarySong = ({
  songs,
  setSongs,
  currentSong,
  setCurrentSong,
  audioRef,
  isPlaying,
}) => {
  const selectedClass = currentSong.active ? "selected" : "";

  const songSelectHandler = async () => {
    await setCurrentSong(currentSong);

    if (isPlaying) {
      audioRef.current.play();
    }

    const updatedSongs = songs.map((song) => {
      return {
        ...song,
        active: song.id === currentSong.id,
      };
    });
    setSongs(updatedSongs);
  };

  return (
    <div
      className={`library-song ${selectedClass}`}
      onClick={songSelectHandler}
    >
      <img alt={currentSong.name} src={currentSong.cover}></img>
      <div className="song-description">
        <h3>{currentSong.name}</h3>
        <h4>{currentSong.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
