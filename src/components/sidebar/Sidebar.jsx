import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Link, useLocation } from "react-router-dom";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { FaBuildingUser, FaDatabase } from "react-icons/fa6";
import { FaFile } from "react-icons/fa";

export const SideBar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`${
        isOpen ? "w-64 opacity-1" : "w-16 opacity-1"
      } transition-all ease-linear flex flex-col bg-white z-[100] border-r max-md:hidden`}
    >
      {/* Botón de menú */}
      <div
        className={`${
          isOpen ? "flex justify-between" : ""
        } transition-all ease-linear duration-300 py-3 px-4 border-b-[2px] border-violet-500`}
      >
        <button className="text-3xl text-violet-500" onClick={handleToggle}>
          {isOpen ? <IoCloseOutline /> : <IoMenuOutline />}
        </button>
        {isOpen && (
          <p className="bg-orange-500 py-1 px-2 rounded-xl text-sm font-semibold text-white capitalize">
            {user?.username}
          </p>
        )}
      </div>
      {isOpen ? (
        <div className="w-full max-h-full min-h-full h-full flex flex-col gap-0">
          <Link
            to={"/"}
            className={`${
              location.pathname === "/" ? "bg-gray-100" : "bg-none"
            } hover:text-gray-700 text-orange-500 text-sm transition-all py-3 px-3`}
          >
            Inicio/estadistica/compras
          </Link>

          <Link
            to={"/proveedores"}
            className={`${
              location.pathname === "/proveedores" ? "bg-gray-100" : "bg-none"
            } hover:text-orange-500 text-orange-500 text-sm transition-all py-3 px-3`}
          >
            Proveedores, crear nuevos, editar, etc.
          </Link>
        </div>
      ) : (
        <div className="flex flex-col justify-center">
          <div
            className={`${
              location.pathname === "/" ? "bg-gray-100" : "bg-none"
            } w-full text-center py-2 items-center transition-all`}
          >
            <div className="w-full text-center py-2 items-center transition-all ">
              <div
                className="tooltip tooltip-right font-bold"
                data-tip="INICIO/ESTADISTICAS/ETC"
              >
                <Link to={"/"}>
                  <FaDatabase className="text-3xl text-orange-600" />
                </Link>
              </div>
            </div>
          </div>

          <div
            className={`${
              location.pathname === "/empleados" ? "bg-gray-100" : "bg-none"
            } w-full text-center py-2 items-center transition-all`}
          >
            <div className="w-full text-center py-2 items-center transition-all ">
              <div
                className="tooltip tooltip-right font-bold"
                data-tip="EMPLEADOS"
              >
                <Link to={"/empleados"}>
                  <FaBuildingUser className="text-4xl text-orange-600" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
