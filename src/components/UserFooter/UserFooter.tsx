import { useState } from "react";
import { createPortal } from "react-dom";

import { FaFacebookF, FaInstagram } from "react-icons/fa";
import "./UserFooter.css";

import LogoBurdeos from '../../assets/BurdeoFullLogo.png'
import { Button } from "../Button/Button";
import { SubscribeModal } from "../SubscribeModal/SubscribeModal";

export const UserFooter = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <footer>
      <div className="userFooter__rowOne">
        <div className="userFooter__col">
          <h4>Follow Us</h4>
          <ul className="userFooter__socialMedia">
            <li>
              <a href="https://www.facebook.com" target="_blank">
                <FaFacebookF />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com" target="_blank">
                <FaInstagram />
              </a>
            </li>
          </ul>
        </div>
        <div className="userFooter__col">
          <h4>Company</h4>
          <ul>
            <li>
              <a href="#">Terms and conditions</a>
            </li>
            <li>
              <a href="#">Privacy policy</a>
            </li>
          </ul>
        </div>
        <div className="userFooter__col">
            <img src={LogoBurdeos} alt="" />
        </div>
        <div className="userFooter__col">
            <h4>Help</h4>
            <ul>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">FQA</a></li>
                <li><a href="#">Order Status</a></li>
                <li><a href="#">Returns & Warranty</a></li>
            </ul>
        </div>
        <div className="userFooter__col">
            <h4>Newsletter</h4>
            <Button text={'Subscribe'} onClick={()=>setIsOpenModal(true)} fill={false}/>
        </div>
      </div>
      <div className="userFooter__rowTwo">
        <span>© Burdeo coffee 2023 all rights reserved</span>
        <span>coffVart</span>
      </div>
      {
        isOpenModal && (
          createPortal(
            <SubscribeModal showModal={setIsOpenModal}/>,
            document.getElementById('modal') as HTMLElement
          )
        )
      }
    </footer>
  );
};
