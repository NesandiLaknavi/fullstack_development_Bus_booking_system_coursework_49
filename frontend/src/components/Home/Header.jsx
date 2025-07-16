import React from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export function Header() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");

  const handleUserButtonClick = () => {
    navigate("/profile");
  };

  const handleLoginButtonClick = () => {
    navigate("/login");
  };

  const handleHelpButtonClick = () => {
    navigate("/help");
  };

  const handleTeamButtonClick = () => {
    navigate("/team");
  };

  const handleAboutButtonClick = () => {
    navigate("/about");
  };

  return (
    <header className={styles.header} role="banner">
      <nav
        className={styles.navigation}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className={logo.png} role="heading" aria-level="1">
          <a href="/" className={styles.logoLink}>
            <img src={logo} alt="BOOKME Logo" className={styles.logoImage} />
            BOOKME
          </a>
        </div>
        <div className={styles.navLinks}>
          <button
            className={styles.navButton}
            onClick={handleAboutButtonClick}
          >
            About us
          </button>

          <button
            className={styles.navButton}
            onClick={handleTeamButtonClick}
          >
            Team
          </button>

          <button
            className={styles.navButton}
            onClick={handleHelpButtonClick}
          >
            Help
          </button>

          {storedUser ? (
            <button
              className={styles.navButton}
              onClick={handleUserButtonClick}
              aria-label="User profile"
            >
              Profile
            </button>
          ) : (
            <button
              className={styles.navButton}
              onClick={handleLoginButtonClick}
              aria-label="Login to your account"
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}