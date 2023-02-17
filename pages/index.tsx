import type { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import { useEffect, useState } from "react";

const Login: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) Router.push("/home");
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (username === "admin" && password === "admin") {
      Router.push("/home");
      localStorage.setItem("user", "admin");
    } else setError(true);
    e.preventDefault();
  };

  return (
    <>
      <Head>
        <title>Pogodeo - zaloguj</title>
        <meta name="description" content="Pogodeo" />
      </Head>
      <main className="flex flex-col justify-center items-center w-full h-full px-4">
        <form
          className="bg-white shadow-2xl flex items-center flex-col gap-6 py-16 px-8 rounded-xl max-w-4xl w-full"
          action=""
          onSubmit={handleSubmit}
        >
          <div className="self-start italic">Testowe dane logowania: admin admin</div>
          <label className="w-full">
            Nazwa użytkownika
            <input
              type="text"
              className="block border-2 rounded-lg w-full px-2 py-1"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
          <label className="w-full">
            Hasło
            <input
              type="password"
              className="block border-2 rounded-lg w-full px-2 py-1"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <button className="block border-2 border-sky-800 rounded-lg bg-sky-800 py-2 px-4 w-full text-white hover:bg-sky-600">
            Zaloguj
          </button>
          {error ? (
            <span className="text-red-500">
              Błędna nazwa użytkownika lub hasło.
            </span>
          ) : (
            <span></span>
          )}
        </form>
      </main>
    </>
  );
};

export default Login;
