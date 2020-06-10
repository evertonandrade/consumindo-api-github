import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Favorito } from './components/Favorito';
import { Repositorio } from './components/Repositorio';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/repositorio' component={Repositorio} />
        <Route path='/favorito' component={Favorito} />
      </Layout>
    );
  }
}
