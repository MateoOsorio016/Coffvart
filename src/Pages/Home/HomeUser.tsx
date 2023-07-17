import { Slider } from "../../components/Slider/Slider";
import { ProductCard } from "../../components/ProductCard/ProductCard";

import "./HomeUser.css";

import BannerHome1 from "../../assets/Banner1.png";
import BannerHome2 from "../../assets/Banner2.png";
import BannerHome3 from "../../assets/Banner3.png";
import ProductImage from "../../assets/product.jpg";

export const HomeUser = () => {
  const Images = [BannerHome1, BannerHome2, BannerHome3];

  const productosHome = [
    {
      id: 1,
      name: "Burdeo Coffee",
      price: 25000,
      image: ProductImage,
      description: "Some",
      category: "Cafe",
    },
    {
      id: 2,
      name: "Burdeo Coffee",
      price: 25000,
      image: ProductImage,
      description: "Some",
      category: "Cafe",
    },
    {
      id: 3,
      name: "Burdeo Coffee",
      price: 25000,
      image: ProductImage,
      description: "Some",
      category: "Cafe",
      discount: 50,
      new: true
    },
    {
      id: 3,
      name: "Burdeo Coffee",
      price: 25000,
      image: ProductImage,
      description: "Some",
      category: "Cafe",
    },
  ];

  return (
    <div className="userPageContainer">
      <div className="bannerHomeUser">
        <Slider
          images={Images}
          autoPlay={true}
          autoPlayInterval={2000}
          showArrows={true}
          showDots={true}
        />
      </div>
      <div className="ProductosContainer">
        <h2>Burdeo</h2>
        <div className="cardsProductHome">
          {productosHome?.map((product) => {
            return <ProductCard product={product} />;
          })}
        </div>
      </div>
    </div>
  );
};
