import React from "react";
import { usePizzaContext } from "../context/PizzaContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Row, Image, Container } from "react-bootstrap";
import "../App.css";

const CartView = () => {
    const { cart, addToCart, removeFromCart, clearCart, calculateTotalQuantity, cartTotal } = usePizzaContext();

    const handleIncreaseQuantity = (pizza) => {
        addToCart(pizza);
    };

    const handleDecreaseQuantity = (pizza) => {
        removeFromCart(pizza.id);
    };

    return (
        <Container>
            <h1 className="cart-title">Carrito de Compras</h1>
            {cart.length === 0 ? (
                <p>El carrito está vacío.</p>
            ) : (
                <div className="cart-items">
                    {cart.map((pizza) => (
                        <div key={pizza.id}>
                            <Row className="m-4 align-items-center pizzacart">
                                <Col md={1}>
                                    <Image src={pizza.img} alt={pizza.name} fluid rounded roundedCircle />
                                </Col>
                                <Col md={5}>
                                    <h2 className='namePizzaCart'>{`${pizza.name} - Cantidad: ${pizza.quantity}`}</h2>
                                </Col>
                                <Col md={5} className="d-flex justify-content-end">
                                    <Button variant="info" onClick={() => handleIncreaseQuantity(pizza)}>
                                        +
                                    </Button>
                                </Col>
                                <Col md={1} className="d-flex justify-content-end">
                                    <Button variant="dark" onClick={() => handleDecreaseQuantity(pizza)}>
                                        -
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    ))}
                    <Row className="mb-2">
                        <Col md={4} className="d-flex justify-content-center">
                            <Button variant="light" onClick={clearCart} className="btn-lg">
                                Vaciar <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </Col>
                        <Col md={3} className="text-right">
                            <h4>{`Cantidad de Pizzas: ${calculateTotalQuantity()}`}</h4>
                        </Col>
                        <Col md={3} className="text-right">
                            <h4>{`Precio Total: ${cartTotal.toLocaleString()} CLP`}</h4>
                        </Col>
                    </Row>
                </div>
            )}
        </Container>
    );
};

export default CartView;

