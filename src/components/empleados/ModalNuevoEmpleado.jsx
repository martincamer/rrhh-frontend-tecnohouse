import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useEmpleadosContext } from "../../context/EmpleadosContext";
import { FormInput } from "../formularios/FormInput";
import { Button } from "../formularios/Button";
import client from "../../api/axios";
import io from "socket.io-client";
import { toast } from "react-toastify";

export const ModalNuevoEmpleado = () => {
  const { register, handleSubmit, reset } = useForm();
  const { setEmpleados } = useEmpleadosContext();

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_URL, {
      withCredentials: true,
    });

    setSocket(newSocket);

    newSocket.on("nuevo-empleado", (crearProveedor) => {
      setEmpleados(crearProveedor);
    });

    return () => newSocket.close();
  }, []);

  const onSubmit = async (formData) => {
    try {
      // Creamos el objeto del producto con todos los datos y la URL de la imagen
      const empleadoData = {
        ...formData,
      };

      const res = await client.post("/empleados", empleadoData);

      //   setProveedores(res?.data?.todosLosProveedores);
      if (socket) {
        socket.emit("nuevo-proveedor", res?.data?.todosLosEmpleados);
      }

      toast.success("Empleado guardado correctamente", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          padding: "12px",
        },
      });

      document.getElementById("my_modal_nuevo_empleado").close();

      reset();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <dialog id="my_modal_nuevo_empleado" className="modal">
      <div className="modal-box max-w-3xl rounded-none py-10">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-xl text-violet-500">
          Crea un nuevo empleado
        </h3>
        <p className="py-2">En esta sección podras crear un nuevo empleado.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
          <div className="font-bold text-orange-500 text-lg">
            Datos del empleado
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              labelText={"Nombre"}
              placeholder={"Escribe el nombre del empleado"}
              type={"text"}
              props={{ ...register("nombre", { required: true }) }}
            />
            <FormInput
              labelText={"Apellido"}
              placeholder={"Escribe el apellido del empleado"}
              type={"text"}
              props={{ ...register("apellido", { required: true }) }}
            />
            <FormInput
              labelText={"Dni"}
              placeholder={"Escribe el DNI del empleado"}
              type={"text"}
              props={{ ...register("dni", { required: true }) }}
            />
            <FormInput
              labelText={"Ciudad"}
              placeholder={"Escribe la ciudad del empleado"}
              type={"text"}
              props={{ ...register("ciudad", { required: true }) }}
            />
            <FormInput
              labelText={"País"}
              placeholder={"Escribe el país del empleado"}
              type={"text"}
              props={{ ...register("pais", { required: true }) }}
            />
            <FormInput
              labelText={"Fecha Nacimiento"}
              placeholder={"Escribe la fecha de nacimiento del empleado"}
              type={"text"}
              props={{ ...register("fecha_nacimiento", { required: true }) }}
            />
            <FormInput
              labelText={"Género"}
              placeholder={"Escribe el género del empleado"}
              type={"text"}
              props={{ ...register("genero", { required: true }) }}
            />

            <FormInput
              labelText={"Teléfono Personal"}
              placeholder={"Escribe el teléfono personal del empleado"}
              type={"text"}
              props={{ ...register("telefono_personal", { required: true }) }}
            />
            <FormInput
              labelText={"Estado Civil"}
              placeholder={"Escribe el estado civil del empleado"}
              type={"text"}
              props={{ ...register("estado_civil", { required: true }) }}
            />
            <FormInput
              labelText={"Estudios Primarios"}
              placeholder={"Escribe los estudios primarios del empleado"}
              type={"text"}
              props={{ ...register("estudios_primarios", { required: true }) }}
            />
            <FormInput
              labelText={"Estudios Secundarios"}
              placeholder={"Escribe los estudios secundarios del empleado"}
              type={"text"}
              props={{
                ...register("estudios_secundarios", { required: true }),
              }}
            />
            <FormInput
              labelText={"Estudios Universitarios"}
              placeholder={"Escribe los estudios universitarios del empleado"}
              type={"text"}
              props={{
                ...register("estudios_universitarios", { required: true }),
              }}
            />
            <FormInput
              labelText={"Fecha Contratación"}
              placeholder={"Escribe la fecha de contratación del empleado"}
              type={"text"}
              props={{ ...register("fecha_contratacion", { required: true }) }}
            />

            <FormInput
              labelText={"Hijos"}
              placeholder={"Escribe los hijos del empleado"}
              type={"text"}
              props={{ ...register("hijos", { required: true }) }}
            />
            <FormInput
              labelText={"Localidad"}
              placeholder={"Escribe la localidad del empleado"}
              type={"text"}
              props={{ ...register("localidad", { required: true }) }}
            />
            <FormInput
              labelText={"Email"}
              placeholder={"Escribe el email del empleado"}
              type={"email"}
              props={{ ...register("email_empleado", { required: true }) }}
            />
            <FormInput
              labelText={"Cuenta Bancaria"}
              placeholder={"Escribe la cuenta bancaria del empleado"}
              type={"text"}
              props={{ ...register("cuenta_bancaria", { required: true }) }}
            />
            <FormInput
              labelText={"Dirección"}
              placeholder={"Escribe la dirección del empleado"}
              type={"text"}
              props={{ ...register("direccion", { required: true }) }}
            />
            <FormInput
              labelText={"Número Teléfono"}
              placeholder={"Escribe el número de teléfono del empleado"}
              type={"text"}
              props={{ ...register("numero_telefono", { required: true }) }}
            />
            <FormInput
              labelText={"Obra Social"}
              placeholder={"Escribe la obra social del empleado"}
              type={"text"}
              props={{ ...register("obrasocial", { required: true }) }}
            />

            <FormInput
              labelText={"Puesto"}
              placeholder={"Escribe el puesto del empleado"}
              type={"text"}
              props={{ ...register("puesto", { required: true }) }}
            />

            <FormInput
              labelText={"Salario Actual"}
              placeholder={"Escribe el salario actual del empleado"}
              type={"text"}
              props={{ ...register("salario_actual", { required: true }) }}
            />

            <FormInput
              labelText={"Tipo Contrato"}
              placeholder={"Escribe el tipo de contrato del empleado"}
              type={"text"}
              props={{ ...register("tipo_contrato", { required: true }) }}
            />
          </div>
          <div className="flex mt-3">
            <Button type={"submit"} titulo={"Guardar el empleado"} />
          </div>
        </form>
      </div>
    </dialog>
  );
};
