import React from 'react';
import { useCart } from './cartContext';

const Product = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product); // Adiciona o produto ao carrinho
  };

  return (
    <div>
      <h3>{product.name}</h3>
      <p>Preço: R$ {product.price.toFixed(2)}</p>
      <button onClick={handleAddToCart}>Adicionar ao carrinho</button>
    </div>
  );
};

export default Product;
