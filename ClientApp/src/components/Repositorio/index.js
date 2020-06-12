import React, { Component } from 'react';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Paginacao from '../Paginacao';

import './styles.css'

import api from '../../services/api';

export class Repositorio extends Component {
    state = {
        username: '',
        userData: [],
        reposData: [],

        currentPage: 1,
        reposPerPage: 4,
        loading: true,
    }

    async componentDidMount() {
        const { match } = this.props;
        
        const [user, repositories] = await Promise.all([
            api.get(`users/${match.params.username}`),
            api.get(`users/${match.params.username}/repos`)
        ]);

        this.setState({
            userData: user.data,
            reposData: repositories.data,
            username: match.params.username,
            loading: false
        });
    }

    render() {
        const { match } = this.props;
        const { userData, reposData, currentPage, reposPerPage, username, loading } = this.state;

        const indexOfLastRepos = currentPage * reposPerPage;
        const indexOfFirstPost = indexOfLastRepos - reposPerPage;
        const currentRepos = reposData.slice(indexOfFirstPost, indexOfLastRepos);

        const paginate = (number) => this.setState({ currentPage: number });

        if (loading) {
            return <div className="loading">Carregando...</div>;
        }
        return (
            <div className="container-repositorio">
                <header>
                    <span>Seus Repositórios</span>
                    <Link to={`/pesquisa/${userData.login}`}>
                        <FaSearch color="#000" size={30} />
                    </Link>
                </header>

                <div className="user-repos">
                    <div>
                        <Link to="/">
                            <FaArrowLeft color="#000" size={30} />
                        </Link>
                    </div>
                    
                    <div className="user-info">
                        <img src={userData.avatar_url} alt="Perfil"/>
                        <span>@{userData.login} </span>
                    </div>
                    <ul className="repo-info">
                        {currentRepos.map(repositories => (
                            <li key={repositories.id}>
                                <span> {repositories.name} </span>
                                <Link
                                    to={`/detalhes/${userData.login}%2F${encodeURIComponent(
                                        repositories.name
                                    )}`}
                                >
                                    Detalhes
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <Paginacao 
                    reposPerPage={reposPerPage} 
                    totalRepos={reposData.length} 
                    paginate={paginate} 
                    username={username} 
                />
            </div>
        );
    }
}
