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

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(`http://localhost:8080/api/auth/login`, {
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
          console.log(data.usuario);
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("datosUsuario", JSON.stringify(data.usuario));
          if (data.usuario) {
            window.location.href = "/dashboard";
          }
          // var guardado = sessionStorage.getItem("datosUsuario");
          // console.log(JSON.parse(guardado));
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
            <button className="p-0 w-12 h-12 bg-blue-500 rounded-full hover:bg-blue-300 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
              <svg
                className="w-8 h-8 mx-auto hover:text-gray-800 text-white"
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
          <p className="text-center text-3xl lg:text-4xl">Bodegas Aqui Sipo</p>
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
              className="bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-300 hover:text-gray-800 p-2 mt-8"
            >
              Ingresar
            </button>
          </form>
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
