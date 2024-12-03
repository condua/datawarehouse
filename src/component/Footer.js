import React, { useState, useEffect } from "react";
import "../scss/component/Footer.scss";
import logo from "../images/logo1.png";

const emailAddress = "phanhoangphuc05092002@gmail.com";

const EmailLink = ({ email }) => {
  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <a
      style={{ color: "white", textDecoration: "none", fontSize: "15px" }}
      href={`mailto:${email}`}
      onClick={handleEmailClick}
    >
      {email}
    </a>
  );
};

const Footer = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="Footer">
      {isMobileView ? (
        <div
          className="bgtrans-overlay"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p>
            💌 <EmailLink email={emailAddress} />
          </p>
        </div>
      ) : (
        <div className="bgtrans-overlay">
          <div className="footer-content">
            <div
              className="footer-content-detail"
              style={{
                width: "30%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",

                gap: "20px",
              }}
            >
              <h3 style={{ fontWeight: "bolder" }}>Mybk Technology</h3>
              <img className="logoP" alt="" src={logo} />
            </div>
            <div
              className="footer-content-detail"
              style={{
                width: "10%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <h3 style={{ fontWeight: "bolder" }}>WEBSITE</h3>
              <h3>
                <a href="https://mybk.tech/" target="blank">
                  My Website
                </a>
              </h3>
              <h3>
                <a href="https://mybk.tech/tracuu" target="blank">
                  Search
                </a>
              </h3>
              <h3>
                <a href="https://mybk.tech/newslit" target="blank">
                  News
                </a>
              </h3>
            </div>
            <div
              className="footer-content-detail"
              style={{
                width: "35%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "left",
                gap: "20px",
              }}
            >
              <h3 style={{ fontWeight: "bolder", textAlign: "left" }}>
                LIÊN HỆ
              </h3>
              <p>📌</p>
              <p>📞</p>
              <p>
                💌 <EmailLink email={emailAddress} />
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="footer-bottom">
        <span className="text-xxs md:text-2xl">
          Copyright © By Phan Hoàng Phúc - 2024
        </span>
      </div>
    </div>
  );
};

export default Footer;
