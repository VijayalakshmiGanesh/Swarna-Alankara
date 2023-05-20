import { useContext } from "react"
import { WishListContext } from "../contexts/WishListContext"
import { NavLink } from "react-router-dom"

function Wishlist() {
    
    const {itemsInWishList} = useContext(WishListContext)
    return (
        <>
            {/* <h1>Wishlist</h1> */}
            {
                itemsInWishList.length === 0 ?
                    (
                        <div className="flex justify-center items-center py-2 my-2 md:my-5 md:py-5 flex-col md:flex-row">
                        <img src="../assests/emptyWishList.svg" alt="empty wishlist" height="500" width="500" />
                        <div className="flex flex-col mx-2">
                            <p className="text-2xl font-bold my-5">No items in wishlist</p>
                            <p>
                                <NavLink to="/products" className="bg-pink-700 rounded-lg my-3 px-2 py-3">Go to Products &gt;</NavLink>
                            </p>
                        </div>
                    </div>
                    ) : (
                        <div>
                            
                        </div>
                    )
            }
        </>
    )
}

export default Wishlist