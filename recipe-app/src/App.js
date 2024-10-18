import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {RecipeList} from './components/RecipeList';
import {RecipeDetail} from './components/RecipeDetail';
import {FavoriteRecipes} from './components/FavoriteRecipes';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/recipes" />} />

        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/favorites" element={<FavoriteRecipes />} />
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;