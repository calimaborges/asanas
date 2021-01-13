export default function descricao(id) {
  switch (id) {
    case "plano-alto": return "plano alto";
    case "plano-medio": return "plano médio";
    case "plano-baixo": return "plano baixo";
    case "invertida": return "invertida";

    case "equilibrio": return "equilíbrio";
    case "tracao": return "tração";
    case "flexao": return "flexão";
    case "extensao": return "extensão";
    case "flexao-lateral": return "flexão lateral";
    case "torcao": return "torção";

    case "alongamento-peitoral": return "peitoral";
    case "alongamento-costas": return "costas";
    case "alongamento-abdomen": return "abdômen";
    case "alongamento-pernas": return "pernas";

    case "fortalecimento-peitoral": return "peitoral";
    case "fortalecimento-costas": return "costas";
    case "fortalecimento-abdomen": return "abdômen";
    case "fortalecimento-pernas": return "pernas";

    default: return id;
  }
}