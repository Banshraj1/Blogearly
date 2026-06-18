import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authstatus = useSelector((state) => state.auth.status);
  // console.log(state?.auth);

  useEffect(() => {
    if (authentication && authstatus !== true) {
      navigate("/login");
    }
    setLoader(false);
  }, [authstatus, navigate, authentication]);

  return loader ? <div>Loading...</div> : <>{children}</>;
}

export default Protected;
