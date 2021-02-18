import React from 'react';
import './app.css';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import Header from './components/Header';
import { Switch, Route } from 'react-router-dom';
  
class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Switch >
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/menu" component={Menu}></Route>
          <Route exact path="/contact" component={Contact}></Route>
          <Home />
        </Switch>

      </>
    );
  }
}

export default App;
