import React from "react";
import styles from "./TeamSection.module.css";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import { FaLinkedin } from "react-icons/fa6";
import img1 from "../../assest/bina.jpg";
import img2 from "../../assest/nes.jpg";
import img3 from "../../assest/gvn.jpg";
import img4 from "../../assest/kay.jpeg";
import img5 from "../../assest/vdu.jpg";
import img6 from "../../assest/dp5.jpg";
import img8 from "../../assest/bg11.jpg";

export default function TeamSection() {
  const teamMembers = [
    {
      id: 1,
      name: "Binaramalee Jayakody",
      Link: "http://linkedin.com/in/binaramalee-jayakody-697500256",
      img: img1,
    },
    {
      id: 2,
      name: "Nesandi Laknavi ",
      Link: "https://www.linkedin.com/in/nesandi-laknavi-premathilaka-233065294",
      img: img2,
    },
    {
      id: 3,
      name: "Gaveen Amarasinghe ",
      Link: "https://www.linkedin.com/in/gaveen-amarasinghe-9ab360257",
      img: img3,
    },
    {
      id: 4,
      name: "Vidhu Perera ",
      Link: "https://www.linkedin.com/in/vidhu-perera-212299330",
      img: img5,
    },
    {
      id: 5,
      name: "Dilmi Dayoda",
      Link: "https://www.linkedin.com/in/dilmi-dayoda",
      img: img6,
    },
    {
      id: 6,
      name: "Kavindya Basnayake ",
      Link: "https://www.linkedin.com/in/kavindya-basnayake-0a6282253",
      img: img4,
    },
  ];

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.title}>
        Our <span className={styles.highlight}>Developing</span> Team
      </h1>
      <div className={styles.grid}>
        {teamMembers.map((member) => (
          <div key={member.id} className={styles.card}>
            <img
              src={member.img}
              alt={member.name}
              className={styles.cardImage}
            ></img>
            <h2 className={styles.cardTitle}>Member {member.id}</h2>
            <p className={styles.cardName}>{member.name}</p>
            <p className={styles.cardName}>
              <a href={member.Link} target="_blank" rel="noopener noreferrer">
                <FaLinkedin
                  style={{
                    width: "2em",
                    height: "2em",
                    marginTop: "1em",
                    color: "blue",
                  }}
                />
              </a>
            </p>
          </div>
        ))}
      </div>
      <br/>
      <p className={styles.phrase}>Meet the passionate collaborators behind our innovative projects, dedicated to finding solutions for everyday challenges and pushing boundaries to deliver excellence</p>
      <Footer />
    </div>
    
  );
}
