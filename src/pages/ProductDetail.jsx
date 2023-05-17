import { useContext } from "react"
import { useParams } from "react-router-dom"
import ProductContext from "../contexts/ProductContext"


function ProductDetail(){
const {id} = useParams()
const {productList} = useContext(ProductContext);

const findProduct = productList?.find(({_id}) => _id === id);
const { title, imageURL, category, subCategory, weight} = findProduct;

    return (
        <><h1>ProductDetail: {id}</h1>
        <div>
            <img src={imageURL} alt="picture title" height="300" width="350"/>
            <h2>{title}</h2>
            <p>Category: {category}</p>
            <p>Sub-category: {subCategory}</p>
            <p>Weight: {weight}</p>
        </div>
        </>
    )
}

export default ProductDetail