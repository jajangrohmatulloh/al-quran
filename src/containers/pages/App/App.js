import React from 'react';
import './App.css';
import '../../../materialize.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Surah from '../Surah/Surah';
import Ayat from '../Ayat/Ayat';

function App() {
  return (
    <BrowserRouter>
      <TransitionGroup>
        <CSSTransition classNames="fade" timeout={1000}>
          <Switch>
            <Route path="/" exact component={Surah} />
            <Route path="/surah/:number" component={Ayat} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </BrowserRouter>
  );
}

export default App;
