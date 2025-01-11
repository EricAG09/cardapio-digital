import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../components/carrinho/cartContext';

const Usuario = () => {
  const [produtos, setProdutos] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/produtos');
        setProdutos(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProdutos();
  }, []);

  //adicionando pedido ao carrinho 
  const handleAddCart = (product) => {
    addToCart(product); // Usando a função do contexto para adicionar ao carrinho
    alert('Produto adicionado ao carrinho!');
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold">Produtos:</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {produtos.map((product) => (
          <div key={product._id} className="p-4 border rounded">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p>{product.description}</p>
            <p className="text-blue-500">R$ {product.price.toFixed(2)}</p>
            <button
              onClick={() => handleAddCart(product)}
              className="mt-2 bg-blue-500 text-white py-1 px-3 rounded"
            >
              Adicionar ao carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Usuario;
