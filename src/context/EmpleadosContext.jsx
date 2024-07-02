// imports
import { createContext, useContext, useEffect, useState } from "react";
import client from "../api/axios";

// context
export const EmpleadosContext = createContext();

// use context
export const useEmpleadosContext = () => {
  const context = useContext(EmpleadosContext);
  if (!context) {
    throw new Error("Use EmpleadosProvider");
  }
  return context;
};

// EmpleadosProvider component
export const EmpleadosProvider = ({ children }) => {
  const [empleados, setEmpleados] = useState([]);
  const [empleado, setEmpleado] = useState([]);

  useEffect(() => {
    async function fetchEmpleados() {
      try {
        const respuesta = await client.get("/empleados");
        setEmpleados(respuesta.data);
      } catch (error) {
        console.error("Error fetching empleados data:", error);
      }
    }

    fetchEmpleados();
  }, []);

  return (
    <EmpleadosContext.Provider
      value={{
        empleados,
        setEmpleados,
        empleado,
        setEmpleado,
      }}
    >
      {children}
    </EmpleadosContext.Provider>
  );
};
