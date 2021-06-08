import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";

const Bodegas = () => {
  const [bodegas, setBodegas] = useState([]);
  const [bodegasBuscadas, setBodegasBuscadas] = useState([]);
  const [total, setTotal] = useState();
  const [bodegasSearch, setBodegasSearch] = useState(false);
  const [limite, setLimite] = useState(6);
  const [desde, setDesde] = useState(0);

  const [usuario, setUsuario] = useState({});
  const history = useHistory();

  useEffect(() => {
    const obtenerSessionStorage = async () => {
      const datosUsuarios = sessionStorage.getItem("datosUsuario");
      setUsuario(JSON.parse(datosUsuarios));
    };
    obtenerSessionStorage();
    console.log(usuario);
  }, []);

  const token = sessionStorage.getItem("token");
  const msgNoProducts = "No tiene productos";

  const buscarBodegas = async (terminos) => {
    await axios
      .get(`http://localhost:8080/api/buscar/bodegas/${terminos}`, {
        headers,
      })
      .then(async (response) => {
        console.log(response.data.results);
        setBodegasBuscadas(response.data.results);
      });
  };

  const obtenerBodegas = async (limite, desde) => {
    await axios
      .get(
        `http://localhost:8080/api/bodegas?limite=${limite}&desde=${desde}`,
        {
          headers,
        }
      )
      .then((response) => {
        setTotal(response.data.total);
        setBodegas(response.data.bodegas);
        console.log(bodegas);
      });
  };
  const headers = {
    "x-token": token,
  };

  const BloquearBodegas = async (id) => {
    await axios
      .delete(`http://localhost:8080/api/bodegas/${id}`, {
        headers,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          obtenerBodegas(limite, desde);
        }
      });
  };

  useEffect(() => {
    obtenerBodegas(limite, desde);
  }, [limite, desde]);

  return (
    <>
      {bodegasSearch ? (
        <button
          onClick={() => setBodegasSearch(false)}
          class="inline-block p-3 text-center text-white transition bg-blue-500 rounded-full shadow ripple hover:shadow-lg hover:text-gray-800 hover:bg-blue-200 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
      ) : (
        <button
          onClick={() => history.push("/addbodega")}
          class="flex bg-blue-500 rounded-full font-bold text-white px-4 py-3 transition duration-300 ease-in-out uppercase hover:text-gray-800 hover:bg-blue-200 mr-6 focus:outline-none"
        >
          Agregar una bodega
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      )}

      <Formik
        initialValues={{ terminos: "" }}
        onSubmit={(values, { setSubmitting }) => {
          buscarBodegas(values.terminos);
          setBodegasSearch(true);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="mx-auto">
            <div>
              <Field
                class="p-2 pl-4  rounded-full border border-blue-500  focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                type="text"
                placeholder="Escribe para buscar"
                name="terminos"
              />
              <button
                type="submit"
                class="ml-2 inline-block p-2 text-center  text-white transition bg-blue-500 rounded-full shadow ripple hover:shadow-lg hover:text-gray-800 hover:bg-blue-200 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="  h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {bodegasSearch ? (
        <>
          {bodegasBuscadas.map((bodega) => (
            <div
              class={
                (usuario.role === "ADMIN_ROLE"
                  ? "bg-color-primary "
                  : "bg-gray-600 ") +
                "max-w-md rounded-lg overflow-hidden shadow-lg  m-4"
              }
            >
              <div class="flex flex-col min-h-full">
                <div class="flex flex-col flex-grow">
                  <div class="px-6 py-3 border-b">
                    <div class="text-xl font-bold text-white">
                      {bodega.nombre
                        .trim()
                        .replace(/^\w/, (c) => c.toUpperCase())}
                    </div>
                    <div
                      class={
                        (bodega.estado
                          ? " bg-green-500 text-gray-100"
                          : "bg-red-500 text-gray-100") +
                        "flex  px-2 inline-flex text-xs leading-5 font-semibold rounded-full "
                      }
                    >
                      {bodega.estado ? "Activa" : "Inactiva"}
                    </div>
                  </div>
                  <div class=" w-full items-center justify-center">
                    <p className="px-3 py-3 text-gray-100">
                      {bodega.descripcion}
                    </p>
                    <div class="py-5 ">
                      <p class="text-pink-400 ml-2">
                        Total productos en bodega: {bodega.producto.length}
                      </p>
                      {bodega.producto.length === 0 ? (
                        <li class="text-yellow-300 ml-2">
                          No hay productos en la bodega
                        </li>
                      ) : (
                        <></>
                      )}
                      {bodega.producto.map(function (p) {
                        return (
                          <>
                            <div class="flex justify-between px-2 py-2">
                              <p class="flex text-gray-100">
                                <svg
                                  class="w-2 text-gray-100 mx-2"
                                  viewBox="0 0 8 8"
                                  fill="currentColor"
                                >
                                  <circle cx="4" cy="4" r="3" />
                                </svg>
                                {p.nombre}
                              </p>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div class="px-6 py-4 flex justify-end">
                  <button
                    onClick={() => history.push(`updatebodegas/${bodega._id}`)}
                    class="bg-blue-500 rounded-full text-white hover:bg-gray-300 hover:text-gray-800 font-bold px-4  mr-2"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => {
                      if (bodega.estado) {
                        BloquearBodegas(bodega._id);
                      } else console.log("Bodega bloqueada");
                    }}
                    class={
                      (bodega.estado
                        ? " bg-red-700 text-white "
                        : "bg-yellow-400 text-gray-700 ") +
                      " rounded-full hover:bg-gray-300 hover:text-gray-800 font-bold px-4 py-2"
                    }
                  >
                    {bodega.estado ? "Bloquear" : "Desbloquear"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {bodegas.map((bodega) => (
              <div
                class={
                  (usuario.role === "ADMIN_ROLE"
                    ? "bg-color-primary "
                    : "bg-gray-600 ") +
                  "max-w-md rounded-lg overflow-hidden shadow-lg  m-4"
                }
              >
                <div class="flex flex-col min-h-full">
                  <div class="flex flex-col flex-grow">
                    <div class="px-6 py-3 border-b">
                      <div class="text-xl font-bold text-white">
                        {bodega.nombre
                          .trim()
                          .replace(/^\w/, (c) => c.toUpperCase())}
                      </div>
                      <div
                        class={
                          (bodega.estado
                            ? " bg-green-500 text-gray-100"
                            : "bg-red-500 text-gray-100") +
                          "flex  px-2 inline-flex text-xs leading-5 font-semibold rounded-full "
                        }
                      >
                        {bodega.estado ? "Activa" : "Inactiva"}
                      </div>
                    </div>
                    <div class=" w-full items-center justify-center">
                      <p className="px-3 py-3 text-gray-100">
                        {bodega.descripcion}
                      </p>
                      <div class="py-5 ">
                        <p class="text-pink-400 ml-2">
                          Total productos en bodega: {bodega.producto.length}
                        </p>
                        {bodega.producto.length === 0 ? (
                          <li class="text-yellow-300 ml-2">
                            No hay productos en la bodega
                          </li>
                        ) : (
                          <></>
                        )}
                        {bodega.producto.map(function (p) {
                          return (
                            <>
                              <div class="flex justify-between px-2 py-2">
                                <p class="flex text-gray-100">
                                  <svg
                                    class="w-2 text-gray-100 mx-2"
                                    viewBox="0 0 8 8"
                                    fill="currentColor"
                                  >
                                    <circle cx="4" cy="4" r="3" />
                                  </svg>
                                  {p.nombre}
                                </p>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div class="px-6 py-4 flex justify-end">
                    <button
                      onClick={() =>
                        history.push(`updatebodegas/${bodega._id}`)
                      }
                      class="bg-blue-500 rounded-full text-white hover:bg-gray-300 hover:text-gray-800 font-bold px-4  mr-2"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => {
                        if (bodega.estado) {
                          BloquearBodegas(bodega._id);
                        } else console.log("Bodega bloqueada");
                      }}
                      class={
                        (bodega.estado
                          ? " bg-red-700 text-white "
                          : "bg-yellow-400 text-gray-700 ") +
                        " rounded-full hover:bg-gray-300 hover:text-gray-800 font-bold px-4 py-2"
                      }
                    >
                      {bodega.estado ? "Bloquear" : "Desbloquear"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div class="flex">
            <div className="mx-auto">
              <button
                onClick={() => setDesde(desde - limite)}
                class={
                  desde === 0
                    ? "hidden"
                    : "border border-teal-500 text-teal-500 block rounded-sm font-bold py-4 px-6 flex items-center hover:bg-blue-500 hover:text-white"
                }
              >
                <svg
                  class="h-5 w-5 mr-2 fill-current"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="-49 141 512 512"
                >
                  <path
                    id="XMLID_10_"
                    d="M438,372H36.355l72.822-72.822c9.763-9.763,9.763-25.592,0-35.355c-9.763-9.764-25.593-9.762-35.355,0 l-115.5,115.5C-46.366,384.01-49,390.369-49,397s2.634,12.989,7.322,17.678l115.5,115.5c9.763,9.762,25.593,9.763,35.355,0 c9.763-9.763,9.763-25.592,0-35.355L36.355,422H438c13.808,0,25-11.193,25-25S451.808,372,438,372z"
                  ></path>
                </svg>
                Anterior
              </button>
              <button
                onClick={() => setDesde(desde + limite)}
                class={
                  desde > total
                    ? "hidden"
                    : "border border-teal-500 text-teal-500 block rounded-sm font-bold py-4 px-6 mr-2 flex items-center hover:bg-blue-500 hover:text-white"
                }
              >
                Siguiente
                <svg
                  class="h-5 w-5 ml-2 fill-current"
                  clasversion="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="-49 141 512 512"
                >
                  <path
                    id="XMLID_11_"
                    d="M-24,422h401.645l-72.822,72.822c-9.763,9.763-9.763,25.592,0,35.355c9.763,9.764,25.593,9.762,35.355,0
                    l115.5-115.5C460.366,409.989,463,403.63,463,397s-2.634-12.989-7.322-17.678l-115.5-115.5c-9.763-9.762-25.593-9.763-35.355,0
                    c-9.763,9.763-9.763,25.592,0,35.355l72.822,72.822H-24c-13.808,0-25,11.193-25,25S-37.808,422-24,422z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Bodegas;
