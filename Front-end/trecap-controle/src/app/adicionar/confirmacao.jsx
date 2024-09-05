// pages/adicionar/confirmacao.jsx
import { useRouter } from 'next/router';

export default function Confirmacao() {
  const router = useRouter();
  const { participantes } = router.query;

  const listaParticipantes = participantes ? JSON.parse(participantes) : [];

  return (
    <div>
      <h1>Participantes Selecionados</h1>
      <ul>
        {listaParticipantes.map((participante, index) => (
          <li key={index}>{participante}</li>
        ))}
      </ul>
    </div>
  );
}
