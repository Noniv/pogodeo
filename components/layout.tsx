import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="h-screen flex flex-col">
        <div className="bg-sky-800 w-full text-center text-xl font-bold text-white p-4 border-b-white border-b-2 sticky top-0 z-40">
          Pogodeo
        </div>
        <div className="flex-grow">
        {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
