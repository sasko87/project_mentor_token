import React from "react";
import "./errorPage.css";
import { Link } from "react-router-dom";
import Image404 from "../../assets/404.png";
import Section from "../../components/Section/Section";

const ErrorPage = () => {
  return (
    <Section className="error-page">
      <h1 className="error-page-title">Oops! Page Not Found</h1>
      <img src={Image404} alt="Error page image" className="error-page-image" />
      <p className="error-page-text">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link to="/" className="link-blue-button">
        Go Back to Home
      </Link>
    </Section>
  );
};

export default ErrorPage;
