import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:6001/plants')
    .then(r => r.json())
    .then(plants => setPlants(plants));
  }, []);

  const handleSubmit = (e, newPlant) => {
    e.preventDefault();
    fetch('http://localhost:6001/plants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlant)
    })
    .then(r => r.json())
    .then(newPlant => setPlants([...plants, newPlant]));
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  const plantsToRender = plants.filter(plant => {
    return(plant.name.toLowerCase().includes(search.toLowerCase()));
  });

  return (
    <main>
      <NewPlantForm handleSubmit={handleSubmit} />
      <Search handleSearch={handleSearch} />
      <PlantList plants={plantsToRender} />
    </main>
  );
}

export default PlantPage;
