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
    element: <OrderSuccessPage></OrderSuccessPage>,
  },
  {
    path: '/orders',
    element: (<UserOrdersPage></UserOrdersPage>)
  },
  {
    path: '/profile',
    element: (<UserProfilePage></UserProfilePage>)
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
  
]);
function App() {
  const dispatch = useDispatch();
  const users = useSelector(selectLoggedInUser)
  console.log("users in app",users)
  useEffect(()=>{
    if(users){
    dispatch(fetchItemsByUserIdAsync(users.id))
    console.log(users.id)
  }
  },[dispatch, users])
  
  return (
    <div className="App h-full">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
