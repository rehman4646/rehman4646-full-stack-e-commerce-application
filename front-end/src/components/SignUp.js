import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // hook used because hooks ak page k zariay dusry page ko open krny k liay use kya jata ha 

const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = React.useState(false);
    const [error, setError] = React.useState(false); // error is false initially
    const navigate = useNavigate();     // hooks define


    const getData = async () => {
        console.log(firstName, lastName,  email, password);

        if (!firstName || !lastName || !email || !password) {
            setErrorMessage(true);
            return false;
        }
        let result = await fetch('http://localhost:500/register', {
            method: "post",
            body: JSON.stringify({ firstName, lastName,  email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();
        console.log("resut");
        console.log(result);
        if (result.message === "User already exists. Please use a different Email..") {
            setError("Email already exists"); 
            return;
        }
       
        if (result.auth) { // ager local storage ka andar result aa gya ha to he wo nevigate kr skta ha 

        localStorage.setItem('user', JSON.stringify(result.user));  // data store in local storage in section application
        localStorage.setItem('token', JSON.stringify(result.auth));
            navigate('/user');
        }

    }
    useEffect(() => {                                      // agr sign up ho to dubara sign up page pe nhi ja skty ab tum
        const authentication = localStorage.getItem('user');
        if (authentication) {
            navigate('/user')
        }
    })
    return (
        <div className="register">
            <h3>Registered</h3>
            <input className="inputBox" type="text"
                value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter First Name " />
            {errorMessage && !firstName && <span className="invalid-input">Please Enter First Name</span>}

            <input className="inputBox" type="text"
                value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter Last Name " />
            {errorMessage && !lastName && <span className="invalid-input">Please Enter Last Name</span>}

            <input className="inputBox" type="text" placeholder="Enter Email"
                value={email} onChange={(e) => setEmail(e.target.value)} />
            {errorMessage && !email && <span className="invalid-input">Please Enter Valid Email</span>}
            {error && <span className="invalid-input">{error}</span>}

            <input className="inputBox" type="password"
                value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
            {errorMessage && !password && <span className="invalid-input">Please Enter Valid password</span>}

            <button className="appButton" onClick={getData}>Sign Up</button>
        </div>
    )
}
export default SignUp;