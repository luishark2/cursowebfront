import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ListadoEmpleados() {
  const urlBase = "http://localhost:8081/api/empleados";

  const [empleados, setEmpleados] = React.useState([]);

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    try {
      const resultado = await axios.get(urlBase);
      setEmpleados(resultado.data);
      
      console.log("Empleados cargados:", resultado.data);
    } catch (error) {
      console.log("Error al cargar empleados:", error);
    }
  };
  
  const eliminarEmpleado = async (id) => {
    await axios.delete(`${urlBase}/${id}`);
    cargarEmpleados();
}



  return (
    <div className="container">
      <div className="container text-center">
        <h3>Listado de Empleados</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nombre</th>
              <th scope="col">Departamento</th>
              <th scope="col">Sueldo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado) => (
              <tr key={empleado.idEmpleado}>
                <td>{empleado.idEmpleado}</td>
                <td>{empleado.nombre}</td>
                <td>{empleado.departamento}</td>
                <td>{empleado.sueldo}</td>
                <td><button onClick={()=> eliminarEmpleado(empleado.idEmpleado)} className='btn btn-danger btn-sm'>
                        <i className="bi bi-trash "></i>
                    </button>
                    <Link to={`/editar/${empleado.idEmpleado}`} className='btn btn-warning btn-sm me-3'>
                        <i className=" bi bi-pencil"></i>
                    </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListadoEmpleados;
