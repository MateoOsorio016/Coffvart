import {FaFacebookF, FaInstagram} from 'react-icons/fa'; 

import './FooterSimple.css'

export const FooterSimple = () => {
  return (
    <footer className="footerSimple">
      <span>© Burdeo coffee 2023 all rights reserved</span>
      <span>
        <a href="https://www.facebook.com" target="_blank">
          <FaFacebookF />
        </a>
        <a href="https://www.instagram.com" target="_blank">
          <FaInstagram />
        </a>
      </span>
      <span>coffVart</span>
    </footer>
  );
};
