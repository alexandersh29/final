import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { isEmpty, size } from "lodash";
import {
  addDocument,
  deleteDocument,
  getCollection,
  updateDocument
} from "./actions";

function App() {
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [sucursal, setSucursal] = useState("");
  const [precio, setPrecio] = useState("");
  const [productos, setProductos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState("");

  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await getCollection("productos");
      console.log(result);
      if (result.statusRespone) {
        setProductos(result.data);
        console.log(result);
      }
    })();
  }, []);

  
  const addTask = async (e) => {
    e.preventDefault();
    if  (isEmpty(nombre)||isEmpty(codigo)||isEmpty(sucursal)||isEmpty(precio)) {
      console.log("task vacío");
      return;
    }

    const result = await addDocument("productos", 
    { nombre: nombre, codigo: codigo, sucursal: sucursal, precio: precio });
    if (!result.statusRespone) {
      setError(result.error);
      return;
    }

    /* const newTask={
        id:shortid.generate(),
        name:task
      } */
    setProductos([...productos, { id: result.data.id, 
      nombre:nombre, codigo: codigo, sucursal: sucursal, precio: precio }]);
    setNombre("");
    setCodigo("")
    setSucursal("")
    setPrecio("")
  };

  const saveTask = async (e) => {
    e.preventDefault();
    if (isEmpty(nombre)||isEmpty(codigo)||isEmpty(sucursal)||isEmpty(precio)) {
      console.log("Task vacio");
      return;
    }

    const result = await updateDocument("productos", id, 
    { name: nombre, codigo: codigo, sucursal: sucursal, precio: precio });
    if (!result.statusRespone) {
      setError(result.error);
      return;
    }

    const editedProductos = productos.map((item) => 
      item.id === id ? {id,  nombre: nombre, codigo: codigo, sucursal: sucursal, precio: precio} : item
    );
    setProductos(editedProductos);
    setEditMode(false);
    setNombre("");
    setCodigo("")
    setSucursal("")
    setPrecio("")
    setId("");

    
  };

  const deleteTask = async (id) => {
    const result = await deleteDocument("productos", id);
    if (!result.statusRespone) {
      setError(result.error);
      return;
    }
    const filteredTasks = productos.filter((producto) => producto.id !== id);
    setProductos(filteredTasks);
  };

  const editTask = (producto) => {
    setNombre(producto.nombre);
    setCodigo(producto.codigo);
    setSucursal(producto.sucursal);
    setPrecio(producto.precio);
    setId(producto.id);
    setEditMode(true);
    
  };

  return (    
    <div className="container mt-3">
      <h1>Registro de inventario</h1>
      <hr/>
      <div className="row align-items-start">
        <div className="col-8 mt-8">
          <h4 className="text-center">Inventario de Productos</h4>
          {size(productos) === 0 ? (
            <h5 className="text-center">Aún no hay Productos</h5>
          ) : (
            <ul className="list-group">
              {productos.map((producto, index) => (
                <li key={index} className="list-group-item">
                  <h5><strong>Código:</strong> {producto.codigo}</h5>
                  <h5><strong>Nombre: </strong> {producto.nombre}</h5>
                  <h5><strong>Precio:</strong> {producto.precio}</h5>
                  <h5><strong>Sucursal:</strong> {producto.sucursal}</h5>
                  
                  <button
                    onClick={() => deleteTask(producto.id)}
                    className="btn btn-danger float-end mx-2"
                  >
                    eliminar
                  </button>
                  <button
                    onClick={() => editTask(producto)}
                    className="btn btn-warning float-end mx-2"
                  >
                    editar
                  </button>
                </li>
                
              )
              )}
              
            </ul>
          )}
          
        </div>
        
        <div className="col-4">
          <h4 className="text-center">
            {" "}
            {editMode ? "Modificar Producto" : "Agregar Producto"}
          </h4>
          <form onSubmit={editMode ? saveTask : addTask}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Inserta código"
              onChange={(text) => setCodigo(text.target.value)}
              value={codigo}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Inserta nombre"
              onChange={(text) => setNombre(text.target.value)}
              value={nombre}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Inserta su precio"
              onChange={(text) => setPrecio(text.target.value)}
              value={precio}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Asigna la sucursal"
              onChange={(text) => setSucursal(text.target.value)}
              value={sucursal}
            />
            <button
              className={
                editMode ? "btn btn-primary btn-block" : "btn btn-dark btn-block"
              }
              type="submit"
            >
              {editMode ? "Guardar" : "Agregar Producto"}
            </button>
          </form>
        </div>
        <div>
            
        </div>
     
      </div>
    </div>
  );
}
export default App;
