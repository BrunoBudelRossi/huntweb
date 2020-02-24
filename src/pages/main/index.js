import React, { Component } from 'react';
import api from '../../services/api';
import './style.css';
import { Link } from 'react-router-dom';

export default class Main extends Component {
  state = {
    products: [],
    productInfo: {},
    page: 1
  };

  componentDidMount(){
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);

    const { docs, ...productInfo} = response.data;

    this.setState({products: docs, productInfo, page}); // armazena novos estados a cada alteração
  };
  
  prevPage = () => {
    const { page } = this.state;
    if(page === 1) return;

    const pageNumber = page - 1;

    this.loadProducts(pageNumber);
    
  }

  nextPage = () => {
    const { page, productInfo } = this.state;
    if(page === productInfo.pages) return;

    const pageNumber = page + 1;

    this.loadProducts(pageNumber)
  }

  // toda vez que um map for realizado, é necessário incluir um key no seu objeto resultante
  // note que o metodo render "ouve" toda a alterção realizada no state
  render(){
    const { products, productInfo, page } = this.state; // apenas para evitar de ter que escrever this.state.products, deste jeito é so products

    return (
      <div className="productList">
        { products.map(product => (
          <article key={product._id} >
            <strong>{product.title}</strong>
            <p>{product.description}</p>
            <Link to={`/products/${product._id}`}>Access</Link>
          </article>
        ))}
        <div className="actions">
          <button disabled={page === 1} onClick={this.prevPage}>Previous</button>
          <button disabled={page === productInfo.pages} onClick={this.nextPage}>Next</button>
        </div>
      </div>
    );
  }
}
