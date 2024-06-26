import { useState } from "react";
import "./form.css";

export const Form = () => {
  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    edad: "",
  });
  const [formdatas, setDatas] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formulario);
    setDatas([...formdatas, formulario]);
    setFormulario({ nombre: "", correo: "", edad: "" });
  };

  const truncar = (username) => {
    if (username.length > 9) {
      return `${username.slice(0, 7)}...`;
    } else {
      return `${username}`;
    }
  };

  return (
    <>
      <main id="mains">
        <header id="agregar">
          <h1>agregar</h1>
        </header>
        <form action="" onSubmit={handleSubmit}>
          <ul id="formulario">
            <ul>
              <li>correo</li>
              <input
                type="text"
                value={formulario.correo}
                placeholder=" Escribir correo.."
                onChange={(e) => {
                  setFormulario({ ...formulario, correo: e.target.value });
                }}
              />
            </ul>

            <ul>
              <li>nombre</li>
              <input
                type="text"
                placeholder=" Escribir Nombre.."
                value={formulario.nombre}
                onChange={(e) => {
                  setFormulario({ ...formulario, nombre: e.target.value });
                }}
              />
            </ul>

            <ul>
              <li>edad</li>
              <input
                type="number"
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
        <ul id="result">
          {formdatas.map((form, index) => (
            <li key={index}>
              <p>{form.nombre ? truncar(form.nombre) : ""}</p>
              <p>{form.edad}</p>
              <p>{form.correo}</p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};
