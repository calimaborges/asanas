import Datastore from "./datastore";
import { useState, useEffect } from "react";

const datastore = new Datastore();
export default function useDatastore() {
  const [database, setDatabase] = useState(null);

  useEffect(() => {
    datastore.init().then(setDatabase);
  }, []);

  useEffect(() => {
    datastore.autoSave(database);
  }, [database]);

  function load() {
    datastore.load().then(setDatabase);
  }

  function save() {
    datastore.save(database);
  }

  return [database, setDatabase, load, save];
}
