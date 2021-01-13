export default function normalizarString(str) {
  return str
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace("º", "o")
    .replace("ª", "a")
    .replace(/[\u0300-\u036f]/g, "");
}
