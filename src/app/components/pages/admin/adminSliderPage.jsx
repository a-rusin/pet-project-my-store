import { useEffect, useState } from "react";
import sliderService from "../../../services/slider.service";
import ListItems from "../../common/listItems/listItems";

const AdminSliderPage = () => {
  const [newImage, setNewImage] = useState();
  const [slider, setSlider] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllSlides();
  }, []);

  const getAllSlides = async () => {
    setIsLoading(true);
    const data = await sliderService.getAll();
    setSlider(data);
    setIsLoading(false);
  };

  const onInputChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const submitImage = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const formData = new FormData();
      formData.append("image", newImage);
      const data = await sliderService.post(formData);
      setIsLoading(false);
    } catch (error) {}
  };

  return (
    <>
      <h1 className="admin-route-title">Настройка слайдера</h1>
      <div className="admin-main-content-list">
        {isLoading ? (
          "Загрузка..."
        ) : (
          <>
            <form className="admin-slider-form" onSubmit={submitImage}>
              <input
                type="file"
                accept="image/*"
                className="admin-slider-file"
                onChange={onInputChange}
              />
              <button
                type="submit"
                className="admin-slider-btn admin-add-btn"
                disabled={isLoading}
              >
                Отправить
              </button>
            </form>
            <ListItems items={slider} />
          </>
        )}
      </div>
    </>
  );
};

export default AdminSliderPage;
