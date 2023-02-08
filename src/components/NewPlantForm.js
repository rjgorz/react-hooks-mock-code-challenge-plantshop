import React, { useState } from "react";

function NewPlantForm({ handleSubmit }) {
  const initialFormData = {
    name: "",
    image: "",
    price: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const newPlant = {
    name: formData.name,
    image: formData.image,
    price: parseFloat(formData.price),
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={(e) => {
          handleSubmit(e, newPlant);
          setFormData(initialFormData);
        }
      }>
        <input value={formData.name} type="text" name="name" placeholder="Plant name" onChange={handleInput} />
        <input value={formData.image} type="text" name="image" placeholder="Image URL" onChange={handleInput} />
        <input value={formData.price} type="number" name="price" step="0.01" placeholder="Price" onChange={handleInput} />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
