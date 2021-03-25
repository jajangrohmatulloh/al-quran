import React from 'react';

const ListAyat = (props) => {
    return ( 
        <>
        <div className="rows-ayat">
            <span className="ayat">{props.ayat.numberInSurah}</span>
            <span className="quran">{props.ayat.text}</span>
        </div>
        </>
    )
}

export default ListAyat;