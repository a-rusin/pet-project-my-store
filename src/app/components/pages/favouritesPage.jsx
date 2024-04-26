import FavouritesList from "../ui/favourites/favouritesList";

const FavouritesPage = () => {
  return (
    <div className="favourites">
      <div className="favourites-wrapper">
        <h1 className="favourites-title">Избранное</h1>
        <FavouritesList />
      </div>
    </div>
  );
};

export default FavouritesPage;
