import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import css from './RecipeList.module.css'
import { Loader } from './Loader';
import { debounce } from 'lodash';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {RecipeCard} from './RecipeCard'
import { Link } from 'react-router-dom';

export function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedInputValue, setDebouncedInputValue] = useState('');

  const inputRef = useRef();

  let recipesPerPage = 12;
  
  useEffect(() => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${debouncedInputValue}`)
      .then(response => {
        if (response.data && response.data.meals) {
            setRecipes(response.data.meals);
            setFilteredRecipes(response.data.meals);
          } else {
            Notify.failure('No recipes found, please try again');
          }
      })
      .catch(error => console.error('Error fetching recipes:', error));
  }, [debouncedInputValue]);


    useEffect(() => {
    axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then(response => {
        setRecipes(response.data.meals);
        setFilteredRecipes(response.data.meals);
      })
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  
  const debouncedSetValue = debounce((value) => {
    setDebouncedInputValue(value);
  }, 500);

  const handleInputChange = (event) => {
    const value = event.target.value;
    inputRef.current = value;
    debouncedSetValue(value);
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    const filtered = recipes.filter(recipe => recipe.strCategory === cat || cat === '');
    setFilteredRecipes(filtered);
  };

  if (recipes.length === 0) {
    return <Loader/>;
  }

  return (
    <div >
     <header className={(css.headerWrap)}>
    <h1 >List of Recipes</h1>
<select onChange={(e) => handleCategoryChange(e.target.value)} value={category} className={(css.catSelect)}>
  <option value="">All categories</option>
  <option value="Chicken">Chicken</option>
  <option value="Beef">Beef</option>
  <option value="Vegetarian">Vegeterian</option>
  <option value="Seafood">Seafood</option>
</select>

<input type="text" ref={inputRef} onChange={handleInputChange} className={(css.findRecipeInput)}
placeholder='Find recipe'/> 

<Link to={`/favorites`} className={(css.linkToFavorite)}>Favorite recipes</Link>
     </header>

      <ul className={css.listWrap}>
        {currentRecipes.map(recipe => (
          <li key={recipe.idMeal} className={(css.recipeCard)}>
            <RecipeCard recipe={recipe} imageSrc={recipe.strMealThumb} imageAlt={recipe.strMeal} header={recipe.strMeal}
                category={recipe.strCategory} origin={recipe.strArea} id={recipe.idMeal}
            ></RecipeCard>
          </li>
        ))}
      </ul>

      {filteredRecipes.length > 12 && <ul className={(css.paginationList)}>
        {Array(Math.ceil(filteredRecipes.length / recipesPerPage)).fill().map((_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)} className={(css.paginationButton)}>
            {i + 1}
          </button>
        ))}
      </ul>}
    </div>
  );
}

