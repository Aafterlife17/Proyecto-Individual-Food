import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import style from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={style.landing_container}>
      <div className={style.landing_text_container}>
        <h1 className={style.landing_h1}>
          Nourish your <span className={style.h1_word}>creativity</span>
        </h1>
        <p className={style.landing_p}>
          Explore new ways to improve your meals
        </p>
        <Link to="/home">
          <button className={style.landing_button}>Enter</button>
        </Link>
      </div>

      <div className={style.landing_footer}>
        <div className={style.footer_discover}>
          <h3 className={style.discover_h1}>Discover</h3>
          <span className={style.discover_span}>
            recipes from all around the world
          </span>
        </div>

        <div className={style.footer_create}>
          <h3 className={style.create_h1}>Create</h3>
          <span className={style.create_span}>
            step-by-step recipes of your own
          </span>
        </div>

        <div className={style.footer_enjoy}>
          <h3 className={style.enjoy_h1}>Enjoy</h3>
          <span className={style.enjoy_span}>your meals like never before</span>
        </div>
      </div>
    </div>
  );
};

export default Landing;
