import axios from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import GlobalModal from "../widgets/GlobalModal";
import ErrorModal from "../Login/ErrorModal";

const AgregarBodegas = () => {
  const [errorRes, setErrorRes] = React.useState([]);
  const [id, setId] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [message, setMessage] = React.useState("Bodega agregada con exito");
  const [showGlobalModal, setGlobalShowModal] = React.useState(false);
  const [formProductos, setFormProductos] = React.useState(false);
  const [buttonTrue, setButtonTrue] = React.useState(false);
  const [productos, setProductos] = React.useState([]);
  const token = sessionStorage.getItem("token");
  const datos = sessionStorage.getItem("datosUsuario");

  const obtenerProductos = async () => {
    await axios
      .get(`http://localhost:8080/api/productos`, {
        headers,
      })
      .then(async (response) => {
        setProductos(response.data.productos);
        console.log(productos);
      });
  };
  const headers = {
    "x-token": token,
  };

  React.useEffect(() => {
    obtenerProductos();
  }, []);

  React.useEffect(() => {
    const datosGuardados = JSON.parse(datos);
    setId(datosGuardados.uid);
  }, []);

  React.useEffect(() => {
    const datosGuardados = JSON.parse(datos);
    setId(datosGuardados.uid);
  }, []);
  return (
    <>
      <Formik
        initialValues={{
          nombre: "",
          descripcion: "",
          productos: [],
        }}
        onSubmit={(values) => {
          fetch(`http://localhost:8080/api/bodegas`, {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
              "x-token": token,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data) {
                const guardarMsg = async () => {
                  setGlobalShowModal(true);
                  setShowModal(false);
                };
                guardarMsg();
              }

              if (data.errors) {
                const guardarMsgError = async () => {
                  await setErrorRes(data.errors[0].msg);
                  setGlobalShowModal(false);
                  setShowModal(true);
                };

                guardarMsgError();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        {({ isSubmitting, values }) => (
          <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
            <Form>
              <div class="-mx-3 md:flex mb-6">
                <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                    Nombre de bodega
                  </label>
                  <Field
                    class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                    type="text"
                    name="nombre"
                    placeholder="Ingrese nombre de la bodega"
                  />
                </div>
                <div class="md:w-1/2 px-3">
                  <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                    Descripcion de la bodega
                  </label>
                  <Field
                    type="text"
                    name="descripcion"
                    class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    placeholder="Escriba descripcion de la bodega"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  formProductos
                    ? setFormProductos(false)
                    : setFormProductos(true)
                }
                class={
                  !formProductos
                    ? " border-2 border-green-500 rounded-full font-bold text-green-500 px-4 py-3 transition duration-300 ease-in-out hover:bg-green-500 hover:text-white mr-6 focus:outline-none"
                    : "border-2 bg-red-500 rounded-lg  font-bold text-gray-100 px-4 py-3 transition duration-300 ease-in-out hover:bg-red-500 hover:text-white mr-6 focus:outline-none"
                }
              >
                {!formProductos ? "Agregar productos" : "X"}
              </button>

              <div
                class={
                  (!formProductos ? "hidden " : " ") + "md:w-1/2 px-3 mt-2"
                }
              >
                <div class="min-h-screen flex-1 bg-gray-200 p-4 flex justify-center items-center">
                  <div class="bg-white w-full md:max-w-4xl rounded-lg shadow">
                    <div class="h-12 flex justify-between items-center border-b border-gray-200 m-4">
                      <div>
                        <div class="text-xl font-bold text-gray-700">
                          Productos
                        </div>
                        <div class="text-sm font-base text-gray-500">
                          Agregar productos a bodega
                        </div>
                      </div>
                    </div>
                    <div class="px-6">
                      {productos.map(function (p) {
                        return (
                          <div class="flex justify-between items-center h-16 p-4 my-6  rounded-lg border border-gray-100 shadow-md">
                            <div class="flex items-center">
                              <div class="ml-2">
                                <div class="text-sm font-semibold text-gray-600">
                                  {p.nombre}
                                </div>
                                <div class="text-sm font-light text-gray-500">
                                  {p.descripcion}
                                </div>
                              </div>
                            </div>
                            <div>
                              {values.productos.find((id) => p._id === id)
                                ? console.log("estaid")
                                : console.log("No esta id")}
                              <button
                                type="button"
                                onClick={() => {
                                  values.productos.push(p._id);
                                  const find = values.productos.find(
                                    (id) => id === p._id
                                  );
                                  if (find) {
                                    setButtonTrue(true);
                                  }

                                  console.log(values.productos);
                                }}
                                class={
                                  (buttonTrue
                                    ? "hidden"
                                    : "bg-green-600 hover:bg-green-500") +
                                  " p-2 rounded-full shadow-md flex justify-center items-center focus:outline-none"
                                }
                              >
                                <svg
                                  class="text-white toggle__lock w-6 h-6"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                      <div class="flex bg-gray-200 justify-center items-center h-16 p-4 my-6  rounded-lg  shadow-inner">
                        <div class="flex items-center border border-gray-400 p-2 border-dashed rounded cursor-pointer">
                          <div>
                            <svg
                              class="text-gray-500 w-6 h-6"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                          </div>
                          <div class="ml-1 text-gray-500 font-medium">
                            {" "}
                            Invite a friend
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="p-6 "></div>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="mx-auto">
                  <button
                    type="submit"
                    class=" lg:w-64 mx-auto bg-blue-500 rounded-full font-bold text-white px-4 py-3 transition duration-300 uppercase hover:text-gray-800 hover:bg-blue-200 mt-6 focus:outline-none"
                  >
                    Agregar Bodega
                  </button>
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
      {showModal ? (
        <ErrorModal setShowModal={setShowModal} errorMessage={errorRes} />
      ) : null}
      {showGlobalModal ? (
        <GlobalModal
          setShowGlobalModal={setGlobalShowModal}
          modalMessage={message}
          redirectTo="/bodegas"
        />
      ) : null}
    </>
  );
};

export default AgregarBodegas;
