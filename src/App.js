import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";

const App = () => {
  // const APP_ID = process.env.REACT_APP_EDAMAM_ID;
  // const APP_KEY = process.env.REACT_APP_EDAMAM_KEY;

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=4c12a998&app_key=8842db4ce45d6253889ff6b7ee12e974`
      );
      const data = await response.json();
      if (data.hits && Array.isArray(data.hits)) {
        setRecipes(data.hits);
      } else {
        setRecipes([]); // Set an empty array if the data structure is not as expected
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]); // Set an empty array in case of an error
    }
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Recipe
              key={recipe.recipe.label}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          ))
        ) : (
          <p>No recipes found</p>
        )}
      </div>
    </div>
  );
};

export default App;
