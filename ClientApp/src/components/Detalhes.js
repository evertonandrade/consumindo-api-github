import React, { Component } from "react";
import { GoRepo } from "react-icons/go";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";

import api from "../services/api";

import "./Detalhes.css";

export class Detalhes extends Component {
  static propTypes = {
    match: Proptypes.shape({
      params: Proptypes.shape({
        repository: Proptypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    loading: true,
  };

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);
    const [ repository ] = await Promise.all([
      api.get(`/repos/${repoName}`)
    ]);

    this.setState({
      repository: repository.data,
      loading: false,
    });
  }

  render() {
    const { repository, loading } = this.state;

    if (loading) {
      return <div className="loading"> Carregando...</div>;
    }
    return (
      <div className="container-detalhes">
        <Link to={`/repositorio/${repository.owner.login}`} > Voltar aos repositórios</Link>
        <div className="owner">  
          <h1>
            <GoRepo color="#000" size={50} />
               {repository.name}
            <div className="repo-autor">
              <img src={repository.owner.avatar_url} alt={repository.owner.login} />
              <span>@{repository.owner.login}</span>
            </div>
          </h1>
          <p>{repository.description ? repository.description : "..."}</p>
          <span className="repo-language">Linguagem: {repository.language}</span>
          <span className="repo-up">Atualizado em: {repository.updated_at}</span>
        </div>
      </div>
    );
  }
}
