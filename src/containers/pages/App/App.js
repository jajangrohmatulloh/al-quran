import React from 'react';
import './App.css';
import Surah from '../Surah/Surah';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Ayat from '../Ayat/Ayat';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const App = () => {
  return (
    <BrowserRouter>
      <TransitionGroup>
        <CSSTransition
          classNames="fade"
          timeout={1000}>
          <Switch>
            <Route path="/al-quran" exact component={Surah} />
            <Route path="/al-quran/:number" component={Ayat} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>

    </BrowserRouter>
  );
}

export default App;