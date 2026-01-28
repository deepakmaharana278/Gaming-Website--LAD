import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import slide1 from "../assets/slide1.webp";
import slide2 from "../assets/slide2.webp";
import slide3 from "../assets/slide3.webp";
import slide4 from "../assets/slide4.webp";
import { useNavigate } from "react-router-dom";

const HomeSlider = () => {
  const navigate = useNavigate()

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-55 sm:h-75 md:h-200"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src={slide1}
              alt="game"
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center">
              <div
                className="
                  px-4 sm:px-6 md:px-16
                  text-white
                  max-w-xs sm:max-w-md md:max-w-xl
                  mx-auto md:mx-0
                  text-center md:text-left
                "
              >
                <h2
                  className="
                    text-lg sm:text-xl md:text-4xl
                    font-bold 
                    leading-snug
                  "
                >
                  Play Trending Games
                </h2>

                <p
                  className="
                    mt-2
                    text-xs sm:text-sm md:text-base
                    text-gray-200
                    leading-relaxed
                  "
                >
                  Welcome to Gaming World
                </p>

                <button
                  onClick={()=>navigate('/all-games')}
                  className="
                    mt-4
                    bg-[#57A6A1]
                    text-[#240750]
                    px-4 sm:px-5
                    py-2
                    rounded-md
                    font-semibold
                    text-sm md:text-base
                  "
                >
                  Play Now
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img src={slide2} alt="game" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center">
              <div
                className="
                  px-4 sm:px-6 md:px-16
                  text-white
                  max-w-xs sm:max-w-md md:max-w-xl
                  mx-auto md:mx-0
                  text-center md:text-left
                "
              >
                <h2 className="text-lg sm:text-xl md:text-4xl font-bold leading-snug">
                  Free Online Games
                </h2>
                <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-200">
                  No Download • No Signup
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img src={slide3} alt="game" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center">
              <div
                className="
                  px-4 sm:px-6 md:px-16
                  text-white
                  max-w-xs sm:max-w-md md:max-w-xl
                  mx-auto md:mx-0
                  text-center md:text-left
                "
              >
                <h2 className="text-lg sm:text-xl md:text-4xl font-bold">
                  Enjoy Free Games
                </h2>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 4 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img src={slide4} alt="game" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center">
              <div
                className="
                  px-4 sm:px-6 md:px-16
                  text-white
                  max-w-xs sm:max-w-md md:max-w-xl
                  mx-auto md:mx-0
                  text-center md:text-left
                "
              >
                <h2 className="text-lg sm:text-xl md:text-4xl font-bold">
                  New Games Added Daily
                </h2>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeSlider;