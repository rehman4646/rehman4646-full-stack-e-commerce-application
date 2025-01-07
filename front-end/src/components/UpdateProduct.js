import React, { useEffect } from "react";
import { useParams , useNavigate } from "react-router-dom"; // it is an hook

const UpdateProduct=()=>{
    const [name,setName]= React.useState('');
    const [price, setPrice]= React.useState('');
    const [category, setCategory]= React.useState('');
    const [company, setCompany]= React.useState('');
    const params = useParams(); // define Hooks
    const navigate = useNavigate();


    useEffect(()=>{
        getProductDetails();
    },[])          // runtime change the value

    const getProductDetails=async ()=>{
        let result = await fetch(`http://localhost:500/products/${params.id}`, {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);


    }
    
    const updateProduct=async ()=>{
        let result = await fetch(`http://localhost:500/products/${params.id}`,{
            method: 'put',
            body: JSON.stringify({name, price, category, company}),
            headers: {
                'Content-Type' : 'application/json',
                authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result =await result.json();
        navigate('/');
    }

    return (
        <div className="product">
            <h1>Update Product</h1>

            <input type="text" placeholder="Enter Product Name" className="inputBox"
            onChange={(e)=>setName(e.target.value)} value={name} />

            <input type="text" placeholder="Enter Product Price" className="inputBox"
            onChange={(e)=>setPrice(e.target.value)} value={price} />

            <input type="text" placeholder="Enter Product Category" className="inputBox"
            onChange={(e)=>setCategory(e.target.category)} value={category} />

            <input type="text" placeholder="Enter Company Name" className="inputBox"
            onChange={(e)=>setCompany(e.target.value)} value={company} />

            <button className="appButton" onClick={updateProduct}>Update Product</button>

        </div>
    )
}
export default  UpdateProduct;