import React from "react";
import backgroundImage from "../bg.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";

const WelcomePage = () => {


//   const handleLoginClick = () => {
//     // handle login button click
//     navigate("http://localhost:8080/users/login");
//   };

//   const handleRegisterClick = () => {
//     // handle register button click
//     navigate("http://localhost:3000/users/new");
//   };

  return (
    <div
    //   style={{
    //     backgroundImage: `url(${backgroundImage})`,
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //     height: "100vh",
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     padding: "0 20px"
    //   }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "2rem", color: "#000",justifyContent: "center" }} >
        Welcome to Timetable Consensus Scheduler
      </h1>
      <p
        style={{
          fontSize: "1.5rem",
          fontStyle: "italic",
          textAlign: "center",
          color: "#000",
          marginBottom: "2rem",
          justifyContent: "center"
        }}
      >
        "Time management is the process of organizing and planning how to divide
        your time between specific activities. Good time management enables you
        to work smarter, not harder – so that you get more done in less time,
        even when time is tight and pressures are high." - Brian Tracy
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* <button
          style={{
            padding: "10px 20px",
            margin: "0 10px",
            fontSize: "1.2rem",
            fontWeight: "bold",
            borderRadius: "5px",
            backgroundColor: "#fff",
            color: "#333",
            border: "none",
            cursor: "pointer"
          }}
        >
          Login
        </button> */}
        <Link to={`/user/new`}>
        <button
          style={{
            padding: "10px 20px",
            margin: "0 10px",
            fontSize: "1.2rem",
            fontWeight: "bold",
            borderRadius: "5px",
            backgroundColor: "#fff",
            color: "#333",
            border: "none",
            cursor: "pointer"
          }}
        >
          Get Started!
        </button>
        </Link>
        
      </div>
    </div>
  );
};

export default WelcomePage;
