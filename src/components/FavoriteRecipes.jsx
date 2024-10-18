import React from 'react';
import { useSelector } from 'react-redux'; 
import css from './FavoriteRecipes.module.css'
import { RecipeCard } from './RecipeCard';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function FavoriteRecipes() {
  const favoriteRecipes = useSelector((state) => state.favorites); 

    if(favoriteRecipes.length === 0) {
        Notify.warning("Please choose your favorite recipes")
    }

    const getAllIngredients = () => {
        const ingredients = favoriteRecipes.flatMap(recipe => {
          return Object.keys(recipe)
            .filter(key => key.startsWith('strIngredient') && recipe[key])
            .map(key => recipe[key]);
        });
        return  ingredients;
      };

     const ingredients =  getAllIngredients()

  return (
    <div className={(css.favoritePageWrapper)}>
      <h1 className={(css.FarovitePageHeader)}>Favorite recipes</h1>
      {favoriteRecipes.length === 0 ? (
        <p>You haven't chosen any favorite recipe yet</p>
      ) : (<>
        <ul className={css.listWrap}>
          {favoriteRecipes.map(recipe => (
           <li key={recipe.idMeal} className={(css.recipeCard)}>
           <RecipeCard recipe={recipe} imageSrc={recipe.strMealThumb} imageAlt={recipe.strMeal} header={recipe.strMeal}
               category={recipe.strCategory} origin={recipe.strArea} id={recipe.idMeal}
           ></RecipeCard>
         </li>
          ))}
        </ul>
         <h2>Ingredients needed for your favourite recipes :</h2>
         <ul>
         {ingredients.map(ingredient => (
             <li key={Math.random()}>
                 <p>{ingredient}</p>
             </li>
         ))}
         </ul>
         </>
      )}
       
    </div>
  );
}