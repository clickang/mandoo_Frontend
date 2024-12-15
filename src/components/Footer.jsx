import { Fragment } from "react";
import { FooterImg, FooterContainer } from "./styles";
import footer from "../images/footer.png";
const Footer = () => {
  return (
    <Fragment>
      <FooterContainer>
        <FooterImg src={footer} alt="footer_img" />
      </FooterContainer>
    </Fragment>
  );
};

export default Footer;
