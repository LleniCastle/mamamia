import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usePizzaContext } from "../../context/PizzaContext";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faEye, faPizzaSlice } from "@fortawesome/free-solid-svg-icons";
import Toast from "react-bootstrap/Toast";
import '../../App.css';

const HomeView = () => {
    const { pizzas, addToCart } = usePizzaContext();
    const [showToast, setShowToast] = useState(false);
    const [toastPosition, setToastPosition] = useState({ top: 1, right: 5 });

    const handleAddToCart = (pizza, event) => {
        addToCart(pizza);
        const buttonRect = event.target.getBoundingClientRect();
        setToastPosition({
            top: buttonRect.top + window.scrollY + buttonRect.height,
            right: window.innerWidth - buttonRect.right
        });

        setShowToast(true);
        event.stopPropagation();
    };

    if (!Array.isArray(pizzas) || pizzas.length === 0) {
        return <p>No hay pizzas disponibles.</p>;
    }

    return (
        <div className="container">
            <div className="row">
                {pizzas.map((pizza) => (
                    <div className="col-md-4 mb-3" key={pizza.id}>
                        <Card className="customcard">
                            <Card.Img variant="top" src={pizza.img} alt={pizza.name} />
                            <Card.Body>
                                <Card.Title className="titlecard">Pizza {pizza.name}</Card.Title>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <strong>Ingredientes:</strong>
                                    </ListGroup.Item>
                                    {pizza.ingredients.map((ingredient, index) => (
                                        <ListGroup.Item className="list" key={index}>
                                            {ingredient}
                                            <FontAwesomeIcon icon={faPizzaSlice} className="icon" />
                                        </ListGroup.Item>
                                    ))}
                                    <ListGroup.Item><strong>Precio:</strong> ${pizza.price}</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                            <div className="card-footer d-flex justify-content-between">
                                <Link to={`/pizza/${pizza.id}`} className="card-link">
                                    <Button variant="info">
                                        <FontAwesomeIcon icon={faEye} /> Ver Más
                                    </Button>
                                </Link>
                                <Button variant="info" onClick={(event) => handleAddToCart(pizza, event)}>
                                    <FontAwesomeIcon icon={faShoppingCart} /> Agregar
                                </Button>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
            <Toast
                show={showToast}
                onClose={() => setShowToast(false)}
                style={{
                    position: "absolute",
                    top: toastPosition.top,
                    right: toastPosition.right,
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    color: "white",
                    width: "150px"
                }}
                delay={2000}
                autohide
            >
                <Toast.Body>Pizza Agregada</Toast.Body>
            </Toast>
        </div>
    );
};

export default HomeView;
