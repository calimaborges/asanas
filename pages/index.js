import Head from "next/head";
import { useState, useEffect } from "react";
import produce from "immer";
import * as datastore from "../libs/datastore";
import options from "../libs/options";
import AsanaForm from "../components/asana-form";
import SelectDatastore from "../components/select-datastore";
import Button from "../components/button";
import * as Table from "../components/table";
import SearchIcon from "../components/icons/search-icon";
import normalizarString from "../libs/normalizar-string";
import MultiAutocompleteSelect from "../components/multi-autocomplete-select";

export default function Home() {
  const [handle, setHandle] = useState(null);
  const [database, setDatabase] = useState(null);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [filterText, setFilterText] = useState("");

  function handleClose() {
    setEdit(null);
    setOpen(false);
  }

  function handleOpen() {
    setEdit(null);
    setOpen(true);
  }

  useEffect(() => {
    if (handle) {
      datastore.read(handle).then(setDatabase);
    }
  }, [handle]);

  useEffect(() => {
    if (handle && database) {
      datastore.write(handle, database);
    }
  }, [handle, database]);

  async function create() {
    const handle = await datastore.create();
    setHandle(handle);
  }

  async function load() {
    {
      const handle = await datastore.load();
      setHandle(handle);
    }
  }

  function close() {
    setHandle(null);
  }

  function handleEdit(nome) {
    return function () {
      setEdit(nome);
      setOpen(true);
    };
  }

  function handleDelete(nome) {
    return function () {
      if (window.confirm(`Realmente apagar ${database.asanas.find((a) => a.nome === nome).nome}?`)) {
        setDatabase(
          produce((draft) => {
            draft.asanas = draft.asanas.filter((a) => a.nome !== nome);
          })
        );
      }
    };
  }

  function filtrar(asana) {
    if (!filterText) return true;
    return normalizarString(asana.nome).indexOf(normalizarString(filterText)) > -1;
  }

  if (!handle) {
    return <SelectDatastore create={create} load={load} />;
  }

  if (!database) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Ásanas</title>
      </Head>
      <div className="p-4 bg-gray-50 flex justify-between fixed w-full shadow-md">
        <Button className="bg-green-500" onClick={handleOpen}>
          Novo Asana
        </Button>
        <form className="flex p-1 border shadow rounded-full overflow-hidden focus-within:shadow-outline-blue w-1/2 bg-white">
          <input
            className="flex-grow text-gray-700 mx-4 focus:outline-none"
            name="tema-input"
            placeholder="Pesquise por um ásana..."
            type="search"
            value={filterText}
            onChange={(event) => setFilterText(event.target.value)}
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 text-white rounded-full hover:bg-blue-100 focus:bg-blue-100 focus:outline-none"
          >
            <SearchIcon className="text-blue-500 h-4" />
          </button>
        </form>
        {/* <MultiAutocompleteSelect
          options={filtros.magistrados}
          label="Filtrar por plano"
          onSelect={(id) => setSelectedMagistrados((items) => [...items, id])}
          onUnselect={(id) => setSelectedMagistrados((items) => items.filter((i) => id !== i))}
          selected={selectedMagistrados}
        /> */}
        <Button className="bg-red-500" onClick={close}>
          Fechar banco de dados
        </Button>
      </div>
      <div className="flex flex-col pt-24">
        {open && <AsanaForm database={database} setDatabase={setDatabase} onClose={handleClose} edit={edit} />}

        {database.asanas.length === 0 && <p className="m-2">Nenhum Ásana cadastrado</p>}
        {database.asanas.length > 0 && (
          <>
            <Table.Container>
              <thead className="bg-gray-100">
                <tr>
                  <Table.HeadRow className="w-3/12">Ásana</Table.HeadRow>
                  <Table.HeadRow className="w-2/12">Plano</Table.HeadRow>
                  <Table.HeadRow className="w-2/12">Equilibrio</Table.HeadRow>
                  <Table.HeadRow className="w-2/12">Alongamento</Table.HeadRow>
                  <Table.HeadRow className="w-2/12">Fortalecimento</Table.HeadRow>
                  <Table.HeadRow className="w-1/12 text-center">Ações</Table.HeadRow>
                </tr>
              </thead>
              <tbody>
                {database.asanas.filter(filtrar).map((asana) => (
                  <tr key={asana.nome}>
                    <Table.Row>
                      {asana.nome}
                      {asana.paginas && <> ({asana.paginas})</>}
                    </Table.Row>
                    <Table.Row>{enumerar(asana.planos)}</Table.Row>
                    <Table.Row>{enumerar(asana.equilibrios)}</Table.Row>
                    <Table.Row>{enumerar(asana.alongamentos)}</Table.Row>
                    <Table.Row>{enumerar(asana.fortalecimentos)}</Table.Row>
                    <Table.Row>
                      <Table.Button
                        className="mx-2 bg-gray-100 text-gray-800 focus:ring-gray-500"
                        onClick={handleEdit(asana.nome)}
                      >
                        Editar
                      </Table.Button>
                      <Table.Button
                        className="mx-2 bg-red-100 text-red-800 focus:ring-red-500"
                        onClick={handleDelete(asana.nome)}
                      >
                        Apagar
                      </Table.Button>
                    </Table.Row>
                  </tr>
                ))}
              </tbody>
            </Table.Container>
          </>
        )}
      </div>
    </>
  );
}

function enumerar(arr) {
  if (arr) {
    return arr.map((i) => options[i].descricao).join(", ");
  } else {
    return "";
  }
}
