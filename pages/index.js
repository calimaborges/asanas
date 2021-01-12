import useDatastore from "../libs/use-datastore";
import produce from "immer";

export default function Index() {
  const [database, setDatabase, load, save] = useDatastore();

  function cadastrar(event) {
    event.preventDefault();

    const form = event.target;
    const nome = form.elements.nome.value;
    const plano = form.elements.plano.value;
    const equilibrios = [];
    for (const e of form.elements.equilibrio) {
      if (e.checked) equilibrios.push(e.value);
    }
    const alongamentos = [];
    for (const e of form.elements.alongamento) {
      if (e.checked) alongamentos.push(e.value);
    }
    const fortalecimentos = [];
    for (const e of form.elements.fortalecimento) {
      if (e.checked) fortalecimentos.push(e.value);
    }
    const paginas = form.elements.paginas.value;
    form.reset();

    setDatabase(
      produce((draft) => {
        if (draft.asanas === undefined) draft.asanas = [];
        draft.asanas.push({ nome, plano, equilibrios, alongamentos, fortalecimentos, paginas });
      })
    );
  }

  return (
    <div className="flex flex-col p-4">
      <button onClick={save}>New database</button>
      <button onClick={load}>Load database</button>
      <h1 className="text-4xl font-extrabold">Asanas</h1>
      <h2 className="text-2xl font-bold">Cadastro</h2>

      <form onSubmit={cadastrar}>
        <label htmlFor="nome">Nome</label>
        <input id="nome" name="nome" type="text" />

        <label htmlFor="paginas">Páginas</label>
        <input id="paginas" name="paginas" type="text" />

        {/* Posição do corpo em relação ao solo: 1o Plano Alto, 2o Plano Médio, 3o Plano Baixo, 4o Invertida */}
        <fieldset>
          <legend>Plano</legend>
          <input type="radio" name="plano" id="plano-alto" value="plano-alto" />
          <label htmlFor="plano-alto">Plano alto</label>
          <input type="radio" name="plano" id="plano-medio" value="plano-medio" />
          <label htmlFor="plano-medio">Plano médio</label>
          <input type="radio" name="plano" id="plano-baixo" value="plano-baixo" />
          <label htmlFor="plano-baixo">Plano baixo</label>
          <input type="radio" name="plano" id="invertida" value="plano-invetida" />
          <label htmlFor="invertida">Invertida</label>
        </fieldset>
        {/* Descanso: Sem equilibro vertebral, alongamento ou fortalecimento */}
        {/* Equilibrio Vertebral: Equilibrio, Tração, Flexão da coluna, Extensão da coluna, Flexão lateral da coluna, Torção da coluna */}
        <fieldset>
          <legend>Equilibrio vertebral</legend>
          <input type="checkbox" name="equilibrio" id="equilibrio" value="equilibrio" />
          <label htmlFor="equilibrio">Equilíbrio</label>
          <input type="checkbox" name="equilibrio" id="tracao" value="tracao" />
          <label htmlFor="tracao">Tração</label>
          <input type="checkbox" name="equilibrio" id="flexao" value="flexao" />
          <label htmlFor="flexao">Flexão</label>
          <input type="checkbox" name="equilibrio" id="extensao" value="extensao" />
          <label htmlFor="extensao">Extensão</label>
          <input type="checkbox" name="equilibrio" id="flexao-lateral" value="flexao-lateral" />
          <label htmlFor="flexao-lateral">Flexão lateral</label>
          <input type="checkbox" name="equilibrio" id="torcao" value="torcao" />
          <label htmlFor="torcao">Torção</label>
        </fieldset>
        {/* Alongamento: Peitoral (membros superiores frente), Costas (membros superiores dorso), Abdômen, Pernas (membros inferiores: quadril, coxas, pernas e pés)  */}
        <fieldset>
          <legend>Alongamento</legend>
          <input type="checkbox" name="alongamento" id="alongamento-peitoral" value="peitoral" />
          <label htmlFor="alongamento-peitoral">Peitoral</label>
          <input type="checkbox" name="alongamento" id="alongamento-costas" value="costas" />
          <label htmlFor="alongamento-costas">Costas</label>
          <input type="checkbox" name="alongamento" id="alongamento-abdomen" value="abdomen" />
          <label htmlFor="alongamento-abdomen">Abdômen</label>
          <input type="checkbox" name="alongamento" id="alongamento-pernas" value="pernas" />
          <label htmlFor="alongamento-pernas">Pernas</label>
        </fieldset>
        {/* Fortalecimento: Peitoral (membros superiores frente), Costas (membros superiores dorso), Abdômen, Pernas (membros inferiores: quadril, coxas, pernas e pés)  */}
        <fieldset>
          <legend>Fortalecimento</legend>
          <input type="checkbox" name="fortalecimento" id="fortalecimento-peitoral" value="peitoral" />
          <label htmlFor="fortalecimento-peitoral">Peitoral</label>
          <input type="checkbox" name="fortalecimento" id="fortalecimento-costas" value="costas" />
          <label htmlFor="fortalecimento-costas">Costas</label>
          <input type="checkbox" name="fortalecimento" id="fortalecimento-abdomen" value="abdomen" />
          <label htmlFor="fortalecimento-abdomen">Abdômen</label>
          <input type="checkbox" name="fortalecimento" id="fortalecimento-pernas" value="pernas" />
          <label htmlFor="fortalecimento-pernas">Pernas</label>
        </fieldset>

        <button type="submit">Cadastrar</button>
      </form>
      <div>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Páginas</th>
              <th>Equilibrio</th>
              <th>Alongamento</th>
              <th>Fortalecimento</th>
            </tr>
          </thead>
          <tbody>
            {console.log(database.asanas)}
            {database.asanas && database.asanas.map(asana => (
              <tr key={asana.nome}>
                <td>{asana.nome}</td>
                <td>{asana.paginas}</td>
                <td>{asana.equilibrios}</td>
                <td>{asana.alongamentos}</td>
                <td>{asana.fortalecimentos}</td>
              </tr>
            ))}
          </tbody>
        </table>  
      </div>
    </div>
  );
}
