import React from "react";
import { Link, useNavigate } from "react-router-dom";  // yh library links banany k liay use hoti ha 
import '../App.css'

const Nav=()=>{
    const authentication = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout =()=>{           // logout feature handle
        localStorage.clear();
        navigate('/signUp');
    }
    return(
        <div>
            <img className="logo"
            alt="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHMxuqqnkGPEc0_-r1VvKQ4wALmZ3x-ueuUA&s"></img>
            {
                authentication ? <ul className="nav">
                    
                <li><Link to="/" >Products</Link></li> 
                <li><Link to="/add" >Add Products</Link></li> 
                <li><Link to="/update/:id" >Update Products</Link></li> 
           
                <li><Link to="/user" >User</Link></li> 
                <li><Link onClick={logout} to="/signUp" >Logout</Link></li>
                </ul> : 
                <ul className="nav-right">
                <li><Link to="/signUp" >signUp</Link></li>
                <li><Link to="/login" >Login</Link></li>
                </ul>
            }
            
            
        </div>
    )
}
export default Nav;
