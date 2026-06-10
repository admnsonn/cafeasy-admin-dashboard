import React from "react";
import Sidebarcomp from "./Sidebarcomp";
import Topnav from "./Topnav";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebarcomp />
      <div className="ml-[285px] w-[calc(100%-285px)] min-h-screen pt-20 bg-gray-100 lg:ml-[85px] lg:w-[calc(100%-85px)] md:ml-0 md:w-full">
        <Topnav />
        {children}
      </div>
    </div>
  );
};

export default Layout;
