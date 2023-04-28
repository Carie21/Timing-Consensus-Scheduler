import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewUser() {
  const [user, setUser] = useState({
    member_name: "",
    email: "",
    password: "",
    role: "",
  });

  const [schedule, setSchedule] = useState({
    slots_taken: [],
  });


  const { id , date} = useParams();

  useEffect(() => {
    loadUser();
    loadSchedule();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/${id}`);
    setUser(result.data);
  };

  const loadSchedule = async () => {
    const result = await axios.get(`http://localhost:8080/api/schedules/0/1`);
    setSchedule(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Details</h2>

          <div className="card">
            <div className="card-header">
              Details of user id : {user.member_id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name:</b>
                  {user.member_name}
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


          <table class="table table-sm">
  <thead>
    <tr>
      <th scope="col">9-10</th>
      <th scope="col">10-11</th>
    </tr>
  </thead>
  <tbody>
  

<tr class="bg-success"><td class="bg-primary">{schedule.slots_taken[0]}</td>
  <td class="bg-success">{schedule.slots_taken[0]}</td></tr>
<tr class="bg-danger"><td class="bg-primary">...</td>
  <td class="bg-success">...</td></tr>



  </tbody>
</table>


          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}