import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuItem from '../components/MenuItem';

const Menu = () => {
    const [itens, setItens] = useState([]);

    useEffect(() => {
        const fetchMenuItems = async () => {
            const response = await axios.get('/api/menu');
            setItens(response.data);
        };
        fetchMenuItems();
    }, []);

    return (
        <div>
            <h1>Menu</h1>
            <div>
                {itens.map(item => (
                    <MenuItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Menu;