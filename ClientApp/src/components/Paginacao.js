import React from 'react';
import { Link } from 'react-router-dom';
import './Paginacao.css'

const Paginacao = ({ reposPerPage, totalRepos, paginate, username }) => {
    const numberPages = [];

    for(let i = 1; i <= Math.ceil(totalRepos / reposPerPage ); i++) {
        numberPages.push(i);
    }
    
    return (
        <div className="skin-primary-color">
                <ul className="pagination">
                    {numberPages.map(number => (
                        <li key={number} className="page-item">
                            <Link onClick={() => paginate(number)} to={`/repositorio/${username}`} className="page-link">
                                {number}
                            </Link>
                        </li>
                    ))}
                </ul>
        </div>
    )
}

export default Paginacao;