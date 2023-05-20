import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

    const [itemsInCart, setItemsInCart] = useState([]);

    const getCartItems = async () => {
        try { 
            const response = await fetch("/api/user/cart", {
                method: "GET",
                headers: {
                    "authorization": localStorage.getItem("key"),
                },
             });
            
             if (response.status === 200) {
                 setItemsInCart(JSON.parse(response._bodyInit).cart)
            }
        } catch (e) {
            console.log(e)
        } 
    }

    const isItemInCart = (idToFind) => itemsInCart.findIndex(({ _id }) => _id === idToFind)
    
    const addItemToCart = async (productToAddInCart) => {
        const isItemFound = isItemInCart(productToAddInCart._id);
        if (isItemFound === -1) {
            try {
                const response = await fetch("/api/user/cart", {
                    method: "POST",
                    headers: {
                        "authorization": localStorage.getItem("key"),
                    },
                    body: JSON.stringify({ product: productToAddInCart }),
                });
            } catch (e) {
                console.log(e)
            }
        }
        else {
                try { 
                    const response = await fetch(`/api/user/cart/${productToAddInCart._id}`, {
                        method: "POST",
                        headers: {
                            "authorization": localStorage.getItem("key"),
                        },
                        body: JSON.stringify({
                            action: {
                                type: "increment"
                            }
                        }),
                    });
                } catch (e) {
                    console.log(e)
                } 
            } 
        getCartItems();
    }

    const removeItemFromCart = async (productToBeRemovedFromCartID) => {
        try {
                const response = await fetch(`/api/user/cart/${productToBeRemovedFromCartID}`, {
                    method: "DELETE",
                    headers: {
                        "authorization": localStorage.getItem("key"),
                    },
                   
                });
            } catch (e) {
                console.log(e)
        } 
        getCartItems();
    }

    const reduceItemQuantity = async (itemToReduceQuantityID, qty) => {
        if (qty > 1) {
            try {
                const response = await fetch(`/api/user/cart/${itemToReduceQuantityID}`, {
                    method: "POST",
                    headers: {
                        "authorization": localStorage.getItem("key"),
                    },
                    body: JSON.stringify({
                            action: {
                                type: "decrement"
                            }
                        }),
                   
                });
            } catch (e) {
                console.log(e)
            } 
        } else {
            removeItemFromCart(itemToReduceQuantityID)
        }
         
        getCartItems();
    }
    useEffect(() => getCartItems, [])
    return (<CartContext.Provider value={{itemsInCart, isItemInCart, getCartItems, addItemToCart, removeItemFromCart, reduceItemQuantity }}>{ children}</CartContext.Provider>)
}

// export function CartProvider({ children }) {

//     const [messageFromAPI, setMessageFromAPI] = useState("")
    

    
//     const CartOperations = (result, action) => {
//         console.log(action)
//         switch (action.type) {
//             case "AddItemToCart":
//                 console.log("add item to cart ", {...result, cart: [...result.cart, action.payload]})
//                 return  {...result, cart: [...result.cart, action.payload]};
        
//             case "IncrementIteminCart": 
//                 console.log("increment",result.cart.filter((product) => product._id === action.payload ?{ ...product, qty: product.qty + 1 } :product))
//                 return {...result, cart: result.cart.filter((product) => product._id === action.payload ? { ...product, qty: product.qty + 1 } : product)};
//             case "DecrementItemInCart":
//                 return result.cart.filter((product) => product._id === action.payload ? { ...product, qty: product.qty - 1 } : product);
//             case "RemoveItemFromCart":
//                 return result.cart.filter(({ _id }) => _id !== action.payload)
//             default:
//                 return result;
//         }
//     }
//     const [state, dispatch] = useReducer(CartOperations, {
//         wishlist: [],
//         cart: []
//     })
//     const findItem = (arr, itemToFind) => state[arr].findIndex(({_id}) => _id === itemToFind)
//     console.log("state", state)
        
//     const AddToCart = async (productToAddInCart) => {
//         const IsItemFound = findItem("cart", productToAddInCart._id)
//         console.log("IsItemFound", IsItemFound)
//         if (IsItemFound === -1) {
//             try { 
//             const response = await fetch("/api/user/cart", {
//       method: "POST",
//       headers: {
//         "authorization": localStorage.getItem("key"),
//       },
//       body: JSON.stringify({product: productToAddInCart}),
//     });
            
//             setMessageFromAPI(response)
//             dispatch({type: "AddItemToCart", payload: {...productToAddInCart, qty: 1}})
//         } catch (e) {
//             console.log(e)
//         } 
//         } else {
//              try { 
//             const response = await fetch(`/api/user/cart/${productToAddInCart._id}`, {
//       method: "POST",
//       headers: {
//         "authorization": localStorage.getItem("key"),
//       },
//                 body: JSON.stringify({
//                     action: {
//                         type: "increment"
//                     }
//                 }),
//     });
            
//             setMessageFromAPI(response)
//             dispatch({type: "IncrementIteminCart", payload: productToAddInCart._id})
//         } catch (e) {
//             console.log(e)
//         } 
            
//         }
//     }
