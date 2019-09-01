import React, { Component } from "react";
import api from '../../services/api';
import { Link   } from 'react-router-dom';

import  './styles.css';


export default class Main extends Component {
    state = {
        commics: [],
        pagination: {},
        offset: 0
    }

    componentDidMount() {
        this.loadCommics();
    }

    loadCommics = (NextOrPrevPage = 0) => {
        const publicKey = '036d15a4da09be6999ad6e15972ef82f'
        const privateKey = '2e2f78c79ecb62a1b0f48e2f055c9c5ac8589114';
        const timestamp = Number(new Date());
        const hash = require('md5');
        let hashMd5 = hash(timestamp + privateKey + publicKey);
        api.get(`characters?ts=${timestamp}&apikey=${publicKey}&hash=${hashMd5}&offset=${NextOrPrevPage}`)
            .then(({data}) => {
                const { results, ...pagination } = data.data;
                this.setState({ commics: results, pagination });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    prevPage = () => {
        const { offset } = this.state;
        if(offset < 0)  {
           return this.loadCommics(0);
        }
        let pageNumber = offset + 20;
        this.setState({  offset: pageNumber });
        this.loadCommics(offset);
    }
    nextPage = () => {
        const { offset, pagination } = this.state;
        
        if(offset === pagination.total) return;
        let pageNumber = offset + 20;
        this.setState({  offset: pageNumber });
        this.loadCommics(offset);
    }

    render() {
        const { commics } = this.state;

        return (
            <main className="main-content">  
                <div className="commics-list">
                    {commics.map(item => ( 
                        <article key={item.id} className="commic-container">
                            <div className="commic-img">
                                <img src={`${item.thumbnail.path}.jpg`} alt={item.name} />
                            </div>
                            <div className="commic-info">
                                <strong>{item.name}</strong>
                                <p>{item.description}</p>
                            </div>
                            <Link to={`/commic/${item.id}`}>Acessar</Link>
                        </article>
                    ))}
                </div>
                <div className="actions">
                    <button onClick={this.prevPage}>Anterior</button>
                    <button onClick={this.nextPage}>Próximo</button>
                </div>
            </main>
        )
    }
}