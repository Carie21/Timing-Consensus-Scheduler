import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Home() {
  const [user2, setUser2] = useState({
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

  // const [formName, setformName] = useState({
  //   member_name: "",
  //   join: false,
  // });

  const handleCellClick = (row, col) => {
    const newSlotsTaken = user.slots_taken.map((rowArr, i) =>
      i === row ? rowArr.map((isTaken, j) => (j === col ? !isTaken : isTaken)) : rowArr
    );
    setUser({ ...user, slots_taken: newSlotsTaken });
  };

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/api/users/${id}`);
    setUser(result.data);
  };

  const loadUser2 = async () => {
    const result = await axios.get(`http://localhost:8080/api/users2/${user2.member_name}`);
    setUser2(result.data);
  };

  useEffect(() => {
    loadUser2();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:8080/api/users/${id}`);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  

  // const deleteUser = async (id) => {
  //   await axios.delete(`http://localhost:8080/user/${id}`);
  //   loadUsers();
  // };

  const cellStyle = (isTaken) => ({
    backgroundColor: isTaken ? "red" : "green",
  });

  return (
    <div class="container">
  <div class="row mt-5">
    <div class="col-md-10">
      <h2 class="text-center">My Schedule</h2>
      <div class="table-responsive">
        <table class="table table-bordered">
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
                <td>{i + 1}</td>
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
    </div>
    <div class="col-md-10">
      <h2 class="text-center">View Other Person's Schedule</h2>
      <div class="form-group" onSubmit={handleSubmit}>
        <label for="personName">Person's Name</label>
        <input type="text" class="form-control" id="personName" placeholder="Enter name"/>
      </div>
      <div class="form-group">
        <label for="scheduleType">Schedule Type</label>
        <select class="form-control" id="scheduleType">
          <option>Joint</option>
          <option>Individual</option>
        </select>
      </div>
      <button class="btn btn-primary">View Schedule</button>
      <div class="mt-4">
        <h4>Other Person's Schedule</h4>
        <div class="table-responsive">
          <table class="table table-bordered">
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
              <tr>
                <td>Monday</td>
                <td>Taken</td>
                <td>Available</td>
                <td>Available</td>
                <td>Taken</td>
                <td>Available</td>
                <td>Taken</td>
                <td>Available</td>
              </tr>
              <tr>
                <td>Tuesday</td>
                <td>Available</td>
                <td>Available</td>
                <td>Taken</td>
                <td>Available</td>
                <td>Taken</td>
                <td>Available</td>
                <td>Taken</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}