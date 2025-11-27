import React, { createContext, useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";

const CartContext = createContext();
let toastShown = false;

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart):[];
    });

    //Persisting To Local Storage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, confirmIncrease = false) => {
        let alreadyExists = false;

        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);

            if (existing) {
                alreadyExists = true;

                if (!confirmIncrease) {
                    return prev; // skip update until user confirms
                }

                return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
            return [...prev, { ...product, quantity: 1 }];
            }
        });

        return alreadyExists; // return flag
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
        toast.error("Product Removed From Cart");
    };

    const totalItems = cartItems.length;

    const updateQuantity = (id, quantity) => {
        setCartItems((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    // Preventing The Quantity From Reducing Below 1 And Showing Toast Once
                    if (item.quantity === 1 && quantity < 1) {
                        if (!toastShown) {
                            toast.error("To Remove This Item, Please Click The Remove Button.");
                            toastShown = true;
                            // Resetting toastShown flag
                            setTimeout(() => (toastShown = false), 500); 
                        }
                        return item;
                    }
                    return { ...item, quantity: Math.max(1, quantity) };
                }
                return item;
            })
        );
    };

    return(
        <CartContext.Provider value={{cartItems, addToCart, removeFromCart, updateQuantity, totalItems}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);