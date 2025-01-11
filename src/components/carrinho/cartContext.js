import { useContext, createContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    
    // Adiciona um produto ao carrinho
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            if (existingProduct) {
                return prevCart.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });  
    };
    
    const removeProduct = (product) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
    };
    
    return (
        <CartContext.Provider value={{ cart, addToCart, removeProduct }}>
        {children}
        </CartContext.Provider>
    );

}

export const useCart = () => useContext(CartContext);