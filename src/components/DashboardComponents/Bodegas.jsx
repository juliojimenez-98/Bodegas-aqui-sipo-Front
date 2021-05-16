import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Bodegas = () => {
  const [bodegas, setBodegas] = useState([]);
  const [total, setTotal] = useState();
  const [limite, setLimite] = useState(5);
  const [desde, setDesde] = useState(0);

  const token = sessionStorage.getItem("token");
  const msgNoProducts = "No tiene productos";

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
      });
  };
  const headers = {
    "x-token": token,
  };

  useEffect(() => {
    obtenerBodegas(limite, desde);
  }, [limite, desde]);

  return (
    <>
      <div class="mt-8"></div>
      <Link to="/addusuario">
        <button class="flex bg-blue-500 rounded-full font-bold text-white px-4 py-3 transition duration-300 ease-in-out uppercase hover:text-gray-800 hover:bg-blue-200 mr-6 focus:outline-none">
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
      </Link>
      <div class="flex flex-col mt-8">
        <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <table class="min-w-full">
              <thead>
                <tr>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Descripcion
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Productos
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>

              <tbody class="bg-white">
                {bodegas.map((bodega) => (
                  <tr>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div class="text-sm leading-5 font-medium text-gray-900">
                        {bodega.nombre}
                      </div>
                    </td>

                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div class="text-sm leading-5 text-gray-900">
                        {bodega.descripcion}
                      </div>
                    </td>

                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <span
                        class={
                          (bodega.estado
                            ? " bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800") +
                          " px-2 inline-flex text-xs leading-5 font-semibold rounded-full "
                        }
                      >
                        {bodega.estado ? "Activa" : "Inactiva"}
                      </span>
                    </td>

                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                      {/* {bodega.producto.map(product)=>console.log(object)} */}
                      {bodega.producto.map(function (p) {
                        return <>{p ? p.nombre : msgNoProducts}</>;
                      })}
                    </td>

                    <td class="">
                      <button
                        onClick={() => console.log(bodega._id)}
                        class="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-blue-400 uppercase transition bg-transparent border-2 border-blue-400 rounded-full ripple hover:bg-blue-100 focus:outline-none"
                      >
                        Editar
                      </button>
                    </td>
                    <td class="">
                      <button class="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-red-400 uppercase transition bg-transparent border-2 border-red-400 rounded-full ripple hover:bg-blue-100 focus:outline-none">
                        Bloquear
                      </button>
                    </td>
                    <td class="">
                      <button class="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-yellow-400 uppercase transition bg-transparent border-2 border-yellow-400 rounded-full ripple hover:bg-blue-100 focus:outline-none">
                        Desbloquear
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div class="flex">
              <button
                onClick={() => setDesde(desde - limite)}
                class={
                  desde === 0
                    ? "hidden"
                    : "border border-teal-500 text-teal-500 block rounded-sm font-bold py-4 px-6 mr-2 flex items-center hover:bg-blue-500 hover:text-white"
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
        </div>
      </div>
    </>
  );
};

export default Bodegas;
