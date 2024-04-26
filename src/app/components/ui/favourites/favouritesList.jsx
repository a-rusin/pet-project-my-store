import { useSelector } from "react-redux";
import Favourite from "./favourite";
import { getFavouritesProductsList } from "../../../store/favourites";

const FavouritesList = () => {
  const favouriteProductsList = useSelector(getFavouritesProductsList());

  return (
    <>
      {favouriteProductsList.length === 0 ? (
        <div className="favourites-item">Список избранного пока пуст</div>
      ) : (
        <ul className="favourites-list">
          {favouriteProductsList.map((product) => (
            <Favourite key={product._id} product={product} />
          ))}
        </ul>
      )}
    </>
  );
};

export default FavouritesList;
