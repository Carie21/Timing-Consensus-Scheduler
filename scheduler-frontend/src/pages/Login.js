import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function ViewUser() {
  const [user, setUser] = useState({
    member_name: "",
    email: "",
    password: "",
    role: false,
  });


  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/usercheck/${email}`);
    setUser(result.data);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/user", user);
    navigate("/");
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate(`/users/${id}`);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Login</h2>

          <form onSubmit={(e) => login(e)}>
          <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                E-mail
              </label>
              <input
                type={"email"}
                className="form-control"
                placeholder="Enter your e-mail address"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input
                type={"password"}
                className="form-control"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            
            <button type="submit" className="btn btn-outline-primary">
              Login
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/adduser">
              Dont have an account? register
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}