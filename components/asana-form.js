import React, { useRef, useEffect, useState } from "react";
import produce from "immer";
import { planos, equilibrios, alongamentos, fortalecimentos } from "../libs/options";
import Button from "./button";

function createAsana() {
  return {
    nome: "",
    paginas: "",
    planos: [],
    equilibrios: [],
    alongamentos: [],
    fortalecimentos: [],
  };
}

export default function AsanaForm({ setDatabase, database, edit, onClose }) {
  const [asana, setAsana] = useState(null);
  const firstField = useRef();
  const form = useRef();

  useEffect(() => {
    if (edit !== null) {
      setAsana(database.asanas.find((a) => a.nome === edit));
    } else {
      setAsana(createAsana());
    }
  }, [database, edit]);

  if (!asana) return null;

  function salvar(event) {
    event.preventDefault();

    setDatabase(
      produce((draft) => {
        if (edit !== null) {
          const index = draft.asanas.findIndex((a) => a.nome === edit);
          draft.asanas[index] = asana;
        } else {
          draft.asanas.push(asana);
        }
      })
    );

    if (edit === null) {
      setAsana(createAsana());
      firstField.current.focus();
    } else {
      onClose();
    }
  }

  function handleChangeText(field) {
    return function (event) {
      const value = event.target.value;
      setAsana((asana) => ({ ...asana, [field]: value }));
    };
  }

  function handleChangeCheckbox(field) {
    return function (event) {
      const checked = event.target.checked;
      const value = event.target.value;
      if (checked) {
        setAsana((asana) => ({ ...asana, [field]: [...asana[field], value] }));
      } else {
        setAsana((asana) => ({ ...asana, [field]: asana[field].filter((i) => i !== value) }));
      }
    };
  }

  function SelectItem({ name, value, type, children }) {
    return (
      <div className="mr-2 flex flex-col w-20 border rounded-md focus-within:border-blue-500 focus-within:text-blue-700">
        <label htmlFor={value} className="py-1 text-xs font-semibold text-center capitalize">
          {children}
        </label>
        <input
          type={type}
          name={name}
          id={value}
          value={value}
          checked={!!asana[name].includes(value)}
          className="appearance-none h-16 checked:bg-blue-600 checked:border-transparent focus:outline-none border-blue-200 rounded-none"
          onChange={handleChangeCheckbox(name)}
        />
      </div>
    );
  }

  return (
    <div
      className="fixed top-0 left-0 px-2 w-full h-screen antialiased bg-gray-800 bg-opacity-75 z-30 overflow-y-scroll"
      onClick={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <form
        ref={form}
        onSubmit={salvar}
        className="my-4 pb-6 px-6 pt-4 max-w-screen-md m-auto border rounded-lg bg-white shadow-lg"
      >
        <div className="flex justify-evenly">
          <div className="mt-2 mr-2 flex flex-col flex-grow">
            <label htmlFor="nome" className="ml-1 font-semibold">
              Nome
            </label>
            <input
              className="border rounded-lg p-2"
              id="nome"
              name="nome"
              type="text"
              required
              ref={firstField}
              value={asana.nome}
              onChange={handleChangeText("nome")}
            />
          </div>

          <div className="mt-2 flex flex-col">
            <label htmlFor="paginas" className="ml-1 font-semibold">
              Páginas
            </label>
            <input
              className="border rounded-lg p-2"
              id="paginas"
              name="paginas"
              type="text"
              required
              value={asana.paginas}
              onChange={handleChangeText("paginas")}
            />
          </div>
        </div>

        {/* Posição do corpo em relação ao solo: 1o Plano Alto, 2o Plano Médio, 3o Plano Baixo, 4o Invertida */}
        <fieldset className="mt-3">
          <legend className="my-1 font-semibold">Plano</legend>
          <div className="flex">
            {Object.entries(planos).map(([key, value]) => (
              <SelectItem key={key} type="checkbox" name="planos" value={key}>
                {value.description}
              </SelectItem>
            ))}
          </div>
        </fieldset>
        {/* Descanso: Sem equilibro vertebral, alongamento ou fortalecimento */}
        {/* Equilibrio Vertebral: Equilibrio, Tração, Flexão da coluna, Extensão da coluna, Flexão lateral da coluna, Torção da coluna */}
        <fieldset className="mt-3">
          <legend className="my-1 font-semibold">Equilibrio vertebral</legend>
          <div className="flex">
            {Object.entries(equilibrios).map(([key, value]) => (
              <SelectItem key={key} type="checkbox" name="equilibrios" value={key}>
                {value.description}
              </SelectItem>
            ))}
          </div>
        </fieldset>
        {/* Alongamento: Peitoral (membros superiores frente), Costas (membros superiores dorso), Abdômen, Pernas (membros inferiores: quadril, coxas, pernas e pés)  */}
        <fieldset className="mt-3">
          <legend className="my-1 font-semibold">Alongamento</legend>
          <div className="flex">
            {Object.entries(alongamentos).map(([key, value]) => (
              <SelectItem key={key} type="checkbox" name="alongamentos" value={key}>
                {value.description}
              </SelectItem>
            ))}
          </div>
        </fieldset>
        {/* Fortalecimento: Peitoral (membros superiores frente), Costas (membros superiores dorso), Abdômen, Pernas (membros inferiores: quadril, coxas, pernas e pés)  */}
        <fieldset className="mt-3">
          <legend className="my-1 font-semibold">Fortalecimento</legend>
          <div className="flex">
            {Object.entries(fortalecimentos).map(([key, value]) => (
              <SelectItem key={key} type="checkbox" name="fortalecimentos" value={key}>
                {value.description}
              </SelectItem>
            ))}
          </div>
        </fieldset>

        {/* <hr className="w-full border mt-4" /> */}
        <div className="mt-6 flex flex-row-reverse">
          <Button type="submit" className="bg-blue-500">
            Salvar
          </Button>
          <Button type="button" className="mx-2" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </form>
    </div>
  );
}
