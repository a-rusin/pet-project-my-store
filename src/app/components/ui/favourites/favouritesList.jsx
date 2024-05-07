import { useSelector } from "react-redux";
import Favourite from "./favourite";
import { getFavouritesProductsList, getFavouritesProductsListLoadingStatus } from "../../../store/favourites";
import Loader from "../../common/loader";

const FavouritesList = () => {
  const favouriteProductsList = useSelector(getFavouritesProductsList());
  const isFavouritesLoading = useSelector(getFavouritesProductsListLoadingStatus());

  return (
    <>
      {isFavouritesLoading ? (
        <div className="favourites-item">
          <Loader />
        </div>
      ) : (
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
      )}
    </>
  );
};

export default FavouritesList;
