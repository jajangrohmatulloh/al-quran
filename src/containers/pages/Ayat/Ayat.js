import React, { Component } from 'react';
import ListAyat from '../../../components/atoms/ListAyat/ListAyat';
import Loader from '../../../components/atoms/Loader/Loader';

class Ayat extends Component {
    state = {
        lists: [],
        ayat: [],
        load: true
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
    render() {
        return (
            <>
                <header>{this.state.lists.englishName}</header>
                <div className="container">
                    {this.state.load && <Loader />}
                    {
                        this.state.ayat.map(list =>
                            <ListAyat ayat={list} />)
                    }
                </div>
            </>
        )
    }
}
export default Ayat;