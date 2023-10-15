import React, { createContext, useContext, useState, useEffect } from "react";

export const PizzaContext = createContext();

export const usePizzaContext = () => {
    return useContext(PizzaContext);
};

export const PizzaContextProvider = ({ children }) => {
    const [pizzas, setPizzas] = useState([]);
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("../../public/pizzas.json");
                const data = await response.json();
                setPizzas(data);
            } catch (error) {
                console.error("Error al cargar:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const totalInCents = cart.reduce((acc, pizza) => acc + pizza.price * pizza.quantity * 100, 0);
        const totalInPesos = Math.floor(totalInCents / 100);
        setCartTotal(totalInPesos);
    }, [cart]);

    const addToCart = (pizza) => {
        const existingItem = cart.find(item => item.id === pizza.id);
        if (existingItem) {
            existingItem.quantity += 1;
            setCart([...cart]);
        } else {
            setCart([...cart, { ...pizza, quantity: 1 }]);
        }
    };

    const removeFromCart = (id) => {
        const updatedCart = cart
            .map((item) => {
                if (item.id === id) {
                    const updatedItem = { ...item, quantity: item.quantity - 1 };
                    return updatedItem;
                }
                return item;
            })
            .filter((item) => item.quantity > 0);

        setCart(updatedCart);
    };

    const clearCart = () => {
        setCart([]);
    };

    const calculateTotalQuantity = () => {
        return cart.reduce((total, pizza) => total + pizza.quantity, 0);
    };

    return (
        <PizzaContext.Provider value={{ pizzas, setPizzas, cart, addToCart, removeFromCart, clearCart, calculateTotalQuantity, cartTotal }}>
            {children}
        </PizzaContext.Provider>
    );
};
