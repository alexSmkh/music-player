import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: null,
  });
  const handlePlaySong = (event) => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
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

  const timeUpdateHandler = (e) => {
    const { currentTime, duration } = e.target;
    setSongInfo({
      ...songInfo,
      currentTime,
      duration,
    });
  };

  const dragHandler = (e) => {
    const { value: currentTime } = e.target;
    audioRef.current.currentTime = currentTime;
    setSongInfo({...songInfo, currentTime})
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          type="range"
          min={0}
          max={songInfo.duration}
          onChange={dragHandler}
          value={songInfo.currentTime}
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" icon={faAngleLeft} size="2x" />
        <FontAwesomeIcon
          className="play"
          onClick={handlePlaySong}
          icon={faPlay}
          size="2x"
        />
        <FontAwesomeIcon
          className="skip-forward"
          icon={faAngleRight}
          size="2x"
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        src={currentSong.audio}
        ref={audioRef}
      />
    </div>
  );
};

export default Player;
