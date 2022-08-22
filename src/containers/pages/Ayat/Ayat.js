import React, { Component } from 'react';
import ListAyat from '../../../components/atoms/ListAyat/ListAyat';
import Loader from '../../../components/atoms/Loader/Loader';

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
        number: '1'
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
        // this.buttonPlay = buttonPlay;
        // console.log(this.buttonPlay.current)
        this.setState({number: buttonPlay.current.dataset.number}, () => {
            this.audioRef.current.play();

        })
        // this.audioRef.current.src = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${buttonPlay.current.dataset.number}.mp3`;
    }
    handleEnded = () => {

        // this.buttonPlay = 
        // this.audioRef.current.src = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${parseInt(this.buttonPlay.current.dataset.number) + 1}.mp3`
        this.setState({number: ++this.state.number }, () => {
            this.audioRef.current.play()
        })
    }
    render() {
        return (
            <>
                <header>{this.state.lists.englishName}</header>
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