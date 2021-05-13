import axios from "axios";
import React, { useState, useEffect } from "react";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  const token = sessionStorage.getItem("token");
  console.log(token);

  const headers = {
    "x-token": token,
  };
  useEffect(() => {
    const obtenerUsuarios = async () => {
      await axios
        .get("http://localhost:8080/api/usuarios", { headers })
        .then((response) => {
          setUsuarios(response.data.usuarios);
          console.log(usuarios);
        });
    };

    obtenerUsuarios();
  }, []);

  return (
    <>
      <div class="mt-8"></div>

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
                    Correo
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Rol
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>

              <tbody class="bg-white">
                {usuarios.map((user) => (
                  <tr>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div class="text-sm leading-5 font-medium text-gray-900">
                        {user.nombre}
                      </div>
                    </td>

                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div class="text-sm leading-5 text-gray-900">
                        {user.correo}
                      </div>
                    </td>

                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <span
                        class={
                          (user.estado
                            ? " bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800") +
                          " px-2 inline-flex text-xs leading-5 font-semibold rounded-full "
                        }
                      >
                        {user.estado ? "Activo" : "Inactivo"}
                      </span>
                    </td>

                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                      {user.role}
                    </td>

                    <td class="">
                      <button
                        onClick={() => console.log(user.uid)}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Usuarios;
