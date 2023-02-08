import React, { useState } from "react";

function PlantCard({ id, name, image, price, handleDelete }) {
  const [isInStock, setIsInStock] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [plantPrice, setPlantPrice] = useState(price);
  const [formPlantPrice, setFormPlantPrice] = useState("");

  const handleUpdateBtn = () => {
    setShowUpdateForm(!showUpdateForm);
  }
  const handleStock = () => {
    setIsInStock(!isInStock);
  }
  const handleChange = (e) => {
    setFormPlantPrice(e.target.value);
  }

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: parseFloat(formPlantPrice) })
    })
    .then(r => r.json())
    .then(plant => setPlantPrice(plant.price));
  }

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {plantPrice}</p>
      {isInStock ? (
        <button className="primary" onClick={handleStock}>In Stock</button>
      ) : (
        <button onClick={handleStock}>Out of Stock</button>
      )}
      <button onClick={() => handleDelete(id)}>🗑️</button>
      <button onClick={handleUpdateBtn}>{showUpdateForm ? 'Hide Form' : 'Update Price'}</button>
      {showUpdateForm ? (
      <div>
        <form onSubmit={(e) => {
            handleUpdateSubmit(e);
            setFormPlantPrice("");
            setShowUpdateForm(false);
          }
        }>
          <input value={formPlantPrice} type="number" name="price" step="0.01" placeholder="Updated Price" onChange={handleChange} />
          <button type="submit">Update</button>
        </form>
      </div>
      ) : null}
    </li>
  );
}

export default PlantCard;
