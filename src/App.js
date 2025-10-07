import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../src/components/Home';
import SignInPage from './components/home/signinpage';
import SignUpPage from './components/home/signuppage';
import ProfilePage from './components/home/profilepage';
import BookingPage from './components/home/bookingpage';
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
import AboutUs from './components/layouts/aboutUs/aboutUs';
import usePageTracking from './pageTracking';
import CheckoutPage from './components/BuyProducts/checkoutPage/checkout';
import CreateProduct from './components/Admin/CreateProducts/createProduct';
import Categories from './components/Admin/Categories/categories';
import ViewCreatedProducts from './components/Admin/CreatedProducts/viewCreatedProducts';
import ViewCompanies from './components/Admin/company/viewCompany';
import ViewCategories from './components/Admin/Categories/categories';
import ProductDetail from './components/Admin/CreatedProducts/productDetails';

function App() {
  const [authState, setAuthState] = useState({
    user: null,
    admin: null,
    loading: true
  });

  usePageTracking();
  
  return (
       
    // <UserProvider value={{ user: authState.user, admin: authState.admin }}>
      <Routes>
      
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signinpage" element={<SignInPage />} />
        <Route path="/signuppage" element={<SignUpPage />} />
        <Route path="/bookingpage" element={<BookingPage />} />
        <Route path="/details-book-Iphone" element={<DetailsBookIphone />} />
        <Route path="/samsung-details" element={<SamsungDetails />} />
        <Route path="/ipad-details" element={<IpadDetails />} />
        <Route path="/other-phones-details" element={<OtherPhonesDetails />} />
        <Route path="/laptop-details" element={<LaptopBookDetails />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignUp />} />
        <Route path="/buy-products" element={<BuyProducts />} />
        <Route path="/product-cart" element={<ProductCart />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/product-details/:productId" element={<ProductDetailPage />} />
        <Route path="/terms-conditions" element={<TermsAndConditions />} />
        <Route path="/find-location" element={<FindLocation />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/track-repair" element={<NavtrackRepair />} />

        {/* User Protected Routes */}
        <Route path="/profilepage" element={<ProfilePage />} />
        <Route path="/user-profile" element={<AccountOverView />} />
        <Route path="/user-dashboard" element={<UserDashBoard />} />
        <Route path="/user-profile-dashboard" element={<AccountOverMobile />} />
        <Route path="/repair-orders" element={<RepairOrders />} />
        <Route path="/user-product-orders" element={<ProductOrders />} />
        <Route path="/checkout-payment" element={<CheckoutPage />} />

        {/* Admin Protected Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-table" element={<UserTable />} />
        <Route path="/admin-dashboard-card" element={<AdminMainDashboard />} />
        <Route path="/user-repair-orders" element={<RepairOrderTable />} />
        <Route path="/product-orders" element={<ProductOrderTable />} />
        <Route path="/admin-user" element={<AdminUserPage />} />
        <Route path="/admin-service-locations" element={<AdminLocations />} />
        <Route path="/manage-comments" element={<ManageComments />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/create-products" element={<CreateProduct />} />
        {/* <Route path="/view-categories" element={<Categories />} /> */}
         <Route path="/view-categories" element={<ViewCategories />} />
         <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/view-companies" element={<ViewCompanies />} />

         <Route path="/view-created-products" element={<ViewCreatedProducts  />} />


    

        {/* 404 Page */}
        <Route path="*" element={<NoFoundPage />} />
      </Routes>
    // </UserProvider>
  );
}

export default App;