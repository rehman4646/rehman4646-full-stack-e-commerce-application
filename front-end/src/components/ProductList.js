import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        console.log("token : ",localStorage.getItem('token'));
        let result = await fetch('http://localhost:500/products', {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        console.log("Token being sent:", localStorage.getItem('token'));
        result = await result.json();
        setProducts(result);          // set products k andar data fetch kya

    }
    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:500/products/${id}`, {
            method: 'Delete',
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        if (result) {
            getProducts();
        }
    }
    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:500/search/${key}`, {
                headers: {
                    authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        } else {
            getProducts();
        }
    }

    return (
        <div className="product-list">
            <h1>Product List</h1>
            <input type="text" className="search-product-box" placeholder="Search Products" onChange={searchHandle} />
            <ul>
                <li className="heading">S. No</li>
                <li className="heading">Name</li>
                <li className="heading">Price</li>
                <li className="heading">Category</li>
                <li className="heading">Company</li>
                <li className="heading">Operations</li>
                <li className="heading">Operations</li>
            </ul>
            {
                products.length > 0 ? products.map((item, index) => {
                    return (
                        <ul>
                            <li>{index + 1}</li>
                            <li>{item.name}</li>
                            <li>$ {item.price}</li>
                            <li>{item.category}</li>
                            <li>{item.company}</li>
                            <li><button onClick={() => deleteProduct(item._id)} className="delete-button">Delete Product</button></li>
                            <li> <Link to={"/update/" + item._id}>Update Product</Link></li>
                            {/* jo id pass hur just uski update kry ga */}
                        </ul>
                    )
                }) : <h1> Products Not Found</h1>
            }
        </div>
    )
}
export default ProductList;