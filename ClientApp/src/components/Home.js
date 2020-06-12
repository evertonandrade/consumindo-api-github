import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LogoImg from '../assets/GithubLogo.png';
import './Home.css';

import api from '../services/api';

import './Home.css';

export class Home extends Component {
    state = {
        username: '',
        user: []
    };

    handleInput = e => {
        this.setState({ username: e.target.value });
    }

    handleSubmit = async e => {
        e.preventDefault();

        const { username } = this.state;

        const response = await api.get(`users/${username}`);

        const data = response.data;

        this.setState({
            user: data,
            username: ''
        });
    }

    render() {
        const photo = 'https://semeandoafeto.imadel.org.br/packages/trustir/exclusiva/img/user_placeholder.png';
        const { username, user } = this.state;

        return (
            <div className="logon-container">
              <section className="form">
                <img src={LogoImg} alt="Logo"/>
                <form onSubmit={this.handleSubmit}>
                    <h1>Faça seu Login</h1>
                    <input 
                        type="text" 
                        value={username}
                        placeholder="Insira um usuário do github..."
                        onChange={this.handleInput}
                    />
                    <button className="button" type="submit" >Pesquisar</button>
                </form>
              </section>
              <section className="user-section">
                <h2>Usuário: </h2>            
                    <div className="user">
                        <Link to={`/repositorio/${user.login}`}>
                            <img src={user.avatar_url ? user.avatar_url : photo} alt="Perfil"/>
                            <p>{user.login}</p>
                        </Link>
                    </div>
              </section>
            </div>
        );
    }
}
