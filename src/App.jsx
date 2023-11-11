import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Mypage from "./pages/Mypage";
//import firebase from '../public/firebaseConfig'

function App() {
  return (
    <>
      <Router>
        <AnimatePresence>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:store_id" element={<Detail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/Mypage/:memberid" element={<Mypage />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </>
  );
}

export default App;
