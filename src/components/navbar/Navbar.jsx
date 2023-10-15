import React from "react";
import { Navbar as BootstrapNavbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.png";
import { usePizzaContext } from "../../context/PizzaContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../navbar/navbarstyle.css";

const Navbar = () => {
    const { cartTotal } = usePizzaContext();

    return (
        <BootstrapNavbar bg="dark">
            <Container className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <Link to="/" className="nav-link">
                        <img
                            alt="Pizzería Mamma Mia"
                            src={logo}
                            width="100"
                            height="80"
                            className="d-inline-block align-top"
                        />
                    </Link>
                    <Link to="/" className="nav-link">
                        <h1 className="subtitlenav">Pizzería Mamma Mia!</h1>
                    </Link>
                </div>
                <Link to="/carrito" className="nav-link">
                    <FontAwesomeIcon icon={faShoppingCart} /> {cartTotal.toLocaleString()} CLP
                </Link>
            </Container>
        </BootstrapNavbar>
    );
};

export default Navbar;
