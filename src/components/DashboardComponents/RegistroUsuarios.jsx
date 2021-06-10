import React from "react";
import { Formik, Form, Field } from "formik";
import ErrorModal from "../Login/ErrorModal";
import GlobalModal from "../widgets/GlobalModal";
import { useParams } from "react-router";
import axios from "axios";
import * as Yup from "yup";

const RegistroUsuarios = () => {
  const [errorRes, setErrorRes] = React.useState([]);
  const [userOld, setUserOld] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [messageUpdate, setMessageUpdate] = React.useState(
    "Usuario actualizado con exito"
  );
  const [showModal, setShowModal] = React.useState(false);
  const [showGlobalModal, setGlobalShowModal] = React.useState(false);

  const { idUser } = useParams();
  const token = sessionStorage.getItem("token");

  const obtenerUsuariosPorId = async () => {
    await axios
      .get(`http://localhost:8080/api/usuarios/${idUser}`, {
        headers,
      })
      .then(async (response) => {
        console.log(response);
        await setUserOld(response.data);
      });
  };
  const headers = {
    "x-token": token,
  };

  const SignupSchema = Yup.object().shape({
    role: Yup.string().required("El Rol es requerido"),
    nombre: Yup.string()
      .min(2, "Nombre muy corto")
      .max(50, "Nombre muy largo")
      .required("El nombre es requerido"),
    correo: Yup.string()
      .email("Correo invalido")
      .required("El Email es requerido"),
  });

  React.useEffect(() => {
    obtenerUsuariosPorId();
  }, []);

  return (
    <>
      <button onClick={() => obtenerUsuariosPorId()}>clickme</button>
      <Formik
        enableReinitialize
        validationSchema={SignupSchema}
        initialValues={
          idUser
            ? {
                nombre: userOld.nombre,
                correo: userOld.correo,
                role: userOld.role,
              }
            : { nombre: "", correo: "", password: "123456", role: "" }
        }
        onSubmit={(values) => {
          if (idUser) {
            fetch(`http://localhost:8080/api/usuarios/${idUser}`, {
              method: "PUT",
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
          } else {
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
                  console.log(values);
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
          }
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
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
                  {errors.nombre && touched.nombre ? (
                    <div className="text-red-600">{errors.nombre}</div>
                  ) : null}
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
                  {errors.correo && touched.correo ? (
                    <div className="text-red-600">{errors.correo}</div>
                  ) : null}
                </div>
              </div>
              <div class="-mx-3 md:flex mb-2">
                <div class="mx-auto px-3">
                  <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                    Rol
                  </label>
                  <div class="relative inline-flex">
                    <svg
                      class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 412 232"
                    >
                      <path
                        d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                        fill="#648299"
                        fill-rule="nonzero"
                      />
                    </svg>
                    <select
                      name="role"
                      onBlur={handleBlur}
                      className="w-64 mb-10 border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                      onChange={handleChange}
                      value={values.role}
                      style={{ display: "block" }}
                    >
                      <option value="" label="Selecciona el Rol" />
                      <option value="ADMIN_ROLE" label="ADMINISTRADOR" />
                      <option value="USER_ROLE" label="BODEGUERO" />
                    </select>
                  </div>
                  {errors.role && touched.role ? (
                    <div className="text-red-600">{errors.role}</div>
                  ) : null}
                </div>
              </div>
              <div className="flex">
                <div className="mx-auto">
                  <button
                    type="submit"
                    class=" lg:w-64 mx-auto bg-blue-500 rounded-full font-bold text-white px-4 py-3 transition duration-300 uppercase hover:text-gray-800 hover:bg-blue-200 mt-6 focus:outline-none"
                  >
                    {idUser ? "Actualizar usuario" : "Agregar usuario"}
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
          modalMessage={!idUser ? message : messageUpdate}
          redirectTo="/usuarios"
        />
      ) : null}
    </>
  );
};

export default RegistroUsuarios;
