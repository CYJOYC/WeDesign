import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LandingMain from "../../components/LandingMain";

export default class Landing extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <LandingMain/>
        <Footer />
      </React.Fragment>
    );
  }
}
