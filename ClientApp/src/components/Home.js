import React, { Component, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import LogoImg from '../assets/GithubLogo.png';
import './Home.css';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div className="logon-container">
            <section className="form">
                <img src={LogoImg} alt="Logo"/>
                <form>
                    <h1>Faça seu Login</h1>
                    <input 
                        placeholder="Informe seu usuário"
                    />
                    <button className="button" type="submit" >Entrar</button>
                </form>
            </section>

            {/* <img src={GithubImg} alt="Heroes"/> */}
        </div>
    );
  }
}
