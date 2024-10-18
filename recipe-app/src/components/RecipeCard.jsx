import { Link } from 'react-router-dom'
import css from './RecipeList.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { addRecipeToFavorites, removeRecipeFromFavorites } from '../redux/silces';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function RecipeCard({recipe, imageSrc, imageAlt, header, category, origin, id}) {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites);

    const isFavorite = favorites.some(fav => fav.idMeal === recipe.idMeal);


    const handleToggleFavorite = () => {
        if (isFavorite) {
          dispatch(removeRecipeFromFavorites(recipe.idMeal)); 
          Notify.success('Recipe was succesfully deleted')
        } else {
          dispatch(addRecipeToFavorites(recipe));
          Notify.success('Recipe was succesfully added') 
        }
      };


    return (
        <>
        <img src={imageSrc} alt={imageAlt} className={(css.recipeImg)}/>
        <h3>{header}</h3>
       <div className={(css.wrapper)}>
      <div>
      <p>Category: {category}</p>
      <p>Origin: {origin}</p>
      </div>
       <div className={(css.buttons)}>
       <button onClick={() => {handleToggleFavorite(recipe)}} className={(css.favoriteButton)}>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</button>
       </div>
       </div>
        <Link to={`/recipe/${id}`} className={(css.linkToRecipeDetail)}>Detailed recipe</Link>
        </>
    )
}