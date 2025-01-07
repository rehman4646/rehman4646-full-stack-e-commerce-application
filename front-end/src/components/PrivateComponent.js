import React from "react";
import { Navigate, Outlet } from "react-router-dom"; // outlet hum es liay used krty hain qk hum ak component pass krna chahty hain as a props

const PrivateComponent =()=>{
    const authentication = localStorage.getItem('user'); // yh user ko authenticate kry ga k agr uer login ha to baki page ka visit kr skty ho warna nhi

    return authentication ? <Outlet /> :<Navigate to="/signUp" />;
}
export default PrivateComponent;