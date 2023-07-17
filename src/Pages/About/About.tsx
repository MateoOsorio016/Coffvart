import { Slider } from "../../components/Slider/Slider";

import AboutBanner from "../../assets/AboutUsBanner.png";
import AboutRowImageOne from "../../assets/AboutPageOne.png";
import AboutRowImageTwo from "../../assets/AboutPageTwo.png";

import "./About.css";

export const About = () => {
  return (
    <>
      <div className="userPageContainer">
        <div className="bannerHomeUser">
          <Slider images={[AboutBanner]} />
        </div>
        <div className="contentAbout">
          <section className="rowAbout">
            <img src={AboutRowImageOne} alt="" />
            <div className="rowAbout__text">
              <h2>Who we are?</h2>
              <p className="rowAbout__paragraph">
                Burdeo Coffee is a young and energetic family-owned company
                dedicated to the production and sale of high-quality coffee
                beans. We strive to offer our customers the best quality and
                taste in every cup of coffee prepared at home. To achieve this,
                we seek the best coffee beans from the most exclusive coffee
                plantations in Latin America and process them with care to
                obtain a unique and delicious flavor. In addition to our coffee
                beans, we also offer a wide variety of teas and other coffee
                products to meet all the needs and tastes of our customers. We
                are proud to offer an exceptional product and we hope to share
                our passion for coffee with you soon.
              </p>
            </div>
          </section>
          <section className="rowAbout">
            <p className="rowAbout__paragraph right">
              At Burdeo Coffee, we are dedicated to providing our customers with
              the highest quality coffee experience possible. From the sourcing
              of our beans to the roasting and packaging process, we pay
              attention to every detail to ensure that our coffee is the best it
              can be. We are constantly striving to improve and innovate, and we
              are always on the lookout for new and exciting flavors to add to
              our product line. Whether you are a coffee connoisseur or just
              looking for a delicious cup of coffee to start your day, we have
              something for everyone. Thank you for choosing Burdeo Coffee.
            </p>
          </section>
          <section className="rowAbout">
            <p className="rowAbout__paragraph left">
              Our family business has been committed to excellence since our
              inception. We strive to offer our customers the best coffee beans
              from the most exclusive coffee plantations in Latin America and
              carefully process them to obtain a unique and delicious flavor.
              Our coffee beans are perfect for those who enjoy the experience of
              preparing their own coffee at home and are looking for a
              high-quality product. In addition to our coffee beans, we also
              offer a wide variety of teas and other coffee products to meet all
              the needs and tastes of our customers. We are proud to offer an
              exceptional product and we hope to share our passion for coffee
              with you soon.
            </p>
            <img src={AboutRowImageTwo} alt="" />
          </section>
        </div>
      </div>
    </>
  );
};
