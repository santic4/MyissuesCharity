import '../styles/pages/aboutUs.css';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

export default function AboutUs() {
  return (
    <section className="aboutUsSection">
      <h1 className="aboutUsHeading">About Myissues Charity</h1>
      <p className="aboutUsText">
        We are a mission-driven charity working across food insecurity, housing, and senior care. With dedicated volunteers and cutting-edge AI like DAISHA, we ensure support reaches those who need it most.
      </p>

      <div className="aboutUsContentContainer">
        <img
          src="/myissuescharity-logo-transparent.png"
          alt="Logo"
          className="aboutUsLogoImage"
        />

        <div className="aboutUsSocialContainer">
          <a
            href="https://www.facebook.com/myissuescharity"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="aboutUsSocialIcon"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.instagram.com/myissuescharity/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="aboutUsSocialIcon"
          >
            <FaInstagram />
          </a>
          <a
            href="https://x.com/MyissuesC"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="aboutUsSocialIcon"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://www.youtube.com/@MyissuesCharity"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="aboutUsSocialIcon"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </section>
  );
}
