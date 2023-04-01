import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "./Footer";
import Notification from "../components/Notification";
import Meta from "../components/Meta";
import ReactGA from "react-ga";

if (process.env.NODE_ENV === "production") {
  if (typeof window !== "undefined") {
    ReactGA.initialize("UA-41524322-19");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
}

class Page extends Component {
  render() {
    return (
      <>
        <Meta />
        <Header />
        <div className='main'>{this.props.children}</div>
        <Footer />
      </>
    );
  }
}

export default Page;
