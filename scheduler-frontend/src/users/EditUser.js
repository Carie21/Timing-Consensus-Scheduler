import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ViewUser() {

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    slots_taken: [
      [false, false],
      [false, false],
    ],
  });

  const { id } = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/users/${id}`);
    setUser(result.data);
  };

  const handleCellClick = (row, col) => {
    const newSlotsTaken = user.slots_taken.map((rowArr, i) =>
      i === row ? rowArr.map((isTaken, j) => (j === col ? !isTaken : isTaken)) : rowArr
    );
    setUser({ ...user, slots_taken: newSlotsTaken });
  };

  const cellStyle = (isTaken) => ({
    backgroundColor: isTaken ? "red" : "green",
    cursor: "pointer",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:8080/users/${id}`, user);
      navigate(`/users/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (e) => {
    try {
      await axios.delete(`http://localhost:8080/users/${id}`, user);
      navigate(`/`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
  <div className="row">
    <div className="col-md-10 offset-1 border rounded p-4 mt-2 shadow">
      <h2 className="text-center m-4">User Details</h2>

      <div className="card">
        {/* <div className="card-header">
          Details of user id: {user.id}
        </div> */}
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>Name:</b>
            <input type="text" className="form-control" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
          </li>
          <li className="list-group-item">
            <b>Email:</b>
            <input type="email" className="form-control" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
          </li>
          <li className="list-group-item">
            <b>Role:</b>
            <select className="form-control" value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
              <option value="USER">Student</option>
              <option value="ADMIN">Teacher</option>
            </select>
          </li>
          <li className="list-group-item">
            <b>Password:</b>
            <input type="password" className="form-control" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
          </li>
        </ul>
      </div>

      <div className="table-responsive mt-4">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Day</th>
              <th>9-10</th>
              <th>10-11</th>
              <th>11-12</th>
              <th>12-1</th>
              <th>1-2</th>
              <th>2-3</th>
              <th>3-4</th>
              <th>4-5</th>
            </tr>
          </thead>
          <tbody>
            {user.slots_taken.map((row, i) => (
              <tr key={i}>
                <td>{daysOfWeek[i]}</td>
                {row.map((isTaken, j) => (
                  <td key={`${i}-${j}`} style={cellStyle(isTaken)}>
                    <input type="checkbox" checked={isTaken} onChange={() => handleCellClick(i, j)} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form onSubmit={handleSubmit}>
  <div className="d-flex justify-content-center align-items-center">
    <button type="submit" className="btn btn-primary btn-md mx-5 mt-3" onClick={handleSubmit}>
      Save Changes
    </button>
    <Link className="btn btn-secondary btn-md mx-5 mt-3" to={`/users/${id}`}>
      Cancel Changes
    </Link>
    <button type="button" className="btn btn-danger btn-md mt-3 mx-5" onClick={handleDelete}>
  Delete User
</button>
  </div>
</form>

    </div>
  </div>
</div>


  );
}
