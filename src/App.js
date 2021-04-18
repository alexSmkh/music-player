import React, { useState, useRef } from "react";
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import Nav from "./components/Nav";
import musicData from "./data";
import "./styles/app.scss";

function App() {
  const [songs, setSongs] = useState(musicData());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: null,
    percentage: 0,
  });
  const audioRef = useRef(null);

  const songEndedHandler = async () => {
    const currentSongIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    );
    const nextSongIndex = (currentSongIndex + 1) % songs.length;
    await setCurrentSong(songs[nextSongIndex]);

    if (isPlaying) {
      audioRef.current.play();
    }
  };

  const timeUpdateHandler = (e) => {
    const { currentTime, duration } = e.target;
    const updatedPercentage = Math.round((currentTime / duration) * 100);
    setSongInfo({
      ...songInfo,
      currentTime,
      duration,
      percentage: updatedPercentage,
    });
  };

  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setSongs={setSongs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
      />
      <Library
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        audioRef={audioRef}
        libraryStatus={libraryStatus}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        src={currentSong.audio}
        ref={audioRef}
        onEnded={songEndedHandler}
      />
    </div>
  );
}

export default App;
