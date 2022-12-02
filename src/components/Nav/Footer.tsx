import "./Nav.css";
import logo from "./logo.png";

export default function Footer(props: any) {

    return (
      <div className="Footer">
        <div className="footer-main">
          <p className="footer-copyright">
            © 2022 CryptoTracker. All rights reserved
          </p>
        </div>

        <div className="footer-dir">
          <div className="dir-col">
            <p className="dir-title">Products</p>
            <div className="dir-list">
              <p className="dir-item">
                <a className="nav-link" href="https://cryptotracker-mendoza.netlify.app/">
                  CryptoTracker
                </a>
              </p>
              <p className="dir-item">
                <a className="nav-link" href="https://cryptonews-mendoza.netlify.app/">CryptoNews</a>
              </p>
              <p className="dir-item">
                <a className="nav-link" href="https://cryptoportfolio-mendoza.netlify.app/">
                  CryptoPortfolio
                </a>
              </p>
              <p className="dir-item">
                <a className="nav-link" href="https://cryptowidgets.netlify.app/">CryptoWidgets</a>
              </p>
            </div>
          </div>
          <div className="dir-col">
            <p className="dir-title">Company</p>
            <div className="dir-list">
              <p className="dir-item">
                <a className="nav-link" href="https://github.com/mrmendoza171" target="_blank">
                  Github
                </a>
              </p>
              <p className="dir-item">
                <a className="nav-link" href="">About Us</a>
              </p>
            </div>
          </div>
          <div className="dir-col">
            <p className="dir-title">Support</p>
            <div className="dir-list">
              <p className="dir-item">
                <a className="nav-link" href="">Request Form</a>
              </p>
              <p className="dir-item">
                <a className="nav-link" href="">FAQ</a>
              </p>
              <p className="dir-item">
                <a className="nav-link" href="">Glossary</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
}
