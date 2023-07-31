import logo from './logo.svg';
import './App.css';
import Home from '../src/components/Home';
import {Routes, Route,Switch, BrowserRouter as Router } from 'react-router-dom';
import SignInPage from './components/home/signinpage';
import SignUpPage from './components/home/signuppage';
import ProfilePage from './components/home/profilepage';
import BookingPage from './components/home/bookingpage';

function App() {
  return (
    <>

    <Routes basename="/">
      <Route path="/" element={<Home/>}></Route>
      <Route path="/signinpage" element={<SignInPage/>}></Route>
      <Route path="/signuppage" element={<SignUpPage/>}></Route>
      <Route path="/profilepage" element={<ProfilePage/>}></Route>
      <Route path="/bookingpage" element={<BookingPage/>}></Route>


    </Routes>
    
   
    
    
    </>
  );
}

export default App;