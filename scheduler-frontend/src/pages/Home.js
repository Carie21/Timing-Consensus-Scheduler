import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
// import { useSelector } from 'react-redux'

export default function Home() {
    
  const [user2, setUser2] = useState({
    name: "",
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
    name: "",
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

  const [tableData, setTableData] = useState(
    [
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
    ],
  );
  console.log(tableData)

  const { id } = useParams();

  const [formName, setFormName] = useState({ name: ''});


// const [homeuser, setHomeUser] = useState(null);
//   const token = useSelector((state) => state.token);

//   const getUser = async () => {
//     const response = await fetch(`http://localhost:8080/users/${id}`, {
//       method: "GET",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await response.json();
//     setHomeUser(data);
//   };

//   if(!homeuser) return null;

 

  useEffect(() => {
    loadUser();
  }, );


  useEffect(() => {
    const result = [];
  for (let i = 0; i < user.slots_taken.length; i++) {
    const row = [];
    for (let j = 0; j < user.slots_taken[0].length; j++) {
      row.push(Boolean(user.slots_taken[i][j] + user2.slots_taken[i][j]));
    }
    result.push(row);
    }
    setTableData(result);
  }, [user2]);



  useEffect(() => {
    console.log(tableData);
  }, [tableData]);



console.log(tableData);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/users/${id}`);
    setUser(result.data);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.get(`http://localhost:8080/users/${formName.name}`);
    await setUser2(result.data);
    // console.log(user2.slots_taken);
    
  };

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormName({ ...formName, [name]: value });
  };

  const cellStyle = (isTaken) => {
    const color = isTaken ? "red" : "green";
    return {
      backgroundColor: color,
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    };
  };

  console.log(tableData)

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
        {console.log(tableData)}
      </div>
    </div>
    <div class="col-md-10">
      <h2 class="text-center">View Other Person's Schedule</h2>
      <form onSubmit={handleSubmit}>
      <div class="form-group">
        <label for="personName">Person's Name</label>
        <input type="text" class="form-control" 
        name="name"
        value={formName.name}
        onChange={handleChange}
        id="personName"  placeholder="Enter name"></input>
      </div>
      
      <button class="btn btn-primary"
      type="submit">View Schedule</button>
      </form>
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
            {user2.slots_taken.map((row, i) => (
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
          {console.log(tableData)}
        </div>
      </div>
    </div>

    <div class="mt-4">
        <h4>Joint Schedule</h4>
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
            {console.log(tableData)}
            <tbody>
            {tableData.map((row, i) => (
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
        <Link className="btn btn-outline-light" to={`/edituser/${id}`}>
            edit
          </Link>
 

  </div>
</div>

  );
}
