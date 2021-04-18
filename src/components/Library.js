import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  setSongs,
  setCurrentSong,
  audioRef,
  isPlaying,
  libraryStatus,
  songInfo,
  setSongInfo,
}) => {
  return (
    <div className={`library ${libraryStatus ? "library-active" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            key={song.id}
            currentSong={song}
            setCurrentSong={setCurrentSong}
            songs={songs}
            setSongs={setSongs}
            audioRef={audioRef}
            isPlaying={isPlaying}
            songInfo={songInfo}
            setSongInfo={setSongInfo}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
