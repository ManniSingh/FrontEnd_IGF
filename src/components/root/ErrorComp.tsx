import React from "react";
import HomeButton from "./HomeButton";
import { useNavigate } from "react-router-dom";

interface ErrorProps {
  error: string;
}

//let regex = new RegExp("message:", "i")

const ErrorComp: React.FC<ErrorProps> = ({ error }) => {
  const navigate = useNavigate();
  //console.log(JSON.parse(error).response.errors[0].message);
  return (
    <div
      style={{
        color: "red",
        padding: "10px",
        border: "1px solid red",
        borderRadius: "5px",
        margin: "10px 0",
      }}
    >
      {JSON.parse(error).response.errors[0].message}
      <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
        <HomeButton goHome={() => {navigate("/")}} />
      </div>
    </div>
  );
};

export default ErrorComp;
