import logo from './logo.svg';
import './App.css';
import Home from '../src/components/Home';
import {Routes, Route,Switch, BrowserRouter as Router } from 'react-router-dom';
import SignInPage from './components/home/signinpage';
import SignUpPage from './components/home/signuppage';
import ProfilePage from './components/home/profilepage';
import BookingPage from './components/home/bookingpage';
import UserMainProfile from './components/home/user-main-profile';
import DetailsBookIphone from './components/home/details-book-iphone';
import SamsungDetails from './components/home/samsung-details';
import IpadDetails from './components/home/ipad-details';
import OtherPhonesDetails from './components/home/other-phones-details';

function App() {
  return (
    <>

    <Routes basename="/">
      <Route path="/" element={<Home/>}></Route>
      <Route path="/signinpage" element={<SignInPage/>}></Route>
      <Route path="/signuppage" element={<SignUpPage/>}></Route>
      <Route path="/profilepage" element={<ProfilePage/>}></Route>
      <Route path="/bookingpage" element={<BookingPage/>}></Route>
      <Route path="/user-profile" element={<UserMainProfile/>}></Route>
      <Route path="/details-book-Iphone" element={<DetailsBookIphone/>}></Route>
      <Route path="/samsung-details" element={<SamsungDetails/>}></Route>
      <Route path="/ipad-details" element={<IpadDetails/>}></Route>
      <Route path="/other-phones-details" element={<OtherPhonesDetails/>}></Route>


    </Routes>
    
   
    
    
    </>
  );
}

export default App;