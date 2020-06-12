import React, { Component } from 'react';
import { FaSpinner, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import './Pesquisa.css'

import api from '../services/api';

export class Pesquisa extends Component {
  state = {
    username: '',
    newRepo: '',
    repositories: [],
    loading: false,
 };

  handleInputChange = e => {
      this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
      e.preventDefault();
      this.setState({ loading: true });

      const { newRepo, repositories } = this.state;
      const { match } = this.props
      const response = await api.get(`/repos/${match.params.username}/${newRepo}`);

      const data = {
          name: response.data.full_name,
      };

      this.setState({
          repositories: [...repositories, data],
          newRepo: '',
          loading: false,
          username: match.params.username
      });
  };

  render() {
      const { newRepo, loading, repositories } = this.state;

      return (
          <div className="container-pesquisa">
              <div className="container-exibicao">
                <h1>
                    <span>Pesquisar Repositórios</span>
                </h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="Digite o nome do repositório..."
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
                                to={`/detalhes/${encodeURIComponent(
                                    repository.name
                                )}`}
                            >
                                Detalhes
                            </Link>
                        </li>
                    ))}
                </ul>
              </div>
          </div>
      );
    }
}
