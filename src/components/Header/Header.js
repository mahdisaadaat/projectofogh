import { Link } from "react-router-dom";
import "./header.scss";

const Header = ({ title }) => {
  return (
    <div className="Header">
      <div className="left">
        <h1>{title}</h1>
      </div>
      <div className="right">
        <Link className="login" to="/login">
          ورود
        </Link>
        <Link className="signup" to="/signup">
          ثبت نام
        </Link>
      </div>
    </div>
  );
};

export default Header;
