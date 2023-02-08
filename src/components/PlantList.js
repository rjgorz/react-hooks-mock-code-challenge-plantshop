import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, handleDelete }) {
  const plantCards = plants.map(plant => {
    return (
      <PlantCard
        key={plant.id}
        id={plant.id}
        name={plant.name}
        image={plant.image}
        price={plant.price}
        handleDelete={handleDelete}
      />
    );
  });

  return (
    <ul className="cards">
      {plantCards}
    </ul>
  );
}

export default PlantList;
