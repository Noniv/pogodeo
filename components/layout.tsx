import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="h-screen flex flex-col">
        <header className="bg-sky-800 w-full text-center text-xl font-bold text-white p-4 border-b-white border-b-2 sticky top-0 z-40">
          <h1>Pogodeo</h1>
        </header>
        <div className="flex-grow">
        {children}
        <footer className="bg-sky-800 w-full text-xl text-white p-4 border-b-white border-t-2 fixed bottom-0 z-40">
          Realizacja: Maksymilian Dendura
        </footer>
        </div>
      </div>
    </>
  );
};

export default Layout;
