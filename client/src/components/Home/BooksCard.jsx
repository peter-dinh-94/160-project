/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import './Home.css';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

function BooksCard(props) {
  const { name, slug, description, price, image } = props;
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setAdded] = useState(false);
  const {setCart, setTotal} = useContext(AppContext);
 
  const handleclick = async () => {
    try {
      await axios.post(`/api/v1/cart/add/${slug}?quantity=${quantity}`).then(res => {
        setCart(res.data.data.data);
        setTotal(res.data.data.total);
      });
    } catch (err) {
      console.log(err);
    }
    setAdded(true);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="m-5 shadow-lg p-2 mb-5 bg-body card-container">
      <div onClick={handleShow}>
        <h1>{name}</h1>
        <img
          src={image}
          style={{ height: '250px', width: '200px' }}
          className="img-fluid"
        />
      </div>

      <div className="flex-container">
        <div className="w-100 m-1">
          <span>Quantity </span>
          <select
            value={quantity}
            onChange={e => {
              setQuantity(e.target.value);
            }}
          >
            {[...Array(10).keys()].map((x, i) => {
              return (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="flex-container">
        <div className="m-1">
          <h1>Price: ${price * quantity}</h1>
        </div>
        <div className="m-1 w-100">
          {isAdded ? (
            <button disabled className="btn-disabled">
              Added
            </button>
          ) : (
            <button className="add-btn" onClick={handleclick}>
              Add To Cart
            </button>
          )}
        </div>
      </div>

      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <img
            src={image}
            style={{ height: '250px', width: '200px' }}
            className="img-desc"
          />
          <p style={{ color: 'black', textAlign: 'center' }}>{description}</p>
        </Modal.Body>

        <Modal.Footer>
          <button className="close-btn" onClick={handleClose}>
            CLOSE
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BooksCard;
