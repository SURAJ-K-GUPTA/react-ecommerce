import React, { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Cart from "./features/cart/Cart";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetail from "./features/productList/components/ProductDetail";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/CartSlice";
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfie from "./features/user/components/UserProfile";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync, fetchLoggedInUserOrderAsync } from "./features/user/userSlice";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: <Protected>
      <Checkout />
    </Protected>,
  },
  {
    path: "/product-detail/:id",
    element: <Protected>
      <ProductDetailPage />
    </Protected>,
  },
  {
    path: "/order-success/:id",
    element: (<Protected>
      <OrderSuccessPage></OrderSuccessPage>
    </Protected>),
  },
  {
    path: '/orders',
    element: (<Protected>
      <UserOrdersPage></UserOrdersPage>
    </Protected>)
  },
  {
    path: '/profile',
    element: (<Protected>
      <UserProfilePage></UserProfilePage>
    </Protected>)
  },
  {
    path: '/logout',
    element: (
      <Logout></Logout>
    )
  },
  {
    path: '/forgot-password',
    element: (
      <ForgotPasswordPage></ForgotPasswordPage>
    )
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
  
]);
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser)
  console.log("users in app",user)
  useEffect(()=>{
    if(user){
    dispatch(fetchItemsByUserIdAsync(user.id))
    dispatch(fetchLoggedInUserAsync(user.id))
    console.log(user.id)
  }
  },[dispatch, user])
  
  return (
    <div className="App h-full">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
