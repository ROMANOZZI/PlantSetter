import React from "react";
import { Link } from "react-router-dom";
const SignedSucc = () => {
  return (
    <div>
      <div className="Congrats">
        Congratulaions your account has been created successfully
      </div>
      <Link to="/" replace="true">
        {" "}
        back to the Login page
      </Link>
    </div>
  );
};

export default SignedSucc;
