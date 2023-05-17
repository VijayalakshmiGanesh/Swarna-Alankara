import { useContext } from "react"
import {GrPrevious, GrNext} from "react-icons/gr"
import { NavLink, useNavigate } from "react-router-dom"
import ProductContext from "../contexts/ProductContext"

function Home(){
    const {dispatch} = useContext(ProductContext);
    const navigate = useNavigate();

    const HandleCategory = (filterType, valueToSend) => {
        dispatch({type: filterType, payload: valueToSend});
        navigate("/products")
    }
    return (
        <>
        <section>
            <div className="relative">
                <div className="h-[88vh] bg-gray-200 ">
                    <img src="./assests/heroBanner.jpg" className="h-full object-cover w-full blur-[1px]"/>
                    
                </div>
                <div  className="absolute flex h-full w-full top-0 left-0 flex-col align-center">
                <p className="my-auto w-full justify-center text-indigo-50 text-5xl z-50 banner-text">
                    Exquisite Gold and Silver for Every Occasion
                    <br/>
                    <NavLink to="/products" className="py-3 px-5 rounded-2xl bg-blue-950 text-xl mt-7 ">Shop Now &gt; </NavLink>
                </p>
                
                </div>
                {/* <div className="absolute px-5 flex h-full w-full top-0 left-0">
                    <div className="my-auto w-full flex justify-between">
                    <button className="mx-5 p-3 hover:bg-slate-500 hover:bg-opacity-50 rounded-md">
                        <GrPrevious className=" hover:text-white " />
                    </button>
                    <button className="mx-5 p-3 hover:bg-slate-500 hover:bg-opacity-50 rounded-md">
                        <GrNext />
                    </button>
                    </div>
                </div> */}
            </div>
        </section>
        <div className="container mx-auto my-5 ">
            <p className="text-2xl my-5 ">SHOP BY CATEGORY</p>
           <div className=" flex justify-center  w-full">
           <section onClick={() => HandleCategory("categoryFilter","Gold")} className="hover:cursor-pointer  hover:">
                <img src="http://www.fashionteria.com/wp-content/uploads/2021/04/gold-jewelry.jpg" alt="gold section" className="w-[35vw] h-[350px] mx-5 object-cover"/>
                
            </section>
            <section onClick={() => HandleCategory("categoryFilter","Silver")} className="hover:cursor-pointer">
            <img src="https://tse1.mm.bing.net/th?id=OIP.xAZuD-V7vGEYzZ0C2uxSZwHaE5&pid=Api&P=0&h=180" alt="silver section" className="w-[35vw] h-[350px] mx-5 object-cover" />
            </section>
           </div>
        </div>
        </>
    )
}

export default Home