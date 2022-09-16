import "./login.scss";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../../api/api";

const Login = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        setUsers(res.data);
      } catch (error) {
        if (error.res) {
          // Not in the 200 response range
          console.log(error.res.data);
          console.log(error.res.status);
          console.log(error.res.headers);
        } else {
          console.log(`Error: ${error.message}`);
        }
      }
    };
    fetchUsers();
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    for (let i = 0; i <= users.length; i++) {
      if (user === users[i].username) {
        setSuccess(true);
      } else {
        setErrMsg("username / password is wrong");
      }
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>شما با موفقیت وارد شدید.</h1>
          <br />
          <p>
            <Link to="/">برگشت</Link>
          </p>
        </section>
      ) : (
        <section>
          <p className="errorMessage">{errMsg}</p>
          <h2>ورود</h2>
          <form onSubmit={handleAuth}>
            <div>
              <label htmlFor="username">نام کاربری :</label>
              <input
                type="text"
                id="username"
                autoComplete="off"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">رمز عبور :</label>
              <input
                type="password"
                id="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                required
              />
            </div>
            <button className="signInButton">وارد شوید</button>
          </form>
          <a href="/signup" className="signupNow">
            ثبت نام نکرده اید؟
          </a>
        </section>
      )}
    </>
  );
};

export default Login;
