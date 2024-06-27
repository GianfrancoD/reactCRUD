import { useState } from "react";
import "./form.css";

export const Form = () => {
  const [formdatas, setDatas] = useState([]);
  const [edit, setEdit] = useState(false);
  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    edad: "",
  });
  const [Search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formulario);
    setDatas([...formdatas, formulario]);
    setFormulario({ nombre: "", correo: "", edad: "" });

    fetch("http://127.0.0.1:5000/admin", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formulario),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const truncar = (username) => {
    if (username.length > 9) {
      return `${username.slice(0, 7)}...`;
    } else {
      return `${username}`;
    }
  };

  const handleEdit = (index) => {
    setEdit(index);
    setFormulario({ ...formdatas[index] });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setDatas(
      formdatas.map((form, i) => (i === edit ? { ...formulario } : form))
    );
    setEdit(null);
    setFormulario({ nombre: "", correo: "", edad: "" });
  };

  const handleDelete = (index) => {
    setDatas(formdatas.filter((form, v) => v !== index));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredFormdatas = formdatas.filter((form) => {
    const nombre = form.nombre.toLowerCase();
    const correo = form.correo.toLowerCase();
    const search = Search.toLowerCase();
    return (
      nombre.includes(search) ||
      correo.includes(search) ||
      form.edad.toString().includes(search)
    );
  });

  return (
    <>
      <header className="headersearch">
        <span className="material-symbols-outlined">search</span>
        <input
          type="search"
          className="search"
          placeholder="¿Que estas buscando?.."
          onChange={handleSearch}
        />
      </header>
      <main id="mains">
        <form onSubmit={handleSubmit}>
          <header id="agregar">
            <h1>agregar</h1>
          </header>
          <ul id="formulario">
            <ul>
              <li>correo</li>
              <input
                required
                type="text"
                value={formulario.correo}
                minLength={2}
                maxLength={100}
                pattern="^(?![0-9])([a-zA-Z0-9._%+ñáéíóú]+)@gmail\.com$"
                placeholder=" Escribir correo.."
                onChange={(e) => {
                  setFormulario({ ...formulario, correo: e.target.value });
                }}
              />
            </ul>

            <ul>
              <li>nombre</li>
              <input
                required
                type="text"
                placeholder=" Escribir Nombre.."
                pattern="[a-zA-Z]+"
                maxLength={11}
                value={formulario.nombre}
                onChange={(e) => {
                  setFormulario({ ...formulario, nombre: e.target.value });
                }}
              />
            </ul>

            <ul>
              <li>edad</li>
              <input
                required
                type="number"
                pattern="[0-9]+"
                placeholder=" Escribir edad.."
                value={formulario.edad}
                onChange={(e) => {
                  setFormulario({ ...formulario, edad: e.target.value });
                }}
              />
            </ul>
            <button id="boton">Send</button>
          </ul>
        </form>
        <table id="result">
          <thead>
            {formdatas.length > 0 ? (
              <p>
                Existe un total de: <b id="total">{formdatas.length}</b>
              </p>
            ) : (
              <p style={{ color: "red" }}>
                No hay datos, ingrese datos para ver resultados.
              </p>
            )}
            <tr>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredFormdatas.map((form, index) => (
              <tr key={index}>
                <td>{form.nombre ? truncar(form.nombre) : ""}</td>
                <td>{form.edad}</td>
                <td>{form.correo}</td>
                <td>
                  {edit === index ? (
                    <button id="botones" onClick={handleUpdate}>
                      Actualizar
                    </button>
                  ) : (
                    <button id="botones" onClick={() => handleEdit(index)}>
                      Editar
                    </button>
                  )}
                  <button id="botones" onClick={() => handleDelete(index)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
};
