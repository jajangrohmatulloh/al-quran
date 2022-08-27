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
        transliteration: [],
        translate: []
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
                }, () => console.log(this.state.translate[1]))
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
                    <div className="globe" onClick={() => this.props.history.goBack()}>
                        <img src={globe} alt=""/>
                    </div>
                    </header>
                <div className="container" ref={this.containerSurah}>
                    {this.state.load && <Loader />}
                    {
                        this.state.ayat.map((list, i) =>
                            <ListAyat ayat={list} transliteration={this.state.transliteration[i]} surah={this.props.match.params.number} handlePlay={this.handlePlay}/>)
                    }
                </div>
                <div className="container-box-select">
                    <div className="top-box-select">
                    </div>
                    <div class="box">
                        {this.state.translate.map(e => 
                            <div className="menu-item">
                                {e.language}:{e.name}
                            </div>

                        )}
                        </div>
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