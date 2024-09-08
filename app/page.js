"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from "/firebase"; // Import your Firestore instance

export default function Home() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false); // New state for thank you message

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    // Store the user's info (first name, last name, and email) in Firestore
    try {
      const docRef = await addDoc(collection(db, "signups"), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        timestamp: new Date(), // Store the current timestamp
      });
      console.log("User info added with ID: ", docRef.id);
      // Clear the input fields after successful submission
      setFirstName("");
      setLastName("");
      setEmail("");
      setIsSignedUp(true); // Change state to show thank you message
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(`.${styles.featureItem}, .${styles.useCaseItem}, .${styles.signUpSection}`);
  
      sections.forEach((section) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            section.classList.add(styles.visible);
          } else {
            section.classList.remove(styles.visible);
          }
        }
      });
    };
  
    window.addEventListener("scroll", handleScroll);
  
    // Run on mount to make sure visible elements are correctly displayed
    handleScroll();
  
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  

  const scrollToSection = (sectionClass) => {
    const section = document.querySelector(sectionClass);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className={styles.main}>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="Stocked Logo" width={150} height={40} />
        </div>
        <nav className={styles.nav}>
        <button 
          className={styles.navButton} 
          onClick={() => window.location.href = '/'}>
          Home
        </button>
          <button className={styles.navButton} onClick={() => scrollToSection(`.${styles.features}`)}>Features</button>
          <button className={styles.navButton} onClick={() => scrollToSection(`.${styles.useCases}`)}>Use Cases</button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1>Welcome to Stockify</h1>
          <p>The future of inventory management, powered by <span className={styles.gradientText}>AI</span>.</p>
          <div className={styles.buttonGroup}>
            <button className={styles.signUpButton} onClick={() => scrollToSection(`.${styles.signUpSection}`)}>Sign Up</button>
          </div>
        </div>
        <div className={styles.heroImage}>
          <Image src="/homepage-Photoroom.png" alt="Stocked Hero Image" width={700} height={700} />
        </div>
      </section>

      {/* Key Features Section */}
      <section className={styles.features}>
        <h2>Key Features</h2>
        <div className={styles.featureItem}>
          <div className={styles.featureText}>
            <h3>Inventory Tracking</h3>
            <p>Optimize inventory management with AI to prevent stockouts in real-time.</p>
          </div>
          <div className={styles.featureImage}>
            <Image src="/storage.png" alt="Inventory Tracking" width={100} height={100} />
          </div>
        </div>
        <div className={styles.featureItem}>
          <div className={styles.featureText}>
            <h3>Seamless UI</h3>
            <p>Gain real-time visibility into stock levels with AI-powered insights and analytics.</p>
          </div>
          <div className={styles.featureImage}>
            <Image src="/chart.png" alt="Seamless UI" width={100} height={100} />
          </div>
        </div>
        <div className={styles.featureItem}>
          <div className={styles.featureText}>
            <h3>AI Voice Recognition</h3>
            <p>Effortlessly add, update, or remove inventory through voice commands</p>
          </div>
          <div className={styles.featureImage}>
            <Image src="/Ai.png" alt="AI Voice Recognition" width={100} height={100} />
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className={styles.useCases}>
        <h2>Use Cases</h2>
        <div className={styles.useCaseGrid}>
          <div className={styles.useCaseItem}>
            <Image src="/manufacture.png" alt="Manufacturers" width={80} height={80} />
            <h3>Manufacturers</h3>
            <p>Track materials and products from start to finish.</p>
          </div>
          <div className={styles.useCaseItem}>
            <Image src="/storage.png" alt="Wholesalers" width={80} height={80} />
            <h3>Wholesalers</h3>
            <p>Manage bulk inventory and streamline restocking processes.</p>
          </div>
          <div className={styles.useCaseItem}>
            <Image src="/ecom.png" alt="Retailers" width={80} height={80} />
            <h3>Retailers & E-commerce</h3>
            <p>Stay on top of your stock levels across various platforms.</p>
          </div>
        </div>
      </section>

      {/* Sign-Up Section */}
      <section className={styles.signUpSection}>
        {!isSignedUp ? (
          <>
            <h2>Sign Up for Early Access</h2>
            <p>Be the first to access Stockify when it launches!</p>
            <form onSubmit={handleEmailSubmit}>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                required
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
              <button type="submit">Sign Up</button>
            </form>
          </>
        ) : (
          <div className={styles.thankYouSection}>
            <h2>Thank You for Signing Up!</h2>
            <p>We will be in touch with exclusive early access as we prepare to launch Stockify. Stay tuned for exciting updates!</p>
          </div>
        )}
      </section>

      {/* Footer Section */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          {/* Logo and navigation links */}
          <div className={styles.footerLeft}>
            <Image src="/logo.png" alt="Stocked Logo" width={30} height={30} />
            <div className={styles.footerNav}>
            <button 
            className={styles.navButton} 
            onClick={() => window.location.href = '/'}>
            Home
          </button>
              <button className={styles.navButton} onClick={() => scrollToSection(`.${styles.features}`)}>Features</button>
              <button className={styles.navButton} onClick={() => scrollToSection(`.${styles.useCases}`)}>Use Cases</button>
            </div>
          </div>
          {/* Copyright text */}
          <div className={styles.footerRight}>
            <p>© Stockify AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
