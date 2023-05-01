import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewUser() {
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
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Details</h2>

          <div className="card">
            <div className="card-header">
              Details of user id : {user.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name:</b>
                  {user.name}
                </li>
                <li className="list-group-item">
                  <b>email:</b>
                  {user.email}
                </li>
                <li className="list-group-item">
                  <b>Role:</b>
                  {user.role}
                </li>
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <table>
              <tbody>
                {user.slots_taken.map((row, i) => (
                  <tr key={i}>
                    {row.map((isTaken, j) => (
                      <td
                        key={`${i}-${j}`}
                        style={cellStyle(isTaken)}
                        onClick={() => handleCellClick(i, j)}
                      >
                        {isTaken ? "Taken" : "Available"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <button type="submit" className="btn btn-primary my-2">
              Save Changes
            </button>
          </form>

          <Link className="btn btn-secondary my-2" to={`/users/${id}`}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
