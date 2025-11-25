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

    //persisting to local storage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    // const addToCart = (product, confirmIncrease = false) => {
    //     let alreadyExists = false;

    //     setCartItems((prev) => {
    //         const existing = prev.find((item)=>item.id === product.id);

    //         if(existing){
    //             // If not confirmed yet, Show Modal Via Event Or Return A Flag
    //             if(!confirmIncrease){
    //                 window.dispatchEvent(new CustomEvent("showCartModal", { detail: product }));
    //                 return prev; // don’t update yet
    //             }
    //             //  Increasing quantity if the quantity increase is confirmed
    //             return prev.map((item) =>item.id === product.id ? { ...item, quantity: item.quantity + 1} : item);
    //         }else{
    //             // Adding New Item To The Cart If The Product Doesn't Exist In The Cart
    //             return [...prev, { ...product, quantity:1}];
    //         }
    //     });
    // };

    const addToCart = (product, confirmIncrease = false) => {
        let alreadyExists = false;

        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);

            if (existing) {
            alreadyExists = true;

            if (!confirmIncrease) {
                return prev; // skip update until user confirms
            }

            return prev.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
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

    // const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalItems = cartItems.length;

    const updateQuantity = (id, quantity) => {
        setCartItems((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    // Preventing the quantity reducing below 1 and show toast once
                    if (item.quantity === 1 && quantity < 1) {
                        if (!toastShown) {
                            toast.error("To remove this item, please click the remove button.");
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