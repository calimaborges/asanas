import React from "react";
import Button from "../components/button";

export default function SelectDatastore({ create, load }) {
  async function handleCreate() {
    try {
      await create();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLoad() {
    try {
      await load();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-4 bg-gray-100 flex justify-evenly">
      <Button onClick={handleLoad}>Carregar banco de dados</Button>
      <Button onClick={handleCreate}>Criar novo banco de dados</Button>
    </div>
  );
}