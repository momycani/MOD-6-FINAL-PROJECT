import React, { useState, useEffect } from "react";
import "./styles.css";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import Home from "./Home";
import Movies from "./Movies";
import MovieDetails from "./MovieDetails";
import Cart from "./Cart"
import Nav from "./components/Nav";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faShoppingCart, faTimes, faStar, faStarHalfAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Footer from "./Footer";

library.add(faBars, faShoppingCart, faTimes, faStar, faStarHalfAlt, faArrowLeft);

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(item) {
  setCart((prev) => {
    const existing = prev.find(
      (m) => m.imdbID === item.imdbID && m.cartType === item.cartType
    );

    if (existing) {
      return prev.map((m) =>
        m.imdbID === item.imdbID && m.cartType === item.cartType
          ? { ...m, quantity: m.quantity + 1 }
          : m
      );
    }

    return [...prev, { ...item, quantity: 1 }];
  });
}

  function changeQuantity(movie, quantity) {
  setCart((prev) =>
    prev.map((item) =>
      item.imdbID === movie.imdbID && item.cartType === movie.cartType
        ? { ...item, quantity: +quantity }
        : item
    )
  );
}

  function removeItem(item) {
    setCart(cart.filter((m) => m.imdbID !== item.imdbID || m.cartType !== item.cartType));
  }

  function numberOfItems() {
    let counter = 0;
    cart.forEach((item) => {
      counter += item.quantity;
    });
    return counter;
  }

  useEffect(() => {
      }, [cart]);
  
  return (
    <Router>
      <div className="App">  
        <Nav numberOfItems={numberOfItems()} />    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies addToCart={addToCart} />} />
        <Route path="/movies/:imdbID" element={<MovieDetails addToCart={addToCart} cart={cart} />} />
        <Route path="/cart" element={<Cart cart={cart} 
        changeQuantity={changeQuantity} removeItem={removeItem} />} />
        </Routes>
        <Footer />
      </div>      
    </Router>
  );
}


export default App 
