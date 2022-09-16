import "./about.scss";
import myLogo from "../../assets/images/myLogo.png";

import { Link } from "react-router-dom";

const About = () => {
  return (
    <main className="About">
      <h2>درباره من</h2>
      <img src={myLogo} alt="" />
      <p>این سایت توسط بنده، سید مهدی سادات طراحی شده،</p>
      <p>
        بنده یک پروژه typeScript هم انجام داده ام که لینک پروژه رو همین جا
        میزارم خدمتتون.
      </p>
      <p>برای مشاهده پروژه های دیگر بنده به لینک زیر مراجعه بفرمایید:</p>
      پروژه تایپ اسکریپت
      <br />
      <a
        href="https://github.com/mahdisaadaat/typescript_project"
        style={{ color: "blue" }}
      >
        Typescript Project
      </a>
      <br></br>
      پروژه های دیگر
      <br />
      <a href="https://github.com/mahdisaadaat" style={{ color: "blue" }}>
        Other Projects
      </a>
      <br></br>
      <Link to="/">
        <button className="goBack">برگشت</button>
      </Link>
    </main>
  );
};

export default About;
