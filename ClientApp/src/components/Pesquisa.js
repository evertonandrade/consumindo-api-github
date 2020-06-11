import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import './Pesquisa.css'

import api from '../services/api';

export class Pesquisa extends Component {
  state = {
    user: '',
    newRepo: '',
    repositories: [],
    loading: false,
 };

  //carregar dados do local storage
  componentDidMount() {
      const repositories = localStorage.getItem('repositories');

      if (repositories) {
          this.setState({ repositories: JSON.parse(repositories) });
      }
  }

  //salvar dados do local storage
  componentDidUpdate(_, prevState) {
      const { repositories } = this.state;
      if (prevState.repositories !== repositories) {
          localStorage.setItem('repositories', JSON.stringify(repositories));
      }
  }

  handleInputChange = e => {
      this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
      e.preventDefault();
      this.setState({ loading: true });

      const { newRepo, repositories } = this.state;
      const response = await api.get(`/repos/${newRepo}`);

      const data = {
          name: response.data.full_name,
      };

      this.setState({
          repositories: [...repositories, data],
          newRepo: '',
          loading: false,
      });
  };

  render() {
      const { newRepo, loading, repositories } = this.state;

      return (
          <div className="container-pesquisa">
              <h1>
                  <FaGithubAlt />
                  <span>Repositórios</span>
              </h1>

              <form onSubmit={this.handleSubmit}>
                  <input
                      type="text"
                      placeholder="Pesquisar repositório"
                      value={newRepo}
                      onChange={this.handleInputChange}
                  />

                  <button type="submit" loading={loading ? 1 : 0}>
                      {loading ? (
                          <FaSpinner color="#FFF" size={14} />
                      ) : (
                          <FaSearch color="#FFF" size={14} />
                      )}
                  </button>
              </form>

              <ul>
                  {repositories.map(repository => (
                      <li key={repository.name}>
                          <span>{repository.name}</span>
                          <Link
                              to={`/Repository/${encodeURIComponent(
                                  repository.name
                              )}`}
                          >
                              Detalhes
                          </Link>
                      </li>
                  ))}
              </ul>
          </div>
      );
    }
}
