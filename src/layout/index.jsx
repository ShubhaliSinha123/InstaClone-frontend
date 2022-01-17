import React from "react";
import Footer from "./footer";
import Header from "./header";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="app">
        {children}
        </div>
        <div>
          <Footer />
        </div>
    </div>
  );
};

export default DashboardLayout;
