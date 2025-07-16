import React from "react";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footerContainer}>
        <div className={styles.logoSection}>
          <a href="/" className={styles.logoLink}>
            BOOKME
          </a>
          <img
            src="logo.png" // Replace with the actual path to your logo image
            alt="BOOKME Logo"
            className={styles.logoImage}
          />
          <p className={styles.tagline}>Explore. Dream. Discover.</p>
        </div>
        <div className={styles.linksSection}>
          <nav aria-label="Footer navigation">
            <ul className={styles.footerLinks}>
              <li>
                <a href="/about" className={styles.footerLink}>
                  About Us
                </a>
              </li>
              <li>
                <a href="/team" className={styles.footerLink}>
                  Team
                </a>
              </li>
              <li>
                <a href="/help" className={styles.footerLink}>
                  Help
                </a>
              </li>
              <li>
                <a href="/privacy" className={styles.footerLink}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className={styles.footerLink}>
                  Terms of Service
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.socialMediaSection}>
          <p>Follow us:</p>
          <div className={styles.socialIcons}>
            <a
              href="https://facebook.com"
              className={styles.socialLink}
              aria-label="Facebook"
            >
              🌐
            </a>
            <a
              href="https://twitter.com"
              className={styles.socialLink}
              aria-label="Twitter"
            >
              🌐
            </a>
            <a
              href="https://instagram.com"
              className={styles.socialLink}
              aria-label="Instagram"
            >
              🌐
            </a>
          </div>
        </div>
      </div>
      <div className={styles.copyrightSection}>
        <p>&copy; {new Date().getFullYear()} BOOKME. All rights reserved.</p>
      </div>
    </footer>
  );
}