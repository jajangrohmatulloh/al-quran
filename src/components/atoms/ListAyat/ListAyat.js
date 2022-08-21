import React from 'react';

const ListAyat = (props) => {
    function toFarsiNumber(n) {
        const farsiDigits = ['۰', '۱', '۲', '۳', '٤', '۵', '٦', '۷', '۸', '۹'];
    
        return n
            .toString()
            .replace(/\d/g, x => farsiDigits[x]); 
    }
    return ( 
        <>
            {
                props.ayat.number !== 1 &&
                props.ayat.number !== 1236 &&
                props.ayat.numberInSurah === 1 &&
                <div className="bismillah">
                    <span>{props.ayat.text.substring(0, 38)}</span>
                </div>
            }
        <div className="rows-ayat">
            <span className="numberAyat">{toFarsiNumber(props.ayat.numberInSurah)}</span>
            <span className="ayat">
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