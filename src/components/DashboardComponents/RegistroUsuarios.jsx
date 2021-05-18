import React from "react";
import { Formik, Form, Field } from "formik";
import ErrorModal from "../Login/ErrorModal";
import GlobalModal from "../widgets/GlobalModal";

const RegistroUsuarios = () => {
  const [errorRes, setErrorRes] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [showGlobalModal, setGlobalShowModal] = React.useState(false);
  return (
    <>
      <Formik
        initialValues={{ nombre: "", correo: "", password: "123456", role: "" }}
        onSubmit={(values) => {
          fetch(`http://localhost:8080/api/usuarios`, {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then(async (data) => {
              if (data) {
                console.log(data.msg);

                const guardarMsg = async () => {
                  await setMessage(data.msg);
                  console.log(message);
                  await setGlobalShowModal(true);
                  await setShowModal(false);
                };
                guardarMsg();
              }
              if (data.errors) {
                const guardarMsgError = async () => {
                  await setErrorRes(data.errors[0].msg);
                  await setShowModal(true);
                  await setGlobalShowModal(false);
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
                    Nombre
                  </label>
                  <Field
                    class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                    type="text"
                    name="nombre"
                    placeholder="Ingrese nombre"
                  />
                </div>
                <div class="md:w-1/2 px-3">
                  <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                    Correo
                  </label>
                  <Field
                    type="email"
                    name="correo"
                    class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    placeholder="Correo@correo.com"
                  />
                </div>
              </div>
              <div class="-mx-3 md:flex mb-2">
                <div class="mx-auto px-3">
                  <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                    Rol
                  </label>

                  <Field
                    type="text"
                    name="role"
                    class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                  />
                </div>
              </div>
              <button
                type="submit"
                class=" lg:w-64 mx-auto bg-blue-500 rounded-full font-bold text-white px-4 py-3 transition duration-300 uppercase hover:text-gray-800 hover:bg-blue-200 mt-6 focus:outline-none"
              >
                Agregar usuario
              </button>
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
          redirectTo="/usuarios"
        />
      ) : null}
    </>
  );
};

export default RegistroUsuarios;
