import axios from "axios";
import React from "react";

const Movimientos = () => {
  const [movimientos, setMovimientos] = React.useState([]);
  const [total, setTotal] = React.useState();

  const token = sessionStorage.getItem("token");

  const obtenerMovimientos = async () => {
    await axios
      .get(`http://localhost:8080/api/movimientos`, {
        headers,
      })
      .then((response) => {
        setTotal(response.data.total);
        setMovimientos(response.data.movimientos);
        console.log(response.data.movimientos);

        console.log(movimientos);
      });
  };
  const headers = {
    "x-token": token,
  };

  React.useEffect(() => {
    obtenerMovimientos();
  }, []);

  return (
    <>
      <div class=" mx-auto py-10 flex justify-center">
        <div class="w-full lg:w-8/12 pl-4  h-full flex flex-col">
          <div class="bg-white text-lg text-gray-500 font-bold rounded-lg px-5 py-2 shadow border-b border-gray-300">
            Movimientos
          </div>

          <div
            class="w-full h-full overflow-auto shadow rounded-lg bg-white"
            id="journal-scroll"
          >
            <table class="w-full">
              <tbody class="">
                {movimientos.map(function (p) {
                  return (
                    <tr
                      class={
                        (p.tipoMovimiento === 1
                          ? "border-green-500"
                          : "border-red-500") +
                        " relative transform scale-100 text-xs lg:text-sm py-1 border-l-4  cursor-default bg-gray-100 bg-opacity-25"
                      }
                    >
                      <td class="pl-5 pr-3 whitespace-no-wrap">
                        <div class="text-blue-600">
                          {p.createdAt.slice(0, 10)}
                        </div>
                        <div>{p.createdAt.slice(11, 19)}</div>
                      </td>

                      <td class="px-2 py-2 whitespace-no-wrap">
                        <div class="leading-5 text-gray-800 font-bold">
                          {p.usuario.nombre}
                        </div>
                        <div class="leading-5 text-gray-900">
                          {p.tipoMovimiento === 1 ? "Agrego " : "Retiro "}
                          <p class="text-blue-500 hover:underline">
                            {Math.abs(p.cantidadMovimiento)}
                          </p>
                        </div>
                        <div class="leading-5 text-gray-800">
                          Productos de la bodega :
                        </div>
                        <div class="leading-5 text-blue-500">
                          {p.bodega.nombre}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Movimientos;
