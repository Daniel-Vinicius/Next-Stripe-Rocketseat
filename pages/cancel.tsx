import React from "react";
import Link from 'next/link';

const CancelPage: React.FC = () => {
  return (
    <div>
      <h1>Cancelado Com Sucesso</h1>
      <Link href="/">Voltar a Pagina Inicial</Link>
    </div>
  );
};

export default CancelPage;
