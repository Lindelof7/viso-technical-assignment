import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import css from './RecipeDetail.module.css'
import {Loader} from './Loader'

export function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(response => {
        setRecipe(response.data.meals[0]);
      })
      .catch(error => console.error('Error fetching recipe details:', error));
  }, [id]);

  if (!recipe) {
    return <Loader/>;
  }


  return (
    <div className={(css.recipeDetailWrap)}>
      <h1>{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h2>{recipe.strArea} dish</h2>
      <h2>Recipe instructions:</h2>
      <p>{recipe.strInstructions}</p>
        <h2>Ingredients: </h2>
      <ol className={(css.ingredientsList)}>
        {Object.keys(recipe)
          .filter(key => key.startsWith('strIngredient') && recipe[key])
          .map(key => (
            <li key={key}>{recipe[key]}</li>
          ))}
      </ol>
    </div>
  );
}