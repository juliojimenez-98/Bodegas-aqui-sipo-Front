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
      {movimientos.map(function (p) {
        return (
          <div class="p-2">
            <div
              class={
                "inline-flex items-center bg-white leading-none text-gray-900 rounded-full w-full p-2 shadow text-sm"
              }
            >
              <span
                class={
                  (p.tipoMovimiento === 1 ? "bg-green-600 " : "bg-red-600 ") +
                  "inline-flex text-white rounded-full h-6 px-3 justify-center items-center text-"
                }
              >
                {p.tipoMovimiento === 1 ? "Agrega" : "Retira"}
              </span>
              <span class="inline-flex px-2">
                <h1 className="font-bold">{p.usuario.nombre}</h1>
                {p.tipoMovimiento === 1
                  ? `agrego ${p.cantidadMovimiento} productos`
                  : `retiro ${p.cantidadMovimiento} productos`}
                de la bodega:
                <h1 className="font-bold text-blue-600">{p.bodega.nombre}</h1>
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Movimientos;
