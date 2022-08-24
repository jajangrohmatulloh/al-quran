import React, { Component } from 'react';
import ListSurah from '../../../components/atoms/ListSurah/ListSurah';
import Loader from '../../../components/atoms/Loader/Loader';

class Surah extends Component {
    state = {
        lists: [],
        load: true
    }
    componentDidMount() {
        fetch(`http://api.alquran.cloud/v1/surah`)
          .then(res => res.json())
          .then(res => {
              this.setState({
                  lists: res.data,
                  load: false
                })
          })
    }
    handleClick = (id) => {
        this.props.history.push(`/surah/${id}`)
    }
    render() {
        return (
            <>
            <header>Surah</header>
            <div className="container">
                {this.state.load && <Loader />}
                {
                this.state.lists.map(list => 
                    <ListSurah data={list} goDetail={this.handleClick}/>
                    )
                }
            </div>
            </>
        )
    }
}
export default Surah;