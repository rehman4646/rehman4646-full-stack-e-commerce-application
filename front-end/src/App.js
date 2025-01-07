// import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import { BrowserRouter, Routes, Route } from "react-router-dom"; // jb hamain link  lga k route banany hu to yh lirary must use krni chahiay or ak page dusry page ma components pass krny k liay routes use krty hain
import PrivateComponent from './components/PrivateComponent';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import Profile from './components/Profile';
import User from './components/User';
import UserProfile from './components/UserProfile';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
      <Routes>
        <Route element={<PrivateComponent />}> 
        <Route path='/' element={<ProductList />}></Route>
        <Route path='/add' element={<AddProduct />}></Route>
        <Route path='/update/:id' element={<UpdateProduct />}></Route>   
        <Route path='/logout' element={<h1>Logout</h1>}></Route>
        <Route path='/profile/:userId' element={<Profile />}></Route>
        <Route path='/userProfile/:userId' element={<UserProfile />}></Route>
        <Route path='/user' element={<User />}></Route>
        </Route>

        <Route path='/signUp' element={<SignUp />}></Route>
        <Route path='/login' element={<Login />}></Route>

      </Routes>

      </BrowserRouter>
      <Footer />
      
      
    </div>
  );
}

export default App;
