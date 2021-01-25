import React from "react";
import { useRouter } from "next/router";
import Link from 'next/link';

const SuccessPage: React.FC = () => {
  const {
    query: { itemName },
  } = useRouter();

  return (
    <div>
      <h1>Obrigado Por Comprar {itemName}!</h1>
      <Link href="/">Voltar a Pagina Inicial</Link>
    </div>
  );
};

export default SuccessPage;
