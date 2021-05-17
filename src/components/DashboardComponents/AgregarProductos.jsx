import { Field, Form, Formik } from "formik";
import React from "react";

const AgregarProductos = () => {
  const [id, setId] = React.useState("");
  const token = sessionStorage.getItem("token");
  const datos = sessionStorage.getItem("datosUsuario");

  React.useEffect(() => {
    const datosGuardados = JSON.parse(datos);
    setId(datosGuardados.uid);
  }, []);
  return (
    <>
      <Formik
        initialValues={{ nombre: "", descripcion: "", usuario: id }}
        onSubmit={(values) => {
          fetch(`http://localhost:8080/api/productos`, {
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
                    Nombre de producto
                  </label>
                  <Field
                    class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                    type="text"
                    name="nombre"
                    placeholder="Ingrese nombre del producto"
                  />
                </div>
                <div class="md:w-1/2 px-3">
                  <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                    Descripcion del producto
                  </label>
                  <Field
                    type="text"
                    name="descripcion"
                    class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    placeholder="Escriba descripcion del producto"
                  />
                </div>
              </div>
              <button
                type="submit"
                class=" lg:w-64 mx-auto bg-blue-500 rounded-full font-bold text-white px-4 py-3 transition duration-300 uppercase hover:text-gray-800 hover:bg-blue-200 mt-6 focus:outline-none"
              >
                Agregar Producto
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default AgregarProductos;
