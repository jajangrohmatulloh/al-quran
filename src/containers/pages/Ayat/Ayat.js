import React, { Component } from 'react';
import ListAyat from '../../../components/atoms/ListAyat/ListAyat';
import Loader from '../../../components/atoms/Loader/Loader';
import pic from '../../../img/back-button.svg'

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
        prevNumber: '',
    }
    componentDidMount() {
        fetch(`http://api.alquran.cloud/v1/surah/${this.props.match.params.number}`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    lists: res.data,
                    ayat: res.data.ayahs,
                    load: false
                })
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
                    <div className="back-button" onClick={() => this.props.history.goBack()}>
                        <img src={pic} alt=""/>
                    </div>
                    {this.state.lists.englishName}
                    </header>
                <div className="container" ref={this.containerSurah}>
                    {this.state.load && <Loader />}
                    {
                        this.state.ayat.map(list =>
                            <ListAyat ayat={list} handlePlay={this.handlePlay}/>)
                    }
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