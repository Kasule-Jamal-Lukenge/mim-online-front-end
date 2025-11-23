import React, { createContext, useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart):[];
    });

    //persisting to local storage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((prev) => {
            const existing = prev.find((item)=>item.id === product.id);
            if(existing){
                return prev.map((item) =>item.id === product.id ? { ...item, quantity: quantity+1} : item);
            }else{
                return [...prev, { ...product, quantity:1}];
            }
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
        toast.error("Product Removed From Cart");
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const updateQuantity = (id, quantity) => {
        if(quantity <= 0){
            removeFromCart(id);
            return;
        }
        setCartItems((prev) => prev.map((item) => item.id === id ? { ...item, quantity} : item));
    };

    return(
        <CartContext.Provider value={{cartItems, addToCart, removeFromCart, updateQuantity, totalItems}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);