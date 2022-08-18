import React from 'react';

const ListAyat = (props) => {
    return ( 
        <>
            {
                props.ayat.number !== 1 &&
                props.ayat.number !== 1236 &&
                props.ayat.numberInSurah === 1 &&
                <div>{props.ayat.text.substring(0, 38)}</div>
            }
        <div className="rows-ayat">
            <span className="ayat">{props.ayat.numberInSurah}</span>
            <span className="quran">
                {
                    props.ayat.number !== 1 &&
                    props.ayat.number !== 1236 &&
                    props.ayat.numberInSurah === 1 ? 
                    props.ayat.text.substring(38) : 
                    props.ayat.text
                }
                </span>
        </div>
        </>
    )
}

export default ListAyat;