import { createContext } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

    const AddToCart = async (productToAddInCart) => {
        try { 
            const response = await fetch("/api/user/cart");
            

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <CartContext.Provider value={{}}>{ children}</CartContext.Provider>
    )
}