import { Link } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { FaSearch } from "react-icons/fa";
import { useEmpleadosContext } from "../../../context/EmpleadosContext";
import { ModalNuevoEmpleado } from "../../../components/empleados/ModalNuevoEmpleado";

export const Empleados = () => {
  const { empleados } = useEmpleadosContext();

  const [searchTermCliente, setSearchTermCliente] = useState("");

  const handleSearchClienteChange = (e) => {
    setSearchTermCliente(e.target.value);
  };

  // Filtrar por término de búsqueda y usuario seleccionado
  let filteredData = empleados.filter((empleado) => {
    const matchesSearchTerm = empleado.nombre
      .toLowerCase()
      .includes(searchTermCliente.toLowerCase());

    return matchesSearchTerm;
  });

  console.log("empleados", empleados);
  return (
    <section className="min-h-screen max-h-full w-full h-full max-w-full">
      <ToastContainer />

      <div className="bg-white mb-4 h-10 flex">
        <Link
          to={"/"}
          className="bg-violet-100 flex h-full px-4 justify-center items-center font-bold text-violet-600"
        >
          Inicio
        </Link>{" "}
        <Link
          to={"/empleados"}
          className="bg-violet-500 flex h-full px-4 justify-center items-center font-bold text-white"
        >
          Empleados
        </Link>
      </div>
      <div className="mx-5 my-10 bg-white py-6 px-6">
        <p className="font-bold text-violet-500 text-xl">
          Crea tus empleados en esta sección, administralos, lleva sus datos a
          otro nivel.
        </p>
      </div>

      <div className="bg-white py-5 px-5 mx-5">
        <button
          onClick={() =>
            document.getElementById("my_modal_nuevo_empleado").showModal()
          }
          type="button"
          className="bg-violet-500 py-2 px-4 text-white font-semibold rounded hover:bg-orange-500 transition-all"
        >
          Crear nuevo empleado
        </button>
      </div>

      <div className="flex gap-2 items-center w-1/4 max-md:w-full max-md:flex-col my-5 mx-5">
        <div className="bg-white py-2 px-3 text-sm font-bold w-full border border-violet-500 cursor-pointer flex items-center">
          <input
            value={searchTermCliente}
            onChange={handleSearchClienteChange}
            type="text"
            className="outline-none text-slate-600 w-full max-md:text-sm uppercase bg-white"
            placeholder="Buscar por nombre y apellido del empleado"
          />
          <FaSearch className="text-violet-500" />
        </div>
      </div>

      {/* tabla de datos  */}
      <div className="bg-white mx-5 my-5 mb-20">
        <table className="table text-xs">
          <thead>
            <tr>
              <th className=" uppercase text-violet-600 py-5">Referencia</th>{" "}
              <th className=" uppercase text-violet-600 py-5">
                Nombre y apellido
              </th>{" "}
              <th className=" uppercase text-violet-600 py-5">Telefono</th>{" "}
              <th className=" uppercase text-violet-600 py-5">Email</th>{" "}
              <th className=" uppercase text-violet-600 py-5">Fabrica</th>{" "}
              <th className=" uppercase text-violet-600 py-5">Puesto</th>{" "}
              <th className=" uppercase text-violet-600 py-5">Estado</th>{" "}
              <th className=" uppercase text-violet-600 py-5">Acciones</th>
            </tr>
          </thead>

          <tbody className=" uppercase">
            {filteredData.map((empleado) => (
              <tr key={empleado.id}>
                <td className="font-semibold">{empleado.id}</td>
                <td className="font-semibold">
                  {empleado.nombre} {empleado.apellido}
                </td>
                <td className="font-semibold">{empleado.numero_telefono}</td>
                <td className="font-semibold">{empleado.email_empleado}</td>
                <td className="font-semibold">{empleado.fabrica}</td>
                <td className="font-semibold">{empleado.puesto}</td>
                <td className="font-semibold">{empleado.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalNuevoEmpleado />
    </section>
  );
};
