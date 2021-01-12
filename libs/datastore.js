const description = "Base de dados de Ásanas";
const accept = { "application/json": [".json"] };

export default class Datastore {
  async init() {
    if (this.handle) {
      const file = await this.handle.getFile();
      return JSON.parse(await file.text());
    } else {
      return { _meta: { version: "v1" }, asanas: [] };
    }
  }

  async autoSave(content) {
    if (this.handle) {
      const json = JSON.stringify(content);
      console.log("autosave", content);
      const blob = new Blob([json], { type: "application/json" });
      const writable = await this.handle.createWritable();
      await writable.write(blob);
      await writable.close();
    }
  }

  async save(content) {
    if (!this.handle) {
      this.handle = await window.showSaveFilePicker({
        types: [{ fileName: "asanas.json", description, accept }],
      });
    }

    const json = JSON.stringify(content);
    const blob = new Blob([json], { type: "application/json" });
    const writable = await this.handle.createWritable();
    await writable.write(blob);
    await writable.close();
  }

  async load(force = false) {
    if (!this.handle || force) {
      const handles = await window.showOpenFilePicker({
        types: [{ description, accept }],
        multiple: false,
      });
      this.handle = handles[0];
    }
    const file = await this.handle.getFile();
    return JSON.parse(await file.text());
  }
}
