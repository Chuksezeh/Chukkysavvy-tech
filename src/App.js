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
import LaptopBookDetails from './components/home/laptop-book-details';
import AdminDashboard from './components/Admin/adminDashboard';
import UserDashBoard from './components/UserDashboard/userDashboard';
import UserTable from './components/Admin/userTable/userTable';
import AdminMainDashboard from './components/Admin/adminMainDashboard/adminMainDashboard';
import CreateUser from './components/Admin/CreateUser/createUser';
import AdminLoginPage from './components/Admin/LoginInterface/adminLogin';
import UserLogin from './components/layouts/UserLoginPage/userlogin';
import UserSignUp from './components/layouts/UserSignup/userSignup';
import AccountOverView from './components/UserDashboard/UserAccountComponents/accountOverView';
import RepairOrders from './components/UserDashboard/UserAccountComponents/repairOrders';
import NavtrackRepair from './components/layouts/NavTracking/navTrackRepair';
import RepairOrderTable from './components/Admin/OrderTable/userRepairOrder';
import ProductOrderTable from './components/Admin/OrderTable/userProductOrder';
import { useState } from 'react';
import { UserProvider } from './components/UserDashboard/userConytext';
import BuyProducts from './components/BuyProducts/buyLanding';
import AccountOverMobile from './components/UserDashboard/UserAccountComponents/accountOverMobile';
import PrivacyPolicy from './components/layouts/PrivacyPolicy/privacyPolicy';
import TermsAndConditions from './components/layouts/TermsAndConditions/termsAndConditon';
import ProductCart from './components/BuyProducts/ProductCart/productCart';
import ProductDetailPage from './components/BuyProducts/productDetailpage/productDetail';
import NoFoundPage from './components/404page/404page';
import ProductOrders from './components/UserDashboard/UserAccountComponents/productOrders';
import AdminUserPage from './components/Admin/userTable/adminUserTable';
import AdminLocations from './components/Admin/admin-locations';
import ManageComments from './components/Admin/manageComment/commentTable';
import FindLocation from './components/layouts/location/findLocation';
import ForgotPassword from './components/layouts/UserLoginPage/forgotPassword';
// import AdminDashbord from './components/Admin/adminDashbord/adminDash';


function App() {

  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData); // Store user data in state
  };
  return (
    <>
    
    <Routes basename="/">
    {/* General routes */}
      <Route path="/" element={<Home/>}></Route>
      <Route path="/signinpage" element={<SignInPage/>}></Route>
      <Route path="/signuppage" element={<SignUpPage/>}></Route>
      <Route path="/bookingpage" element={<BookingPage/>}></Route>
      <Route path="/details-book-Iphone" element={<DetailsBookIphone/>}></Route>
      <Route path="/samsung-details" element={<SamsungDetails/>}></Route>
      <Route path="/ipad-details" element={<IpadDetails/>}></Route>
      <Route path="/other-phones-details" element={<OtherPhonesDetails/>}></Route>
      <Route path="/laptop-details" element={<LaptopBookDetails/>}></Route>
      <Route path="/create-user" element={<CreateUser/>}></Route>
      <Route path="/admin-login" element={<AdminLoginPage/>}></Route>
      <Route path="/user-login" element={<UserLogin />}></Route>
      <Route path="/user-signup" element={<UserSignUp/>}></Route>
      <Route path="/buy-products" element={<BuyProducts/>}></Route>
      <Route path="/product-cart" element={<ProductCart/>}></Route>
      <Route path="/privacy-policy" element={<PrivacyPolicy/>}></Route>
      <Route path="/404" element={<NoFoundPage/>}></Route>
      <Route path="/product-details" element={<ProductDetailPage/>}></Route>
      <Route path="/terms-conditions" element={<TermsAndConditions/>}></Route>
      <Route path="/find-location" element={<FindLocation/>}></Route>
      <Route path="/forgot-password" element={<ForgotPassword/>}></Route>


      {/* User dashboard routes restricted*/}
      <Route path="/profilepage" element={<ProfilePage/>}></Route>
      <Route path="/user-profile" element={<AccountOverView />}></Route>
      <Route path="/user-profile-dashboard" element={<AccountOverMobile />}></Route>
      <Route path="/track-repair" element={<NavtrackRepair/>}></Route>
      <Route path="/repair-orders" element={<RepairOrders/>}></Route>
      <Route path="/user-product-orders" element={<ProductOrders/>}></Route>

     
      {/* Admin dashboard routes restricted*/}
      <Route path="/admin-dashboard" element={<AdminDashboard/>}></Route>
      <Route path="/user-dashboard" element={<UserDashBoard  user={user}/>}></Route>
      <Route path="/user-table" element={<UserTable/>}></Route>
      <Route path="/admin-dashboard-card" element={<AdminMainDashboard/>}></Route>
      <Route path="/user-repair-orders" element={<RepairOrderTable/>}></Route>
      <Route path="/product-orders" element={<ProductOrderTable/>}></Route>
      <Route path="/admin-user" element={<AdminUserPage/>}></Route>
      <Route path="/admin-service-locations" element={<AdminLocations/>}></Route>
      <Route path="/manage-comments" element={<ManageComments/>}></Route>
     
     
   </Routes>
    
   
    
    
    </>
  );
}

export default App;