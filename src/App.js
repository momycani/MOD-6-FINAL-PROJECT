import React, { useState, useEffect } from "react";
import "./styles.css";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import Home from "./Home";
import Movies from "./Movies";
import MovieDetails from "./MovieDetails";
import Cart from "./Cart"
import Nav from "./components/Nav";

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(book) {
    setCart([...cart, {...book, quantity: 1}]);
  } 

  function changeQuantity(book, quantity) {
    setCart(cart.map((item) => item.id === book.id ? {...item, quantity: +quantity} : item));
  }

  function removeItem(item) {
    setCart(cart.filter((book => book.id !== item.id)));
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
        <Route path="/movies" element={<Movies movies={movies} />} />
        <Route path="/movies/:imdbID" element={<MovieDetails movies={movies} addToCart={addToCart} cart={cart} />} />
        <Route path="/cart" element={<Cart movies={movies} cart={cart} 
        changeQuantity={changeQuantity} removeItem={removeItem} />} />
      </Routes>
      </div>
    </Router>
  );
}


export default App 
