"use client";
import React from "react";
import AllProduct from "/public/assets/landingpage.png";
import Sanitizer from "/public/assets/sanitizerLandinPage.png";
import VivaProduct from "/public/assets/hold-Landingpage.png"
import Image from "next/image";
import Link from "next/link";
import product from '/public/assets/clothesLanding.png'
import Slider from "react-slick";




const Section = () => {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    };

  return (
    <div className="overflow-hidden max-sm:m">
      <Slider className="mb-4.5 gap-5" {...settings}>
        <Link href={''}>
          <Image
            src={AllProduct}
            alt="AllProducts"
            className="w-[100%] max-sm:w-[100%] bg-green-400 max-sm:h-[30vh] h-[70vh] object-fit"
            title="AllProducts"
          />
        </Link>

        <Link href={''}>
            <Image
              src={Sanitizer}
              alt="Sanitizer"
              className="w-[100%] max-sm:w-[100%] max-sm:h-[30vh] h-[70vh] object-fit"
              title="Sanitizer"
            />
        </Link>
        
        <Link href={''}>
            <Image
              src={VivaProduct}
              alt="Sanitizer"
              className="w-[100%] max-sm:w-[100%] max-sm:h-[30vh] h-[70vh] object-fit"
              title="Sanitizer"
            />
        </Link>
        
        <Link href={''}>
            <Image
              src={product}
              alt="product"
              className="w-[100%] max-sm:w-[100%] max-sm:h-[30vh] h-[70vh] object-fit"
              title="product"
            />
        </Link>
      </Slider>
    </div>

  );
};

export default Section;
