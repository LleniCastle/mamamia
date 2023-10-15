import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeView from './views/Home/HomeView';
import PizzaDetailView from './views/PizzaDetailView';
import CartView from './views/CartView';
import NotFound from './views/NotFound';
import { PizzaContextProvider } from './context/PizzaContext';
import NavigationBar from "./components/navbar/Navbar";
import Header from "./components/header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <Router>
      <PizzaContextProvider>
      <NavigationBar />
      <Header />
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/pizza/:id" element={<PizzaDetailView />} />
          <Route path="/carrito" element={<CartView />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PizzaContextProvider>
    </Router>
  );
};

export default App;
