import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  // const history = useHistory();
  let navigate = useNavigate();

  const [user, setuser] = useState({
    member_name: '',
    email: '',
    password: '',
    role: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
      await axios.post(
        'http://localhost:8080/users/new',
        user
      );
      
      navigate(`/users/${user.email}`);
    
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setuser({ ...user, [name]: value });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="member_name">Name</label>
              <input
                type="text"
                className="form-control"
                id="member_name"
                name="member_name"
                value={user.member_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role:</label>
              <select
               className="form-control"
                id="role"
                name="role"
                value={user.role}
                onChange={handleChange}
                >
                <option value="ADMIN">Teacher</option>
                <option value="USER">Student</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
          <p className="mt-3">
            Already have an account? <Link to="http://localhost:8080/users/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
