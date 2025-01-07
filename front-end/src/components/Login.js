import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Login=()=>{
    const [email,setEmail]=React.useState('');
    const [password,setPassword]= React.useState('');
    const [error, setError]= React.useState(false);    // agr email password nahi ha to .. 
    const [errorMessage, setErrorMessage] = React.useState(false); //email password wrong ha to

    const navigate = useNavigate();   // navigate define
    const handleLogin= async ()=>{
        console.log(email,password)


        if(!email || !password){
            setError(true);
            return false;
        }

        let result = await fetch('http://localhost:500/login',{
            method: 'post',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.log(result)
        
        if(result.auth){  // result k pass auth hogi to he wo login kr skta ha 
            localStorage.setItem("token",JSON.stringify(result.auth));  // user ka pass auth prtovide ha please check in local storage
            localStorage.setItem("user",JSON.stringify(result.user)); 
            navigate('/user')
        }else{
            if (result.message === "Please you must enter the Email or Password..") {
                setErrorMessage("User not found");
                return;
            }
        }

    }
    useEffect(()=>{   // agr log in ak bar ho gya to jb tak logout nhi hoga tb tak login page pe nhi ja skty hum
        const authentication = localStorage.getItem('user');
        if(authentication){
            navigate('/user')
        }
    })

    return (
        <div className="login">
            <input type="text" className="inputBox" placeholder="Enter Email"
            onChange={(e)=>setEmail(e.target.value)} value={email} />
            { error && !email &&  <span className="invalid-input">Please Enter Valid Email</span>}
            

            <input type="password" className="inputBox" placeholder="Enter Password"
            onChange={(e)=>setPassword(e.target.value)} value={password} />
            { error && !password &&  <span className="invalid-input">Please Enter Valid Password</span>}
            {errorMessage && <span className="invalid-input">{errorMessage}</span>}


            <button type="button" onClick={handleLogin} className="appButton">Login</button>
        </div>
    )
}
export default Login;