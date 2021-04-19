import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  songs,
  setSongs,
  setCurrentSong,
  currentSong,
}) => {
  const trackAnim = {
    transform: `translateX(${songInfo.percentage}%)`,
  };
  const trackInputBackground = {
    background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
  };

  const activeLibraryHandler = (nextSong) => {
    const updatedSongs = songs.map((song) => {
      return {
        ...song,
        active: song.id === nextSong.id,
      };
    });
    setSongs(updatedSongs);
  };

  const handlePlaySong = (event) => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const skipTrackHandler = async (direction) => {
    const currentSongIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    );

    let newSongIndex;
    if (direction === "skip-forward") {
      newSongIndex = (currentSongIndex + 1) % songs.length;
    } else if (direction === "skip-back") {
      if ((currentSongIndex - 1) % songs.length === -1) {
        newSongIndex = songs.length - 1;
      } else {
        newSongIndex = currentSongIndex - 1;
      }
    }

    const nextSong = songs[newSongIndex];
    activeLibraryHandler(nextSong);
    await setCurrentSong(nextSong);
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  const getTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.round(time % 60);
    return [
      hours,
      minutes > 9 ? minutes : "0" + minutes,
      seconds > 9 ? seconds : "0" + seconds,
    ]
      .filter(Boolean)
      .join(":");
  };

  const dragHandler = (e) => {
    const { value: currentTime } = e.target;
    audioRef.current.currentTime = currentTime;
    setSongInfo({ ...songInfo, currentTime });
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div className="track" style={trackInputBackground}>
          <input
            type="range"
            min={0}
            max={songInfo.duration || 0}
            onChange={dragHandler}
            value={songInfo.currentTime}
          />
          <div className="animate-track" style={trackAnim}></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "00:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          icon={faAngleLeft}
          size="2x"
          onClick={() => skipTrackHandler("skip-back")}
        />
        <FontAwesomeIcon
          className="play"
          onClick={handlePlaySong}
          icon={isPlaying ? faPause : faPlay}
          size="2x"
        />
        <FontAwesomeIcon
          className="skip-forward"
          icon={faAngleRight}
          size="2x"
          onClick={() => skipTrackHandler("skip-forward")}
        />
      </div>
    </div>
  );
};

export default Player;
