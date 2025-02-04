// src/components/Cart.js
import React from 'react';
import { useCart } from '../../context/cartContext';
import { finishPurchase } from '../finishPurchase';

const Cart = ({ isOpen, onClose }) => {
    const { cart, removeFromCart, clearCart } = useCart();

    const handleRemove = (id) => {
        removeFromCart(id);
    };

    const handleClear = () => {
        clearCart();
    };

    return (
        <div className={`fixed inset-y-0 right-0 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} bg-white w-80 shadow-lg p-4`}>
            <h2 className="text-xl font-bold">Carrinho</h2>
            {cart.length === 0 ? (
                <p>O carrinho está vazio.</p>
            ) : (
                <div>
                    <ul>
                        {cart.map(item => (
                            <li key={item._id} className="flex justify-between items-center border-b py-2">
                                <div>
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p>Preço: R$ {item.price}</p>
                                    <p>Quantidade: {item.quantity}</p>
                                </div>
                                <button
                                    onClick={() => handleRemove(item._id)}
                                    className="bg-red-500 text-white py-1 px-3 rounded"
                                >
                                    Remover
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 flex justify-between">
                        <button
                            onClick={handleClear}
                            className="bg-gray-500 text-white py-1 px-3 rounded"
                        >
                            Limpar Carrinho
                        </button>
                        <button
                            onClick={() => finishPurchase(cart)}
                            className="bg-blue-500 text-white py-1 px-3 rounded"
                        >
                            Finalizar Compra
                        </button>
                    </div>
                </div>
            )}
            <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                Fechar
            </button>
        </div>
    );
};

export default Cart;