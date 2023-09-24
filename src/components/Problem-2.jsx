import React from "react";
import Index from "./modal/Index";
const Problem2 = () => {
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <Index
            name="All Contacts"
            stl="btn btn-lg btn-outline-primary"
            title="Modal A"
          />
          {/* <button></button> */}

          <Index
            name="US Contacts"
            stl="btn btn-lg btn-outline-warning"
            title="Modal B"
          />
        </div>
      </div>
    </div>
  );
};

export default Problem2;
