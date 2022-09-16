import "./register.scss";

import { useState, useEffect } from "react";

import api from "../../../api/api";

const Register = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

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

  const handleSignup = async (e) => {
    e.preventDefault();
    const id = users.length ? users[users.length - 1].id + 1 : 1;
    const newUser = {
      id,
      username: user,
      password: pwd,
    };
    try {
      const response = await api.post("/users", newUser);
      const allUsers = [...users, response.data];
      setUsers(allUsers);
      setErrMsg("ثبت نام با موفقیت انجام شد.");
      setUser("");
      setPwd("");
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

  return (
    <>
      <section>
        <h3>{errMsg}</h3>
        <h2>ثبت نام</h2>
        <form onSubmit={handleSignup}>
          <div>
            <label htmlFor="username">نام کاربری: </label>
            <input
              type="text"
              id="user"
              autoComplete="off"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">رمز عبور: </label>
            <input
              type="password"
              id="pwd"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
            />
          </div>
          <button className="signuUpButton">ثبت نام</button>
        </form>
      </section>
    </>
  );
};

export default Register;
