import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { IoMdClose } from "react-icons/io";
import Image from "../../assest/bus12.jpg";


const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const LoginPage = () => {
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();


  const handleSignUpClick = () => {
    navigate("/signin"); 
  };


  const handleLoginSubmit = (values) => {

    if (values.email === "admin@gmail.com" && values.password === "admin1234") {
      navigate("/admin");
      return;
    }


    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      values.email === storedUser.email &&
      values.password === storedUser.password
    ) {

      navigate("/");
    } else {

      setLoginError("Incorrect email or password");
    }
  };

  return (
    <div className={styles.container}>
      {/* Close Button */}
      <button
        className={styles.closeButton}
        onClick={() => navigate("/")} // Navigate to the home page
        title="Close"
        style={{ color: "red" }}
      >
        X
      </button>

      {/* Left Side Image */}
      <div className={styles.imageSection}>
        <img src={Image} alt="Bus" className={styles.image} />
      </div>

      {/* Right Side Form */}
      <div className={styles.formSection}>
        <h1 className={styles.title}>Welcome back!</h1>
        <p className={styles.subtitle}>Please enter your details</p>

        {/* Login Form */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLoginSubmit}
        >
          {() => (
            <Form className={styles.form}>
              {/* Email Input */}
              <div className={styles.inputGroup}>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className={styles.input}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.error}
                />
              </div>

              {/* Password Input */}
              <div className={styles.inputGroup}>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className={styles.input}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.error}
                />
              </div>

              {/* Show error if login fails */}
              {loginError && <div className={styles.error}>{loginError}</div>}

              {/* Options */}
              <div className={styles.options}>
                <label className={styles.remember}>
                  <Field type="checkbox" name="remember" />
                  Remember for 30 days
                </label>
                <button type="button" className={styles.forgotPassword}>
                  Forget password
                </button>
              </div>

              {/* Log In Button */}
              <button type="submit" className={styles.loginButton}>
                Log in
              </button>

              {/* Log In with Google */}
              <button type="button" className={styles.googleButton}>
                <FcGoogle size={20} />
                Log in with Google
              </button>

              {/* Footer */}
              <div className={styles.footer}>
                <span>Don't have an account?</span>
                <button
                  type="button"
                  className={styles.signUpLink}
                  onClick={handleSignUpClick}
                >
                  Sign up
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
