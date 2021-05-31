import React from "react";

const ListaProductosBodegas = (productos) => {
  const [productosToBodega, setProductosToBodega] = React.useState([]);

  return (
    <>
      {productos.productos.map(function (p) {
        return (
          <div class="px-6">
            <div class="flex justify-between items-center h-16 p-4 my-6  rounded-lg border border-gray-100 shadow-md">
              <div class="flex items-center">
                <div class="ml-2">
                  <div class="text-sm font-semibold text-gray-600">
                    {p.nombre}
                  </div>
                  <div class="text-sm font-light text-gray-500">
                    {p.descripcion}
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={setProductosToBodega(p._id)}
                  class="bg-red-400 hover:bg-red-500  p-2 rounded-full shadow-md flex justify-center items-center"
                >
                  <svg
                    class="text-white toggle__lock w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ListaProductosBodegas;
