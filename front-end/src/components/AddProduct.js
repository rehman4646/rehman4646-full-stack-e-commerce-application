import React from "react";
import { useNavigate } from "react-router-dom";

const AddProduct=()=>{
    const [name,setName]=React.useState('');
    const [price, setPrice]=React.useState('');
    const [category, setCategory]=React.useState('');
    const [company, setCompany]=React.useState('');
    const [error,setError]= React.useState(false);  // name price etc empty error check
    const [companyError, setCompanyError] = React.useState(false); 
    const usenavigate = useNavigate();  // define the hook

    const addProduct= async ()=>{
        console.log(name,price,category,company);

        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }

        let result = await fetch('http://localhost:500/add-product',{
            method: 'post',
            body: JSON.stringify({name, price, category, company}),
            headers : {
                'Content-Type' : 'application/json',
                authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        console.log(result);
        if(result.message ==="Company already exists. This company cannot be registered again."){
            setCompanyError("Company is already Registered")
        } else{
            usenavigate('/')
        }
        
    }
 
    return (
        <div className="product">
            <h1>Add Products</h1>
            <input type="text" placeholder="Enter Product Name" className="inputBox"
            onChange={(e)=>setName(e.target.value)}   value={name}/>
            { error && !name &&  <span className="invalid-input">Please Enter Valid Name</span>}

            <input type="text" placeholder="Enter Product Price" className="inputBox"
            onChange={(e)=>setPrice(e.target.value)} value={price} />
            { error &&  !price && <span className="invalid-input">Please Enter Valid price</span>}

            <select className="inputBox" value={category} onChange={(e) => setCategory(e.target.value)} >
                <option value="">Select Category</option>
                <option value="electronics">Mobile Phone</option>
                <option value="clothing">Cars</option>
                <option value="furniture">Office</option>
            </select>
            {error && !category && <span className="invalid-input">Please Select Valid Category</span>}

            <input type="text" placeholder="Enter Company Name" className="inputBox"
            onChange={(e)=>setCompany(e.target.value)} value={company} />
            { error && !company &&  <span className="invalid-input">Please Enter Valid Company</span>}
            {companyError && <span className="invalid-input">{companyError}</span>}

            <button onClick={addProduct} className="appButton">Add Product</button>

        </div>
    )


}
export default AddProduct;