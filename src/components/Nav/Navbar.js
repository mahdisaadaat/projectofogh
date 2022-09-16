import "./navbar.scss";

import { Link } from "react-router-dom";

const Navbar = ({ search, setSearch, darkNight, setDarkNight }) => {
  return (
    <nav className="Nav">
      <div className="container">
        <ul>
          <li>
            <button
              className="darkNightBtn"
              onClick={() => {
                if (darkNight == false) {
                  setDarkNight(true);
                } else {
                  setDarkNight(false);
                }
              }}
            >
              حالت شب
            </button>
          </li>
          <li>
            <Link
              to="/"
              style={{
                textDecoration: "none",
              }}
            >
              خانه
            </Link>
          </li>
          <li>
            <Link
              to="/post"
              style={{
                textDecoration: "none",
              }}
            >
              ثبت آگهی
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              style={{
                textDecoration: "none",
              }}
            >
              درباره من
            </Link>
          </li>
        </ul>
        <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
          <input
            className="search"
            id="search"
            type="text"
            placeholder="جستجو آگهی..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
