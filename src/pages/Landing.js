import React from "react";
import { Link } from "@reach/router";
import Header from "../components/Header";

const Landing = () => (
  <div className="container">
    <Header />
    <h2>Landing Page</h2>
    <Link to="about">About page</Link>
  </div>
);

export default Landing;
