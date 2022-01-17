import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainRouter from "./routes";

const App = () => {
  const div = "...";
  return (
    <>
      <Router>
        <div>
          <React.Suspense fallback={div}>
            <MainRouter />
          </React.Suspense>
        </div>
      </Router>
    </>
  );
};

export default App;
