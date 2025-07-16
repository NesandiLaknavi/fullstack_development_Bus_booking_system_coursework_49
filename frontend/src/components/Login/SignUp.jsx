import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./SignUpPage.module.css";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoMdClose } from "react-icons/io";
import Image from "../../assest/bus13.jpg";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  terms: Yup.bool().oneOf([true], "You must accept the terms and conditions"),
});

export const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  const handleSubmit = (values) => {

    const user = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    localStorage.setItem("user", JSON.stringify(user));

    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
      navigate("/login");
    }, 3000);
  };

  return (
    <div className={styles.container}>

      <button
        className={styles.closeButton}
        onClick={() => navigate("/")}
        title="Close"
        style={{ color: "red" }}
      >
        X
      </button>


      <div className={styles.imageSection}>
        <img src={Image} alt="Bus" className={styles.image} />
      </div>

      <div className={styles.formSection}>
        <h1 className={styles.title}>Create an account</h1>
        <p className={styles.subtitle}>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className={styles.link}>
            Login
          </span>
        </p>
        <Formik
          initialValues={{
            name: storedUser.name || "",
            email: storedUser.email || "", 
            password: "",
            confirmPassword: "",
            terms: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className={styles.form}>
              {/* Name Field */}
              <div className={styles.inputGroup}>
                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
                  className={styles.input}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={styles.error}
                />
              </div>

              {/* Email Field */}
              <div className={styles.inputGroup}>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={styles.input}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.inputGroup}>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={styles.input}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.inputGroup}>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter Password"
                  className={styles.input}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.checkboxGroup}>
                <Field
                  type="checkbox"
                  name="terms"
                  className={styles.checkbox}
                />
                <span>
                  I agree to the{" "}
                  <a href="/terms" className={styles.link}>
                    Terms & Conditions
                  </a>
                </span>
                <ErrorMessage
                  name="terms"
                  component="div"
                  className={styles.error}
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Create an account
              </button>

              <div className={styles.orSection}>Or Register with</div>

              <button type="button" className={styles.googleButton}>
                <FcGoogle size={20} />
                Log in with Google
              </button>
            </Form>
          )}
        </Formik>
      </div>

      {showPopup && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <div className={styles.animationSection}></div>
            <p>Account created successfully!</p>
            <p>Redirecting to login...</p>
          </div>
        </div>
      )}
    </div>
  );
};
