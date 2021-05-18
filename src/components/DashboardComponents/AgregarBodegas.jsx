import axios from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";

const AgregarBodegas = () => {
  const [id, setId] = React.useState("");
  const [formProductos, setFormProductos] = React.useState(false);
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
      <button onClick={() => console.log(productos)}>as</button>
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
                console.log(data);
              }
              if (data.errors) {
                const guardarMsgError = async () => {
                  await console.log(data.errors[0].msg);
                };

                guardarMsgError();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        {({ isSubmitting }) => (
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
                <div role="group" aria-labelledby="checkbox-group">
                  {productos.map(function (p) {
                    return (
                      <label>
                        <Field
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
    </>
  );
};

export default AgregarBodegas;
