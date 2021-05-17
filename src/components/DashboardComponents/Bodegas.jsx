import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Bodegas = () => {
  const [bodegas, setBodegas] = useState([]);
  const [total, setTotal] = useState();
  const [limite, setLimite] = useState(6);
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
        console.log(bodegas)
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
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
{bodegas.map((bodega) => (


<div class="max-w-md rounded-lg overflow-hidden shadow-lg bg-color-primary m-4">
  <div class="flex flex-col min-h-full">
    <div class="flex flex-col flex-grow">
      <div class="px-6 py-3 border-b">
        <div class="text-xl font-bold text-white">{bodega.nombre}</div>
      <div class={
                          (bodega.estado
                            ? " bg-green-500 text-gray-100"
                            : "bg-red-500 text-gray-100") +
                          "flex  px-2 inline-flex text-xs leading-5 font-semibold rounded-full "
                        }
                      >
                        {bodega.estado ? "Activa" : "Inactiva"}</div>
      </div>
      <div class=" w-full items-center justify-center">
        <p className="px-3 py-3 text-gray-100">{bodega.descripcion}</p>
      <div class="py-5 ">
        {bodega.producto.map(function (p) {
                        return <>
                        <div class="flex justify-between px-2 py-2">
                          <p class="flex text-gray-100">
                            <svg class="w-2 text-gray-100 mx-2" viewBox="0 0 8 8" fill="currentColor">
                              <circle cx="4" cy="4" r="3" />
                            </svg>
                            {p.nombre}
                          </p>
                        </div>
                        
                      </>;
                      })}
 </div>
    
  </div>
     
    </div>
    <div class="px-6 py-4 flex justify-end">
      <button class="bg-blue-500 rounded-full text-white hover:bg-gray-300 hover:text-gray-800 font-bold px-4  mr-2">Editar</button>
      <button class={(bodega.estado? " bg-red-700 ": "bg-yellow-400 ") + " rounded-full text-white hover:bg-gray-300 hover:text-gray-800 font-bold px-4 py-2"}>{bodega.estado ? "Bloquear":"Desbloquear"}</button>
      
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
  );
};

export default Bodegas;
