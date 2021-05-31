import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import AgregarBodegas from "../../DashboardComponents/AgregarBodegas";
import AgregarProductos from "../../DashboardComponents/AgregarProductos";
import Bodegas from "../../DashboardComponents/Bodegas";
import Dashboard from "../../DashboardComponents/Dashboard";
import Productos from "../../DashboardComponents/Productos";
import RegistroUsuarios from "../../DashboardComponents/RegistroUsuarios";
import Usuarios from "../../DashboardComponents/Usuarios";
import Page404 from "../Page404";

const Sidebar = () => {
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    const obtenerSessionStorage = async () => {
      const datosUsuarios = sessionStorage.getItem("datosUsuario");
      setUsuario(JSON.parse(datosUsuarios));
    };
    obtenerSessionStorage();
    console.log(usuario);
  }, []);

  return (
    <>
      <div>
        <div>
          <div class="flex h-screen dark:bg-gray-800 font-roboto">
            <div
              class={
                (toggleSidebar ? " " : " hidden") +
                " fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden"
              }
            ></div>

            <div
              class={
                (toggleSidebar ? " " : " hidden ") +
                (usuario.role === "ADMIN_ROLE"
                  ? "bg-color-primary"
                  : "bg-red-800") +
                " fixed z-30 inset-y-0 left-0 w-60 transition duration-300 transform   dark:bg-gray-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0"
              }
            >
              <div class="flex items-center justify-center mt-8">
                <div class="flex items-center">
                  <span class="text-white  font-semibold">
                    Admin Bodegas Aqui Sipo
                  </span>
                </div>
              </div>

              <div class="lg:hidden flex justify-end m-4">
                <button
                  onClick={() =>
                    toggleSidebar
                      ? setToggleSidebar(false)
                      : setToggleSidebar(true)
                  }
                  class=" inline-block p-3 text-center text-white transition border border-gray-100 rounded-full shadow ripple hover:shadow-lg hover:bg-yellow-500  focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-gray-100 hover:text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <ul class="flex flex-col mt-10 px-4 text-center">
                <Link to="/dashboard">
                  <li
                    href="#a"
                    className="py-2 text-sm text-gray-100 text-xl  hover:bg-gray-200 hover:text-gray-700 rounded"
                  >
                    Dashboard
                  </li>
                </Link>
                {usuario.role === "ADMIN_ROLE" ? (
                  <Link to="/usuarios">
                    <li
                      href="#a"
                      className="mt-3 py-2 text-sm text-gray-100 text-xl  hover:text-gray-700  hover:bg-gray-200  rounded"
                    >
                      Usuarios
                    </li>
                  </Link>
                ) : null}

                <Link to="/bodegas">
                  <li
                    href="#a"
                    className="mt-3 py-2 text-sm text-gray-100 text-xl  hover:text-gray-700 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 rounded"
                  >
                    Bodegas
                  </li>
                </Link>
                <Link to="/productos">
                  <li
                    href="#a"
                    className="mt-3 py-2 text-sm text-gray-100 text-xl  hover:text-gray-700 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 rounded"
                  >
                    Productos
                  </li>
                </Link>
              </ul>
            </div>

            <div class="flex-1 flex flex-col overflow-hidden">
              <header class="flex justify-between items-center p-6">
                <div class="flex items-center space-x-4 lg:space-x-0">
                  <div>
                    <button
                      onClick={() =>
                        toggleSidebar
                          ? setToggleSidebar(false)
                          : setToggleSidebar(true)
                      }
                      class="p-0 m-2 w-10 h-10 bg-color-primary rounded-lg  hover:bg-gray-600 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="text-white"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div class="flex items-center space-x-4">
                  <div class="relative">
                    <button
                      onClick={() => {
                        dropdown ? setDropdown(false) : setDropdown(true);
                      }}
                      class="flex items-center space-x-2 relative focus:outline-none"
                    >
                      <h2 class="text-gray-700 dark:text-gray-300 text-lg hidden sm:block">
                        {usuario ? usuario.nombre : "Usuario no autenticado"}
                      </h2>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </button>

                    <div
                      class={
                        (!dropdown ? "hidden" : " ") +
                        " absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10"
                      }
                    >
                      <a
                        href="#a"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-600 hover:text-white"
                      >
                        Profile
                      </a>
                      <a
                        href="#a"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-600 hover:text-black"
                      >
                        Tickets
                      </a>
                      <a
                        onClick={() => {
                          sessionStorage.clear();
                        }}
                        href="/login"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-600 hover:text-white"
                      >
                        Logout
                      </a>
                    </div>
                  </div>
                </div>
              </header>

              <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                <div class="container mx-auto px-6 py-8">
                  {sessionStorage.getItem("token") ? (
                    <Switch>
                      <Route path="/dashboard" component={Dashboard} />
                      {usuario.role === "ADMIN_ROLE" ? (
                        <>
                          <Route path="/usuarios" component={Usuarios} />
                          <Route
                            path="/addusuario"
                            component={RegistroUsuarios}
                          />
                          <Route path="/bodegas" component={Bodegas} />
                          <Route path="/addbodega" component={AgregarBodegas} />
                          <Route
                            path="/addproducto"
                            component={AgregarProductos}
                          />
                          <Route path="/productos" component={Productos} />
                        </>
                      ) : null}
                      <Route path="/bodegas" component={Bodegas} />
                      <Route path="/addbodega" component={AgregarBodegas} />
                      <Route path="/addproducto" component={AgregarProductos} />
                      <Route path="/productos" component={Productos} />
                    </Switch>
                  ) : (
                    <Redirect to="/login" />
                  )}
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
