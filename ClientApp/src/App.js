import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Favorito } from './components/Favorito';
import { Repositorio } from './components/Repositorio';
import { Pesquisa } from './components/Pesquisa'

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/repositorio/:username' component={Repositorio} />
        <Route path='/pesquisa/:username' component={Pesquisa} />
        <Route path='/favorito' component={Favorito} />
      </Layout>
    );
  }
}
