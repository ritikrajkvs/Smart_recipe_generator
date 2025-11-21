// ... existing imports
import { AppContext } from '../context/AppContext';

// ... inside component
const { favorites, toggleFavorite } = useContext(AppContext);
const isFavorite = favorites.includes(recipe.id);

const handleToggle = (e) => {
  e.stopPropagation();
  toggleFavorite(recipe.id);
};

// ... in the JSX button:
<button onClick={handleToggle} ... > ... </button>
