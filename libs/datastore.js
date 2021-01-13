const description = "Base de dados de Ásanas";
const accept = { "application/json": [".json"] };

export async function write(handle, content) {
  const json = JSON.stringify(content);
  const blob = new Blob([json], { type: "application/json" });
  const writable = await handle.createWritable();
  await writable.write(blob);
  await writable.close();
}

export async function read(handle) {
  const file = await handle.getFile();
  return JSON.parse(await file.text());
}

export async function create() {
  const handle = await window.showSaveFilePicker({
    types: [{ fileName: "asanas.json", description, accept }],
  });

  await write(handle, { _meta: { version: "v1" }, asanas: [] });
  return handle;
}

export async function load() {
  const handles = await window.showOpenFilePicker({
    types: [{ description, accept }],
    multiple: false,
  });

  return handles[0];
}
