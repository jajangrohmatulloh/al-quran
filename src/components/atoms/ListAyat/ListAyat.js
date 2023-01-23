import React from 'react';
import { useRef } from 'react';

const ListAyat = (props) => {
  const button = useRef();
  const audio = useRef();

  function toFarsiNumber(n) {
    const farsiDigits = ['۰', '۱', '۲', '۳', '٤', '۵', '٦', '۷', '۸', '۹'];

    return n.toString().replace(/\d/g, (x) => farsiDigits[x]);
  }

  function handlePlay() {
    if (button.current.className === 'play') {
      button.current.className = 'play pause';
      audio.current.play();
    } else {
      button.current.className = 'play';
      audio.current.pause();
    }
    console.log(button);
  }

  const handleEnded = () => {
    button.current.className = 'play';
    audio.current.src = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${++props
      .ayat.number}.mp3`;
    audio.current.play();
  };

  return (
    <>
      {props.ayat.number !== 1 &&
        props.ayat.number !== 1236 &&
        props.ayat.numberInSurah === 1 && (
          <div className="bismillah">
            <span>{props.ayat.text.substring(0, 38)}</span>
          </div>
        )}
      <div className="rows-ayat">
        <div className="numberAyat">
          <span>
            {toFarsiNumber(props.surah)}:
            {toFarsiNumber(props.ayat.numberInSurah)}
          </span>
        </div>
        <div className="container-audio">
          <div className="circle" onClick={() => props.handlePlay(button)}>
            <div
              className="play"
              ref={button}
              data-number={props.ayat.number}
            ></div>
          </div>
        </div>
        <span className="ayat">
          {props.ayat.number !== 1 &&
          props.ayat.number !== 1236 &&
          props.ayat.numberInSurah === 1
            ? props.ayat.text.substring(38)
            : props.ayat.text}
        </span>
        <div className="transliteration">
          {props.transliteration.text}
          {props.translation && (
            <>
              <br></br>
              <br></br>
              {props.translation.text}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ListAyat;
