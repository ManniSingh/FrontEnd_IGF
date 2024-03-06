import React from "react";

interface ErrorProps {
  error: string;
}

const ErrorComp: React.FC<ErrorProps> = ({ error }) => {
  return (
    <div style={{ color: "red", padding: "10px", border: "1px solid red", borderRadius: "5px", margin: "10px 0" }}>
      {error}
    </div>
  );
};

export default ErrorComp;
