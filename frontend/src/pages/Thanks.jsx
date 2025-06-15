import { useNavigate } from 'react-router-dom';
import '../styles/pages/thanksPage.css';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

export default function Thanks() {
  const navigate = useNavigate();

  return (
    <div className="thanksContainer">
      <img src='../../../public/myissuescharity-logo-transparent.png' alt="Logo" className="thanksLogoImage" />
      <h2 className="thanksTitle">Thank you for your donation!</h2>
      <p className="thanksMessage">
        Your contribution makes a difference and helps us fulfill our mission.
      </p>
      <button
        className="thanksButton"
        onClick={() => navigate('/user')}
      >
        Return to home
      </button>

      <div className='thanksSocialContainer'>
        <a href="https://www.facebook.com/myissuescharity" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FaFacebookF />
        </a>
        <a href="https://www.instagram.com/myissuescharity/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="https://x.com/MyissuesC" target="_blank" rel="noopener noreferrer" aria-label="X">
          <FaXTwitter />
        </a>
        <a href="https://www.youtube.com/@MyissuesCharity" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <FaYoutube />
        </a>
      </div>
    </div>
  );
}
