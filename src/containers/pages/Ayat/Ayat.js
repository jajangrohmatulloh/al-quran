import React, { Component } from 'react';
import ListAyat from '../../../components/atoms/ListAyat/ListAyat';
import Loader from '../../../components/atoms/Loader/Loader';
import backButton from '../../../assets/back-button.svg';
import globe from '../../../assets/globe.svg';
import chevronDown from '../../../assets/chevron-down.svg';

class Ayat extends Component {
    constructor(props) {
        super(props);
        this.containerSurah = React.createRef();
        this.audioRef = React.createRef();

    }
    state = {
        lists: [],
        ayat: [],
        load: true,
        number: '1',
        translate: [],
        transliteration: [],
        translation: [],
    }
    componentDidMount() {
        fetch(`http://api.alquran.cloud/v1/surah/${this.props.match.params.number}/en.transliteration`)
            .then(res => res.json())
            .then(res => { 
                this.setState({
                    transliteration: res.data.ayahs
                })
                fetch(`http://api.alquran.cloud/v1/surah/${this.props.match.params.number}`)
                    .then(res => res.json())
                    .then(res => {
                        
                        this.setState({
                            lists: res.data,
                            ayat: res.data.ayahs,
                            load: false
                        })
                
                    })
                    
            })
            fetch(`http://api.alquran.cloud/v1/edition/type/translation`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    translate: res.data
                }, () => {
                    this.state.translate.forEach(i => {
                        switch (i.language) {
                            case "az": i.language = 'Azerbaijani'; break;
                            case "ar": i.language = 'Arabic'; break;
                            case "ba": i.language = 'Bashkir'; break;
                            case "bg": i.language = 'Bulgarian'; break;
                            case "bn": i.language = 'Bengali'; break;
                            case "bs": i.language = 'Bosnian'; break;
                            case "cs": i.language = 'Czech'; break;
                            case "dv": i.language = 'Divehi / Maldivian'; break;
                            case "de": i.language = 'German'; break;
                            case "en": i.language = 'English'; break;
                            case "es": i.language = 'Spanish'; break;
                            case "sq": i.language = 'Albanian / Shqiq'; break;
                            case "fa": i.language = 'Farsi'; break;
                            case "fr": i.language = 'Hamidullah'; break;
                            case "ha": i.language = 'Hausa'; break;
                            case "hi": i.language = 'Hindi'; break;
                            case "id": i.language = 'Indonesia'; break;
                            case "it": i.language = 'Italian'; break;
                            case "ja": i.language = 'Japanese'; break;
                            case "ko": i.language = 'Korean'; break;
                            case "ku": i.language = 'Kurdish'; break;
                            case "ml": i.language = 'Malayalam'; break;
                            case "ms": i.language = 'Malay'; break;
                            case "my": i.language = 'Myanmar'; break;
                            case "nl": i.language = 'Dutch'; break;
                            case "no": i.language = 'Norwegian'; break;
                            case "pl": i.language = 'Polish'; break;
                            case "pt": i.language = 'Portuguese'; break;
                            case "ro": i.language = 'Romanian'; break;
                            case "ru": i.language = 'Russian'; break;
                            case "sd": i.language = 'Sindhi'; break;
                            case "si": i.language = 'Sinhalese'; break;
                            case "so": i.language = 'Somali'; break;
                            case "sv": i.language = 'Swedish'; break;
                            case "sw": i.language = 'Swahili / Kiswahili'; break;
                            case "ta": i.language = 'Tamil'; break;
                            case "tg": i.language = 'Tajik'; break;
                            case "th": i.language = 'Thau'; break;
                            case "tr": i.language = 'Turkish'; break;
                            case "tt": i.language = 'Tatar'; break;
                            case "ug": i.language = 'Uyghur'; break;
                            case "ur": i.language = 'Urdu'; break;
                            case "uz": i.language = 'Uzbekistan'; break;
                            case "zh": i.language = 'Chinese'; break;
                        }
                    })
                    this.state.translate.sort((a, b) => {
                        let x = a.language.toLowerCase();
                        let y = b.language.toLowerCase();
                        if (x < y) {return -1;}
                        if (x > y) {return 1;}
                        return 0;
                    })
                    }
                // }
                )
            })
            
            
    }
    handlePlay = (buttonPlay) => {
        this.setState(prevState => ({
            number: buttonPlay.current.dataset.number,
            button: buttonPlay
        }), () => {
            
            const classPlay = Array.from(document.getElementsByClassName('play'))
            if (buttonPlay.current.className === 'play') {
                classPlay.forEach(i => {
                    if (i.classList.contains('pause')) 
                    i.classList.remove('pause')
                })
                buttonPlay.current.className = 'play pause';
                this.audioRef.current.play();

            } else {
                buttonPlay.current.className = 'play'
                this.audioRef.current.pause();
            }

        })
    }

    handleEnded = () => {
        const classPlay = Array.from(document.getElementsByClassName('play'))
        console.log(this.state.number)
        if(this.state.number == classPlay[classPlay.length - 1].dataset.number) {
            classPlay.forEach( i => {
                if (i.classList.contains('pause')) 
                i.classList.remove('pause')})
        this.audioRef.current.pause();
        return; }
        this.setState({number: ++this.state.number }, () => {
            console.log(classPlay[classPlay.length - 1].dataset.number)
            console.log(this.state.number)
                classPlay.forEach( i => {
                    if (i.classList.contains('pause')) 
                    i.classList.remove('pause')
                    if (i.dataset.number == this.state.number) {
                    i.classList.add('pause')
                    window.scrollTo({ top: i.offsetTop - 210, behavior: 'smooth'});
                    }
                })
            //    if(this.state.number == classPlay[classPlay.length - 1].dataset.number) {
            //     console.log('dffdh')
            //    }
            this.audioRef.current.play()
            
        })
    }

    handleGlobe = () => {
        const selectBox = document.getElementsByClassName('container-box-select')[0];
        selectBox.classList.toggle('appear');
        const fade = document.getElementsByClassName('fade')[0];
        fade.removeAttribute('style');
    }

    handleFade = (event) => {
        event.target.style.display = 'none';
        const selectBox = document.getElementsByClassName('container-box-select')[0];
        selectBox.classList.toggle('appear');
    }

    handleCancel = () => {
        const selectBox = document.getElementsByClassName('container-box-select')[0];
        selectBox.classList.toggle('appear');
        const fade = document.getElementsByClassName('fade')[0];
        fade.style.display = 'none'
    }

    handleTranslate = (event) => {
        console.log(event.target.dataset.id)
        fetch(`http://api.alquran.cloud/v1/surah/${this.props.match.params.number}/${event.target.dataset.id}`)
            .then(res => res.json())
            .then(res => { 
                this.setState({
                    translation: res.data.ayahs
                }, () => console.log(this.state.translation))
            })
            const selectBox = document.getElementsByClassName('container-box-select')[0];
            selectBox.classList.toggle('appear');
            const fade = document.getElementsByClassName('fade')[0];
            fade.style.display = 'none'
    }

    // handlePaused = () => {
    //     const classPlay = Array.from(document.getElementsByClassName('play'))
            
    //             classPlay.forEach(i => {
    //                 console.log(i)
    //                 if (i.classList.contains('pause')) 
    //                 i.classList.remove('pause')
    //             })
    // }

    // handlePlayed = () => {
    //     const classPlay = Array.from(document.getElementsByClassName('play'))
            
    //             classPlay.forEach(i => {
    //                 if (i.dataset.number == this.state.number)
    //                 i.classList.add('pause')
                    
    //             })
    // }
    render() {
        return (
            <>
                <header>
                    <div className="back-button" onClick={() => this.props.history.push('/')}>
                        <img src={backButton} alt=""/>
                    </div>
                    <div className="detail-surah">
                        <div className="surah">
                            {this.state.lists.englishName}&nbsp;<img src={chevronDown} alt=""/>
                        </div>
                        {/* <div className="ayat">
                            {this.state.lists.numberOfAyahs}&nbsp;Ayahs
                        </div>
                        <div className="juz">
                            dsfd
                        </div>
                        <div className="revelation">
                            asd
                        </div> */}
                    </div>
                    <div className="globe" onClick={this.handleGlobe}>
                        <img src={globe} alt=""/>
                    </div>
                    </header>
                <div className="container" ref={this.containerSurah}>
                    {this.state.load && <Loader />}
                    {
                        this.state.ayat.map((list, i) =>
                            <ListAyat ayat={list} 
                            surah={this.props.match.params.number} 
                            transliteration={this.state.transliteration[i]}
                            translation={this.state.translation[i]} 
                            handlePlay={this.handlePlay}/>)
                    }
                </div>
                <div className="container-box-select">
                    <div className="top-box-select">
                        <div className="cancel" onClick={this.handleCancel}>
                            <span></span>
                            <span></span>                          
                        </div>
                    </div>
                    <div class="box">
                        {this.state.translate.map(e => 
                            <div className="menu-item" data-id={e.identifier} onClick={(e) => this.handleTranslate(e)}>
                                <sup>{e.language}</sup>{e.name}
                            </div>

                        )}
                        </div>
                </div>
                <div className="fade" style={{display: 'none'}} onClick={(e) => this.handleFade(e)}>

                </div>

                <audio
                src={`https://cdn.islamic.network/quran/audio/128/ar.alafasy/${this.state.number}.mp3`}
                ref={this.audioRef}
                onEnded={this.handleEnded}
                >

                </audio>
            </>
        )
    }
}
export default Ayat;