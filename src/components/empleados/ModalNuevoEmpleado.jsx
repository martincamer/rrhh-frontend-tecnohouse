import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useEmpleadosContext } from "../../context/EmpleadosContext";
import { FormInput } from "../formularios/FormInput";
import { Button } from "../formularios/Button";
import client from "../../api/axios";
import io from "socket.io-client";
import { toast } from "react-toastify";
import { FormSelect } from "../formularios/FormSelect";

export const ModalNuevoEmpleado = () => {
  const { register, handleSubmit, reset } = useForm();
  const { setEmpleados } = useEmpleadosContext();

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_URL, {
      withCredentials: true,
    });

    setSocket(newSocket);

    newSocket.on("nuevo-empleado", (crearEmpleado) => {
      setEmpleados(crearEmpleado);
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
        socket.emit("nuevo-empleado", res?.data?.todosLosEmpleados);
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
              styles={"capitalize"}
              labelText={"Nombre"}
              placeholder={"Escribe el nombre del empleado"}
              type={"text"}
              props={{ ...register("nombre", { required: true }) }}
            />
            <FormInput
              styles={"capitalize"}
              labelText={"Apellido"}
              placeholder={"Escribe el apellido del empleado"}
              type={"text"}
              props={{ ...register("apellido", { required: true }) }}
            />
            <FormInput
              styles={"capitalize"}
              labelText={"Dni"}
              placeholder={"Escribe el DNI del empleado"}
              type={"text"}
              props={{ ...register("dni", { required: true }) }}
            />
            <FormInput
              styles={"capitalize"}
              labelText={"Ciudad"}
              placeholder={"Escribe la ciudad del empleado"}
              type={"text"}
              props={{ ...register("ciudad", { required: true }) }}
            />
            <FormInput
              styles={"capitalize"}
              labelText={"País"}
              placeholder={"Escribe el país del empleado"}
              type={"text"}
              props={{ ...register("pais", { required: true }) }}
            />

            <FormInput
              labelText={"Fecha Nacimiento"}
              placeholder={"Escribe la fecha de nacimiento del empleado"}
              type={"date"}
              props={{ ...register("fecha_nacimiento", { required: true }) }}
            />

            <FormInput
              styles={"capitalize"}
              labelText={"Teléfono Personal"}
              placeholder={"Escribe el teléfono personal del empleado"}
              type={"text"}
              props={{ ...register("telefono_personal", { required: true }) }}
            />

            <FormSelect
              labelText={"Genero"}
              props={{ ...register("genero", { required: true }) }}
            >
              <option className="font-bold text-violet-600">
                Seleccionar el genero
              </option>
              <option className="font-semibold" value={"masculino"}>
                Masculino
              </option>
              <option className="font-semibold" value={"femenino"}>
                Femenino
              </option>
            </FormSelect>
            <FormSelect
              labelText={"Estado civil"}
              props={{ ...register("estado_civil", { required: true }) }}
            >
              <option className="font-bold text-violet-600">
                Seleccionar el estado
              </option>
              <option className="font-semibold" value={"soltero"}>
                Soltero/a
              </option>
              <option className="font-semibold" value={"casado"}>
                Casado/a
              </option>
              <option className="font-semibold" value={"divorciado"}>
                Divorciado/a
              </option>
              <option className="font-semibold" value={"viudo"}>
                Viudo/a
              </option>
            </FormSelect>
            <FormInput
              labelText={"Fecha Contratación"}
              placeholder={"Escribe la fecha de contratación del empleado"}
              type={"date"}
              props={{ ...register("fecha_contratacion", { required: true }) }}
            />

            <FormInput
              labelText={"Email"}
              placeholder={"Escribe el email del empleado"}
              type={"email"}
              props={{ ...register("email_empleado", { required: true }) }}
            />
            <FormInput
              styles={"capitalize"}
              labelText={"Cuenta Bancaria"}
              placeholder={"Escribe la cuenta bancaria del empleado"}
              type={"text"}
              props={{ ...register("cuenta_bancaria", { required: true }) }}
            />
            <FormInput
              styles={"capitalize"}
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
              styles={"capitalize"}
              labelText={"Obra Social"}
              placeholder={"Escribe la obra social del empleado"}
              type={"text"}
              props={{ ...register("obrasocial", { required: true }) }}
            />

            <FormSelect
              labelText={"Puesto  del empleado"}
              props={{ ...register("puesto", { required: true }) }}
            >
              <option value="">Seleccionar el puesto</option>
              <option value="encargado">Encargado</option>
              <option value="jefe de fabrica">Jefe de Fábrica</option>
              <option value="gerente">Gerente</option>
              <option value="armador">Armador</option>
              <option value="produccion">Producción</option>
              <option value="sub gerente">Sub Gerente</option>
              <option value="vendedor">Vendedor</option>
              <option value="administrativo">Administrativo</option>
              <option value="contable">Contable</option>
              <option value="sistemas">Sistemas</option>
              <option value="recursos humanos">Recursos Humanos</option>
            </FormSelect>
            <FormSelect
              labelText={"Tipo Contrato"}
              props={{ ...register("tipo_contrato", { required: true }) }}
            >
              <option className="font-bold text-violet-600">
                Seleccionar el tipo
              </option>
              <option className="font-semibold" value={"contrato completo"}>
                Contrato completo
              </option>
              <option className="font-semibold" value={"periodo de prueba"}>
                Periodo de prueba
              </option>
            </FormSelect>
            <FormSelect
              labelText={"Fabrica/Suc."}
              props={{ ...register("fabrica", { required: true }) }}
            >
              <option className="font-bold text-violet-600">
                Seleccionar la fabrica
              </option>
              <option className="font-semibold" value={"parque industrial"}>
                Fabrica Parque industrial
              </option>
              <option className="font-semibold" value={"aberturas"}>
                Fabrica aberturas
              </option>
              <option className="font-semibold" value={"aberturas"}>
                Adminstración m/c
              </option>
            </FormSelect>
            <FormSelect
              labelText={"Estado del empleado"}
              props={{ ...register("estado", { required: true }) }}
            >
              <option className="font-bold text-violet-600">
                Seleccionar el estado
              </option>
              <option className="font-semibold" value={"enfermo"}>
                Enfermo
              </option>
              <option className="font-semibold" value={"trabajando"}>
                Trabajando
              </option>
              <option className="font-semibold" value={"reposo"}>
                En reposo
              </option>
            </FormSelect>

            {/* <FormInput
              labelText={"Salario Actual"}
              placeholder={"Escribe el salario actual del empleado"}
              type={"text"}
              props={{ ...register("salario_actual", { required: true }) }}
            /> */}

            {/* <FormInput
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
            /> */}
          </div>
          <div className="flex mt-3">
            <Button type={"submit"} titulo={"Guardar el empleado"} />
          </div>
        </form>
      </div>
    </dialog>
  );
};
