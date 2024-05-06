// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import sliderService from "../../services/slider.service";
import LoaderSpinner from "../common/loaderSpinner";

const Slider = () => {
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getImages = async () => {
    try {
      setIsLoading(true);
      const data = await sliderService.getAll();
      const slides = data.map((slide) => ({ _id: slide._id, imageUrl: `http://localhost:8080/images/${slide.image}` }));
      setSlides(slides);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="swiper-loading">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="slider">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            speed={1000}
            autoplay={{
              delay: 5000,
            }}
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide._id}>
                <img src={slide.imageUrl} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default Slider;
