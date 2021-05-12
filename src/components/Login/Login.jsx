import React, { useState } from "react";
import { Link } from "react-router-dom";
import ErrorModal from "./ErrorModal";

const Login = () => {
  const [formData, setFormData] = useState({
    correo: "",
    password: "",
  });
  const [errorRes, setErrorRes] = useState(undefined);
  const [showModal, setShowModal] = React.useState(false);

  const handleChange = (event) => {
    // console.log(event.target.value);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8080/api/auth/login`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data);
          sessionStorage.setItem("token", data.token);
          // window.location.href = "/";
        }
        if (data.msg) {
          console.log(data.msg);
          setErrorRes(data.msg);

          setShowModal(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full flex flex-wrap">
      <div className="w-full md:w-5/12 flex flex-col">
        <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
          <Link to="/home">
            <button className="p-0 w-12 h-12 bg-black rounded-full hover:bg-gray-800 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
              <svg
                className="w-8 h-8 mx-auto text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
            </button>
          </Link>
        </div>

        <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <p className="text-center text-3xl">Bienvenido</p>
          <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}>
            <div className="flex flex-col pt-4">
              <label htmlFor="email" className="text-lg">
                Correo
              </label>
              <input
                type="email"
                name="correo"
                onChange={handleChange}
                placeholder="tucorreo@email.com"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="flex flex-col pt-4">
              <label htmlFor="password" className="text-lg">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Contraseña"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <button
              type="submit"
              className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
            >
              Ingresar
            </button>
          </form>
          <div className="text-center pt-12 pb-12">
            <p>
              ¿No tienes cuenta?{" "}
              <Link to="/register">
                <a href="{}" className="underline font-semibold">
                  Registrate aquí.
                </a>
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="w-7/12 shadow-2xl">
        <img
          className="object-cover w-full h-screen hidden md:block"
          src="https://images.pexels.com/photos/3821384/pexels-photo-3821384.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="background"
        />
      </div>
      {showModal ? (
        <ErrorModal setShowModal={setShowModal} errorMessage={errorRes} />
      ) : null}
    </div>
  );
};

export default Login;
