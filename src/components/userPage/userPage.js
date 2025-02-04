// src/components/UserPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

function UserPage() {
    const { addToCart } = useCart();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('http://localhost:5000/api/users'); // URL da sua API
            setUsers(response.data);
        };
        fetchUsers();
    }, []);

    return (
        <div className="user-page">
            <h1>Usuários</h1>
            <div className="user-cards">
                {users.map(user => (
                    <div key={user._id} className="user-card">
                        <img src={user.photo} alt={user.name} />
                        <h2>{user.name}</h2>
                        <p>{user.description}</p>
                        <p>Preço: R$ {user.price}</p>
                        <button onClick={() => addToCart(user)}>Adicionar ao Carrinho</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserPage;