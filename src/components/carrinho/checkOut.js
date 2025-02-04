// src/context/CartContext.js
import React, { createContext, useContext, useState } from 'react';

// Criação do contexto do carrinho
const CartContext = createContext();

// Hook para usar o contexto do carrinho
export const useCart = () => {
    return useContext(CartContext);
};

// Provedor do contexto do carrinho
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]); // Estado do carrinho

    // Função para adicionar um produto ao carrinho
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item._id === product._id);
            if (existingProduct) {
                // Se o produto já existe no carrinho, aumente a quantidade
                return prevCart.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            // Se o produto não existe, adicione-o ao carrinho com quantidade 1
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    // Função para remover um produto do carrinho
    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item._id !== id));
    };

    // Função para limpar o carrinho
    const clearCart = () => {
        setCart([]);
    };

    // Retorna o contexto do carrinho com as funções e o estado
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};