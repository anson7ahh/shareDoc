import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import Slider from "react-slick";

export default function CarouselComponent({ img, setting, classNameImg }) {
    const settings = {
        ...setting,
    };

    return (
        <>
            <Slider {...settings}>
                {img.map((img, index) => (
                    <img className={`${classNameImg}`} key={index} src={`/storage/img/${img}`} alt={`Banner ${index + 1}`} />

                ))}
            </Slider>
        </ >
    );
}
