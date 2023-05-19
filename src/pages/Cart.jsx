import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext"

function Cart() {
    const { getCartItems } = useContext(CartContext);
const [cartList, setCartList] = useState()

    // const getCartItems = async () => {
    //      try { 
    //         const response = await fetch("/api/user/cart", {
    //   method: "GET",
    //   headers: {
    //     "authorization": localStorage.getItem("key"),
    //   },
      
    // });
            
    //          if (response.status === 200) {
    //              setCartList(JSON.parse(response._bodyInit).cart)
    //              console.log(cartList)
    //         }
    //     } catch (e) {
    //         console.log(e)
    //     } 
    // }
    useEffect(() =>{ setCartList(getCartItems())}, [])

    const deleteAnCartItem = async (id) => {
        try { 
            const response = await fetch(`/api/user/cart/${id}`, {
      method: "POST",
      headers: {
        "authorization": localStorage.getItem("key"),
                },
      body: JSON.stringify({action: {
    type: "decrement"
  }}),
      
    });
            console.log("delete",JSON.parse(response._bodyInit).cart)
             if (response.status === 200) {
                 setCartList(JSON.parse(response._bodyInit).cart)
                 console.log(cartList)
            }
        } catch (e) {
            console.log(e)
        } 
    }
    return (
        <><h1>Cart</h1>
            {
                cartList?.length === 0 ? (<p>No items in the cart</p>) : (
                    <> 
                        {
                            cartList?.map((product) => {
                                 const {_id, title, qty, price, id} = product
                            return(
                                <div key={_id} className="bg-cyan-500 shadow-lg shadow-cyan-500/50 m-3">
                                    <p>{title}</p>
                                    <p>{qty}</p>
                                    <p>{price}</p>
                                    <button className="bg-blue-700 p-3 rounded text-white" onClick={() => deleteAnCartItem(_id)}>Delete</button>
                                </div>
                            )
                        })
                       }
                    </>
                )
        }
        </>
    )
}

export default Cart