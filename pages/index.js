import { useState, useEffect } from "react";
import produce from "immer";
import * as datastore from "../libs/datastore";
import descricao from "../libs/descricao";
import AsanaForm from "../components/asana-form";
import SelectDatastore from "../components/select-datastore";
import Button from "../components/button";
import * as Table from "../components/table";

export default function Home() {
  const [handle, setHandle] = useState(null);
  const [database, setDatabase] = useState(null);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);

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

  function handleEdit(i) {
    return function () {
      setEdit(i);
      setOpen(true);
    };
  }

  function handleDelete(i) {
    return function () {
      if (window.confirm(`Realmente apagar ${database.asanas[i].nome}?`)) {
        setDatabase(
          produce((draft) => {
            draft.asanas.splice(i, 1);
          })
        );
      }
    };
  }

  if (!handle) {
    return <SelectDatastore create={create} load={load} />;
  }

  if (!database) {
    return null;
  }

  return (
    <>
      <div className="p-4 bg-gray-100 flex justify-between">
        <Button className="bg-green-500" onClick={handleOpen}>
          Novo Asana
        </Button>
        <Button className="bg-red-500" onClick={close}>
          Fechar banco de dados
        </Button>
      </div>
      <div className="flex flex-col p-4">
        <h1 className="text-4xl font-extrabold mx-2 mt-2">Asanas</h1>

        {open && <AsanaForm database={database} setDatabase={setDatabase} onClose={handleClose} edit={edit} />}

        {database.asanas.length === 0 && <p className="m-2">Nenhum Ásana cadastrado</p>}
        {database.asanas.length > 0 && (
          <Table.Container>
            <thead className="bg-gray-50">
              <tr>
                <Table.HeadRow>Nome</Table.HeadRow>
                <Table.HeadRow>Plano</Table.HeadRow>
                <Table.HeadRow>Equilibrio</Table.HeadRow>
                <Table.HeadRow>Alongamento</Table.HeadRow>
                <Table.HeadRow>Fortalecimento</Table.HeadRow>
                <Table.HeadRow>Ações</Table.HeadRow>
              </tr>
            </thead>
            <tbody>
              {database.asanas.map((asana, i) => (
                <tr key={i}>
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
                      onClick={handleEdit(i)}
                    >
                      Editar
                    </Table.Button>
                    <Table.Button className="mx-2 bg-red-100 text-red-800 focus:ring-red-500" onClick={handleDelete(i)}>
                      Apagar
                    </Table.Button>
                  </Table.Row>
                </tr>
              ))}
            </tbody>
          </Table.Container>
        )}
      </div>
    </>
  );
}

function enumerar(arr) {
  if (arr) {
    return arr.map(descricao).join(", ");
  } else {
    return "";
  }
}
