import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePizzaContext } from '../context/PizzaContext';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import '../App.css'


const PizzaDetailView = () => {
  const { id } = useParams();
  const { pizzas, addToCart } = usePizzaContext();
  const navigate = useNavigate();
  const [showToast, setShowToast] = React.useState(false);
  const pizza = pizzas.find((p) => p.id === id);

  if (!pizza) {
    return <div>Pizza no encontrada</div>;
  }

  const handleAddToCart = (pizza) => {
    addToCart(pizza);
    setShowToast(true);
  };

  return (
    <Modal show={true} backdrop="static" keyboard={false} centered>
      <Modal.Header closeButton onClick={() => navigate('/')}>
        <Modal.Title className='titledetail'>Pizza {pizza.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='bodycarddetail'>
        <img src={pizza.img} alt="" className="img-fluid mb-3" />
        <p>{pizza.desc}</p>
        <p>Ingredientes: {pizza.ingredients.join(", ")}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="info" onClick={() => handleAddToCart(pizza)}>
        <FontAwesomeIcon icon={faShoppingCart} /> Agregar
        </Button>
      </Modal.Footer>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        style={{
          position: 'absolute',
          top: 635,
          right: 160,
          width: 110,
          fontSize: 12,
        }}
        delay={2000}
        autohide
      >
        <Toast.Body>Pizza Agregada</Toast.Body>
      </Toast>
    </Modal>
  );
};

export default PizzaDetailView;