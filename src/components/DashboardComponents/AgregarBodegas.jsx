import axios from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import GlobalModal from "../widgets/GlobalModal";
import ErrorModal from "../Login/ErrorModal";
import { useParams } from "react-router-dom";

const AgregarBodegas = () => {
  const [errorRes, setErrorRes] = React.useState([]);
  const [id, setId] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [message, setMessage] = React.useState("Bodega agregada con exito");
  const [showGlobalModal, setGlobalShowModal] = React.useState(false);
  const [formProductos, setFormProductos] = React.useState(false);

  const [productos, setProductos] = React.useState([]);
  const [oldBodega, setOldBodega] = React.useState([]);
  const [oldProductos, setOldProductos] = React.useState();
  const token = sessionStorage.getItem("token");
  const datos = sessionStorage.getItem("datosUsuario");

  const { idBodega } = useParams();

  const obtenerBodegas = async () => {
    await axios
      .get(`http://localhost:8080/api/bodegas/${idBodega}`, {
        headers,
      })
      .then((response) => {
        // setOldBodega(response.data);
        setOldBodega(response.data.bodegas);
        setOldProductos(response.data.bodegas.producto);
        setTimeout(() => {
          console.log(oldBodega);
        }, 5000);
      });
  };

  React.useEffect(() => {
    obtenerBodegas();
  }, []);

  const obtenerProductos = async () => {
    await axios
      .get(`http://localhost:8080/api/productos`, {
        headers,
      })
      .then(async (response) => {
        setProductos(response.data.productos);
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
        enableReinitialize
        initialValues={
          idBodega
            ? {
                nombre: oldBodega.nombre,
                descripcion: oldBodega.descripcion,
                producto: oldProductos,
              }
            : {
                nombre: "",
                descripcion: "",
                producto: [],
              }
        }
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
              console.log(values.producto);
              if (data) {
                const guardarMsg = async () => {
                  setGlobalShowModal(true);
                  setShowModal(false);
                  console.log(data);
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
                  (!formProductos ? "hidden " : " ") +
                  " mt-2 rounded border border-green-500"
                }
              >
                <div class="bg-white w-full  rounded-lg shadow">
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

                  <div class="flex flex-col items-center ">
                    <div class="flex flex-col ">
                      <div className="p-4 grid grid-cols-1 lg:grid-cols-2">
                        {productos.map(function (p) {
                          return (
                            <label className="lg:mr-4">
                              <Field
                                color="green"
                                type="checkbox"
                                class="form-checkbox h-5 w-5 text-green-600"
                                name="producto"
                                value={p._id}
                              />
                              {p.nombre}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div class="p-6 "></div>
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
