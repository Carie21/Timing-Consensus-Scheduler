import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewUser() {
  const [user, setUser] = useState({
    member_name: "",
    email: "",
    password: "",
    role: "",
    slots_taken: [
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
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

  const cellStyle = (isTaken) => ({
    backgroundColor: isTaken ? "red" : "green",
  });

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

          <div class="table-responsive">
          <table class="table table-bordered">
          <thead>
      <tr>
        <th>Column 1</th>
        <th>Column 2</th>
        <th>Column 3</th>
        <th>Column 4</th>
        <th>Column 5</th>
        <th>Column 6</th>
        <th>Column 7</th>
        <th>Column 8</th>
      </tr>
    </thead>
            <tbody>
              {user.slots_taken.map((row, i) => (
                <tr key={i}>
                  {row.map((isTaken, j) => (
                    <td key={`${i}-${j}`} style={cellStyle(isTaken)}>
                      {isTaken ? "Taken" : "Available"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
