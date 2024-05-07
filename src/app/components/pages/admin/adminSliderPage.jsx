import { useEffect, useState } from "react";
import sliderService from "../../../services/slider.service";
import ListItems from "../../common/listItems/listItems";
import Modal from "../../common/modal";

const AdminSliderPage = () => {
  const [newImage, setNewImage] = useState();
  const [slider, setSlider] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalEditActive, setIsModalEditActive] = useState(false);
  const [sliderItemImage, setSliderItemImage] = useState(null);

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
      setSlider((prevState) => [...prevState, data]);
      setIsLoading(false);
      setNewImage(null);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onClickOpen = (id) => {
    console.log(id);
    setIsModalEditActive(true);
    const urlImage = slider.find((item) => item._id === id);
    setSliderItemImage(`http://localhost:8080/images/${urlImage.image}`);
  };

  const getImageName = (imageName, type) => {
    if (imageName.length <= 10) return imageName;

    const newName = imageName.slice(0, 10) + "..." + type.split("/")[1];

    return newName;
  };

  const onClickDelete = async (imageId) => {
    try {
      if (window.confirm("Удалить изображение?") == true) {
        setIsLoading(true);
        const data = await sliderService.delete(imageId);
        setSlider((prevState) => prevState.filter((slide) => slide._id !== data._id));
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
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
              <label htmlFor="admin-slider-file" className="custom-admin-slider-file">
                {newImage ? getImageName(newImage.name, newImage.type) : "Выберите файл..."}
              </label>
              <input type="file" accept="image/*" className="admin-slider-file" id="admin-slider-file" onChange={onInputChange} />
              <button type="submit" className="admin-slider-btn admin-add-btn" disabled={isLoading}>
                Отправить
              </button>
            </form>
            <p className="admin-slder-message">ВАЖНО! Необходимое разрешение картинки - 1440px x 300px</p>
            <ListItems items={slider} onClickOpen={onClickOpen} onClickDelete={onClickDelete} />
            <Modal isOpen={isModalEditActive} setIsOpen={setIsModalEditActive} title="Просмотр изображения" modalWidth={1000}>
              <img src={sliderItemImage} className="admin-slider-item-image" />
            </Modal>
          </>
        )}
      </div>
    </>
  );
};

export default AdminSliderPage;
